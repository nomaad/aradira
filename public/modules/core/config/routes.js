'use strict';

// Setting up route
angular.module('mean.core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.html'
		}).
        state('gesuche', {
            url: '/gesuche',
            templateUrl: 'modules/core/views/gesuche.html'
        }).
        state('boden-teilen', {
            url: '/boden-teilen',
            templateUrl: 'modules/core/views/boden-teilen.html'
        }).
        state('boden-finden', {
            url: '/boden-finden',
            templateUrl: 'modules/core/views/boden-finden.html'
        }).
        state('idee', {
            url: '/idee',
            templateUrl: 'modules/core/views/idee.html'
        });
	}
]);