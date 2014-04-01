'use strict';

angular.module('mean.core').controller('HeaderController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;

		$scope.menu = [{
            title: 'Angebote',
            link: 'angebote',
            uiRoute: '/angebote'
        }, {
            title: 'Gesuche',
            link: 'gesuche',
            uiRoute: '/gesuche'
        }, {
            title: 'Wie es funktioniert',
            sub: [{
                title: 'Wie kann ich Boden teilen?',
                link: 'boden-teilen',
                uiRoute: '/boden-teilen'
            }, {
                title: 'Wie kann ich Boden finden?',
                link: 'boden-finden',
                uiRoute: '/boden-finden'
            }]
        }, {
            title: 'Die Idee',
            link: 'idee',
            uiRoute: '/idee'
        }
        ];

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

        /*{
         title: 'Articles',
         link: 'articles',
         uiRoute: '/articles'
         }, {
         title: 'New Article',
         link: 'articles/create',
         uiRoute: '/articles/create'
         },*/
	}
]);