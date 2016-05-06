'use strict';

// The HomeController holds the presentation logic for the home screen
angular.module('issueTracker.home', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'templates/home/home.html',
                controller: 'HomeController'
            });
        }])
    .controller('HomeController', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        function ($scope, $location, authentication, identity) {
            if (authentication.isLoggedIn()) {
                if (identity.isAdmin()){
                    $location.path('/admin-dashboard');
                } else if (identity.isNormalUser()) {
                    $location.path('/user-dashboard');
                }
            }
        }]);
