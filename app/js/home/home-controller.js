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
        '$rootScope',
        'notifier',
        function ($scope, $rootScope, notifier) {
            // TODO
        }]);
