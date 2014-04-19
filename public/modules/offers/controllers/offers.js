'use strict';

angular.module('aradira.offers').controller('OffersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Offers', 'geolocation', 'leafletData', '$http',
    function($scope, $stateParams, $location, Authentication, Offers, geolocation, leafletData, $http) {
        $scope.authentication = Authentication;
        $scope.markers = [];

        $scope.distances = [
            {name:'1 km', value:1, zoom: 14},
            {name:'5 km', value:5, zoom: 13},
            {name:'10 km', value:10, zoom: 12},
            {name:'25 km', value:25, zoom: 10},
            {name:'50 km', value:50, zoom: 10},
            {name:'75 km', value:75, zoom: 9},
            {name:'100 km', value:100, zoom: 9},
            {name:'> 100 km', value:1000, zoom: 8}
        ];
        $scope.distance = $scope.distances[1];

        $scope.slotList = [
            {name:'unbegrenzt', value:0},
            {name:'2', value:2},
            {name:'3', value:3},
            {name:'4', value:4},
            {name:'5', value:5},
            {name:'6', value:6},
            {name:'7', value:7},
            {name:'8', value:8},
            {name:'9', value:9},
            {name:'10', value:10},
        ];
        $scope.slot = $scope.slotList[0];

        angular.extend($scope, {
            // set up map center
            cen: {
                lat: 46.8131873,
                lng: 8.2242101,
                zoom: $scope.distance.zoom
            }
        });

        geolocation.getLocation().then(function(data){
            $scope.coords = {lat:data.coords.latitude, lon:data.coords.longitude};
            $scope.find(); //TODO: Fix: Only gets fired when getting location was allowed..

            $http.post('/reverse-geocode', {lat:$scope.coords.lat, lon:$scope.coords.lon}).success(function(data){
                $scope.city = data.city;
            });

            $scope.setMapView();
        });

        $scope.setMapView = function(){
            leafletData.getMap().then(function(map) {
                map.setView({
                    lat: $scope.coords.lat,
                    lng: $scope.coords.lon
                },$scope.distance.zoom);
            });
        };

        $scope.changeDistance = function() {
            $scope.find();
            $scope.setMapView();
        };

        $scope.changePlace = function() {
            $http.post('/geocode', {query: $scope.city}).success(function(data){
                $scope.coords = {lat:data.latitude, lon:data.longitude};
                $scope.city = data.city;
                $scope.find();
                $scope.setMapView();
            });
        };

        $scope.find = function() {
            $scope.offers = [];
            $scope.markers = [];
            Offers.query({lat: $scope.coords.lat, lon:$scope.coords.lon, dist:$scope.distance.value}, function(offers) {
                $scope.offers = offers;
                angular.forEach(offers, function(offer, key){
                    console.log(offer);
                    $scope.markers.push({
                        lat: offer.position[1],
                        lng: offer.position[0],
                        icon: {
                            type: 'awesomeMarker',
                            icon: 'leaf',
                            markerColor: 'green'
                        },

                        message: '<h5 class="popup-title">' + offer.title + '</h5>' +
                            '<table class="popup-table table table-condensed">'+
                            '<tr>' +
                            '<td><b>Grösse:</b></td>' +
                            '<td>' + offer.width + ' x ' + offer.height + ' m</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td><b>PLZ & Ort:</b></td>' +
                            '<td>' + (offer.geoInfo.zipcode ? offer.geoInfo.zipcode + ' ' : '') + offer.geoInfo.city+ '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td><b>Gemeinschaftsgarten:</b></td>' +
                            '<td>' + (offer.communal ? '<i class="fa fa-check-square-o">' : 'nein') + '</td>' +
                            '</tr>' +
                            (offer.communal ?
                                '<tr>' +
                                '<td><b>Anzahl Plätze:</b></td>' +
                                '<td>' + (offer.slots === 0 ? 'unbegrenzt' : offer.slots) + '</td>' +
                                '</tr>' : '') +
                            '</table>' +
                            '<a href="/#!/angebote/' + offer._id +'" class="btn btn-block btn-primary popup-link">Angebot ansehen</a>' +
                            '<small>Erstellt am ' + offer.created + ' von ' + offer.user.displayName + '</small>'
                    });
                });
            });
        };


        $scope.create = function() {
            var offer = new Offers({
                title: this.title,
                description: this.description,
                address: this.address,
                width: this.width,
                height: this.height,
                communal: this.communal,
                slots: $scope.slot.value
            });
            offer.$save(function(response) {
                console.log(response);
                $location.path('angebote/' + response._id);
            });
        };

        $scope.remove = function(offer) {
            if (offer) {
                offer.$remove();

                for (var i in $scope.offers) {
                    if ($scope.offers[i] === offer) {
                        $scope.offers.splice(i, 1);
                    }
                }
            } else {
                $scope.offer.$remove(function() {
                    $location.path('angebote');
                });
            }
        };

        $scope.update = function() {
            var offer = $scope.offer;
            if (!offer.updated) {
                offer.updated = [];
            }
            offer.updated.push(new Date().getTime());

            offer.$update(function() {
                $location.path('angebote/' + offer._id);
            });
        };

        $scope.findOne = function() {
            Offers.get({
                offerId: $stateParams.offerId
            }, function(offer) {
                $scope.offer = offer;
            });
        };
    }
]);