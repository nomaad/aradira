'use strict';

angular.module('mean.core').controller('PagesController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;

        $scope.gesuche = function() {
        };
    }
]);