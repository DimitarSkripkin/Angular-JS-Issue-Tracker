'use strict';

// user home screen
angular.module('issueTracker.user.dashboard', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/user-dashboard', {
                templateUrl: 'templates/user/dashboard.html',
                controller: 'UserDashboardController'
            });
        }])
    .controller('UserDashboardController', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        function ($scope, $location, authentication, identity) {
        }]);
