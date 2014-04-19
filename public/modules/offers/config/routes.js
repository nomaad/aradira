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
		state('editOffer', {
			url: '/angebote/:offerId/bearbeiten',
			templateUrl: 'modules/offers/views/edit.html'
		}).
        state('listOffers', {
           url: '/angebote',
           templateUrl: 'modules/offers/views/list.html'
       }).
        state('listOffers.details', {
            url: '/:offerId',
            onEnter: function($stateParams, $state, $modal) {
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
	}
]);