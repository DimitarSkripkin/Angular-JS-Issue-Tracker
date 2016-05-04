'use strict';

// The RegisterController is responsible for the "User Registration" screen
angular.module('issueTracker.account.register', [
        'issueTracker.account.authentication'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/register', {
                templateUrl: 'templates/account/register.html',
                controller: 'RegisterController'
            });
        }])
    .controller('RegisterController', [
        '$scope',
        '$rootScope',
        '$location',
        'authentication',
        'notifier',
        function ($scope, $rootScope, $location, authentication, notifier) {
            $scope.register = function(userData) {
                if (userData.password.length < 6 || userData.confirmPassword.length < 6) {
                    notifier.showError("Passwords must be at least 6 characters long");
                    return false;
                } else if (userData.password != userData.confirmPassword) {
                    notifier.showError("Passwords doesn't match");
                    return false;
                }
                
                authentication.register(userData)
                    .then(function () {
                        notifier.showInfo("User registered successfully");
                        $location.path("/");
                    }, function (err) {
                        notifier.showError("Username is already taken");
                        //notifier.showError("User registration failed", err);
                    });
            };
        }]);

