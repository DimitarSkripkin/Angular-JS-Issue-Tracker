'use strict';

// dashboard screen
angular.module('issueTracker.home.dashboard', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/dashboard', {
                templateUrl: 'templates/home/dashboard.html',
                controller: 'DashboardController'
            });
        }])
    .controller('DashboardController', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        function ($scope, $location, authentication, identity) {
        }]);
