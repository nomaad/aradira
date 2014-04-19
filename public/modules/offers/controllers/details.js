'use strict';

angular.module('aradira.offers').controller('OfferDetailsController', ['$scope', '$stateParams', 'Authentication', 'Offers',
    function($scope, $stateParams, Authentication, Offers) {
        $scope.authentication = Authentication;

        Offers.get({
            offerId: $stateParams.offerId
        }, function(offer) {
            $scope.offer = offer;
        });

        $scope.close = function() {
            $scope.$close(true);
        };
    }
]);