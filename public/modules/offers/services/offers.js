'use strict';

//Offers service used for offers REST endpoint
angular.module('aradira.offers').factory('Offers', ['$resource', function($resource) {
    return $resource('offers/:offerId', {
        offerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);