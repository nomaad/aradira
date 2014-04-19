'use strict';

angular.module('mean.core').controller('HomeController', ['$scope', 'Authentication', 'Offers', 'geolocation', 'leafletData', '$anchorScroll',
    function ($scope, Authentication, Offers, geolocation, leafletData, $anchorScroll) {
        $scope.authentication = Authentication;
        $anchorScroll();

        $scope.markers = [];

        $scope.$on('leafletDirectiveMap.click', function(event, args){
            /*var leafEvent = args.leafletEvent;

            $scope.markers.push({
                lat: leafEvent.latlng.lat,
                lng: leafEvent.latlng.lng,
                icon: {
                    type: 'awesomeMarker',
                    icon: 'leaf',
                    markerColor: 'green'
                }
            });*/
        });

        geolocation.getLocation().then(function(data){
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};

            leafletData.getMap().then(function(map) {
                map.setView({
                    lat: data.coords.latitude,//46.946732,
                    lng: data.coords.longitude //7.44873,
                },12);
            });
        });

        $scope.find = function() {
            Offers.query(function(offers) {
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
                                        '<td>' + offer.slots + '</td>' +
                                    '</tr>' : '') +
                            '</table>' +
                            '<a href="/#!/angebote/' + offer._id +'" class="btn btn-block btn-primary">Angebot ansehen</a>' +
                            '<small>Erstellt am ' + offer.created + ' von ' + offer.user.displayName + '</small>'
                    });
                });
            });
        };

        angular.extend($scope, {
            // set up map center
            cen: {
                lat: 46.8131873,
                lng: 8.2242101,
                zoom: 8
            }
        });

        /*angular.extend($scope, {
            paths: {
                c1: {
                    weight: 2,
                    color: '#ff612f',
                    latlngs: {
                        lat: 46.946732,
                        lng: 7.44873,
                        draggable: false
                    },
                    radius: 200,
                    type: 'circle'
                }
            }
        });*/

    }]);