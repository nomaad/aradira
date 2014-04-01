'use strict';

angular.module('mean.users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$anchorScroll',
    function($scope, $http, $location, Authentication, $anchorScroll) {
        $scope.authentication = Authentication;
        $anchorScroll();

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(data) {
                //If successful we assign the data to the global user model
                $scope.authentication.user = data;

                //And redirect to the index page
                $location.path('/');
            }).error(function(data) {
                $scope.error = data.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(data) {
                //If successful we assign the data to the global user model
                $scope.authentication.user = data;

                //And redirect to the index page
                $location.path('/');
            }).error(function(data) {
                $scope.error = data.message;
            });
        };
    }
]);