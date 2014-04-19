'use strict';

//Setting up route
angular.module('aradira.offers').config(['$stateProvider',
	function($stateProvider) {
		// Offers state routing
		$stateProvider.

		state('createOffer', {
			url: '/angebote/neu',
			templateUrl: 'modules/offers/views/create.html'
		}).
		/*state('viewOffer', {
			url: '/angebote/:offerId',
			templateUrl: 'modules/offers/views/view.html'
		}).*/
		state('editOffer', {
			url: '/angebote/:offerId/bearbeiten',
			templateUrl: 'modules/offers/views/edit.html'
		}).
            state('listOffers', {
                url: '/angebote',
                templateUrl: 'modules/offers/views/list.html'
            }).
            /*state('listOffers.details', {
             url: '/:offerId',

             onEnter: function($stateParams, $state, $modal) {
                 console.log($modal);
                 $modal.open({templateUrl: 'modules/offers/views/view.html'});
             }
             })*/
        state("listOffers.details", {
                url: "/:offerId",
                onEnter: function($stateParams, $state, $modal, $resource) {
                    console.log($stateParams, $state);
                    $modal.open({
                        templateUrl: 'offerDetails.html',
                        backdrop: 'static',
                        controller: 'OfferDetailsController',
                        windowClass: 'details-dialog'
                    }).result.then(function(result) {
                            if (result) {
                                return $state.transitionTo("listOffers");
                            }
                        });
                }
            });
        /*state('listOffers.details', {
            url: '/angebote/:offerId',
            onEnter: function($stateParams, $state, $modal, Offers, $resource) {
                $modal.open({
                    templateUrl: 'modules/offers/views/view.html',
                    /*resolve: {
                        offer: function() { Offers.get({
                            offerId: $stateParams.offerId
                        }); }
                    },
                    controller: OffersController, /*['$scope', 'offer', function($scope, offer) {
                        $scope.offer = offer;
                        /*$scope.dismiss = function() {
                            $scope.$dismiss();
                        };

                        $scope.save = function() {
                            item.update().then(function() {
                                $scope.$close(true);
                            });
                        };
                    }]*//*
                }).result.then(function(result) {
                        if (result) {
                            return $state.transitionTo("listOffers");
                        }
                    });
            }
        });*/
	}
]);