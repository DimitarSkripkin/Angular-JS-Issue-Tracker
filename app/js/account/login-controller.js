'use strict';

// The LoginController is responsible for the "Login" screen
angular.module('issueTracker.account.login', [
        'issueTracker.account.authentication'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'templates/account/login.html',
                controller: 'LoginController'
            });
        }])
    .controller('LoginController', [
        '$scope',
        '$location',
        'authentication',
        'notifier',
        function ($scope, $location, authentication, notifier) {
            $scope.login = function(userData) {
                authentication.login(userData)
                    .then(function () {
                        notifier.showInfo("Login successful");
                        $location.path("/");
                    }, function (err) {
                        notifier.showError("Login failed", err);
                    });
            };
        }]);
