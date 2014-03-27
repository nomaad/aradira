'use strict';

angular.module('mean.core').controller('HomeController', ['$scope', 'Authentication', 'geolocation', function ($scope, Authentication, geolocation) {
    $scope.authentication = Authentication;

    geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.cen = {
            lat: data.coords.latitude,//46.946732,
            lng: data.coords.longitude, //7.44873,
            zoom: 13
        };
    });

    angular.extend($scope, {
        // set up map center
        cen: {
            lat: 50,//26.946732,
            lng: 22,//7.44873,
            zoom: 13
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