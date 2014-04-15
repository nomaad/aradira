'use strict';

//Setting up route
angular.module('aradira.offers').config(['$stateProvider',
	function($stateProvider) {
		// Offers state routing
		$stateProvider.
		state('listOffers', {
			url: '/angebote',
			templateUrl: 'modules/offers/views/list.html'
		}).
		state('createOffer', {
			url: '/angebote/neu',
			templateUrl: 'modules/offers/views/create.html'
		}).
		state('viewOffer', {
			url: '/angebote/:offerId',
			templateUrl: 'modules/offers/views/view.html'
		}).
		state('editOffer', {
			url: '/angebote/:offerId/bearbeiten',
			templateUrl: 'modules/offers/views/edit.html'
		});
	}
]);