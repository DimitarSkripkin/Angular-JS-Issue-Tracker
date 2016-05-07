'use strict';

// show choosen project
angular.module('issueTracker.projects.viewProject', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects/:id', {
                templateUrl: 'templates/projects/project.html',
                controller: 'ProjectController'
            });
        }])
    .controller('ProjectController', [
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