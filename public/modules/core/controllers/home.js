'use strict';

angular.module('mean.core').controller('HomeController', ['$scope', 'Authentication', function ($scope, Authentication) {
    $scope.authentication = Authentication;

    angular.extend($scope, {
        // set up map center
        cen: {
            lat: 46.946732,
            lng: 7.44873,
            zoom: 13
        },
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
            },
        }
    });

}]);