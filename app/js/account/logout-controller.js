'use strict';

// The LoginController is responsible for the "Login" screen
angular.module('issueTracker.account.logout', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/logout', {
                resolve: {
                    logout: [
                        '$location',
                        'authentication',
                        'notifier',
                        function ($location, authentication, notifier) {
                            authentication.logout();
                            notifier.showInfo("Logout successful");
                            $location.path('/');
                        }
                    ]
                }
            });
        }]);