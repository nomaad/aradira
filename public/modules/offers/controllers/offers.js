'use strict';

angular.module('aradira.offers').controller('OffersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Offers',
    function($scope, $stateParams, $location, Authentication, Offers) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            var offer = new Offers({
                title: this.title,
                description: this.description,
                address: this.address,
                width: this.width,
                height: this.height,
                communal: this.communal,
                slots: this.slots
            });
            offer.$save(function(response) {
                $location.path('angebote/' + response._id);
            });

            this.title = '';
            this.content = '';
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

        $scope.find = function() {
            Offers.query(function(offers) {
                $scope.offers = offers;
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