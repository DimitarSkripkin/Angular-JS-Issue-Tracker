'use strict';

// The ProjectsController is responsible for the "User Projects" screen
angular.module('issueTracker.projects', [
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects/:id', {
                templateUrl: 'templates/...',
                controller: 'ProjectsController'
            });
        }])
    .controller('ProjectsController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {           
            var projectId = $routeParams.id;
        }
    ]);