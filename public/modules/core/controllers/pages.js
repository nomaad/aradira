'use strict';

angular.module('mean.core').controller('PagesController', ['$scope', 'Authentication', '$anchorScroll',
    function($scope, Authentication, $anchorScroll) {
        $scope.authentication = Authentication;
        $anchorScroll();

        $scope.bodenTeilen = function() {

        };
    }
]);