'use strict';

// admin home screen
angular.module('issueTracker.admin.dashboard', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/admin-dashboard', {
                templateUrl: 'templates/admin/dashboard.html',
                controller: 'AdminDashboardController'
            });
        }])
    .controller('AdminDashboardController', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        function ($scope, $location, authentication, identity) {
        }]);
