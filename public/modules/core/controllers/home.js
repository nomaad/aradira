'use strict';

angular.module('mean.core').controller('HomeController', ['$scope', 'Authentication', 'geolocation', 'leafletData', function ($scope, Authentication, geolocation, leafletData) {
    $scope.authentication = Authentication;
    var map = leafletData.getMap();
    geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        /*$scope.cen = {
            lat: data.coords.latitude,//46.946732,
            lng: data.coords.longitude, //7.44873,
            zoom: 13
        };*/
        leafletData.getMap().then(function(map) {
            map.setView({
                lat: data.coords.latitude,//46.946732,
                lng: data.coords.longitude, //7.44873,
            },12);
        });
    });

    angular.extend($scope, {
        // set up map center
        cen: {
            lat: 46.8131873,
            lng: 8.2242101,
            zoom: 8
        }
    });

    angular.extend($scope, {
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
    });

}]);