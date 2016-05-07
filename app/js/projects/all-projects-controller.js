'use strict';

// show projects list
angular.module('issueTracker.projects.allProjects', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects', {
                templateUrl: 'templates/projects/all-projects.html',
                controller: 'AllProjectsController'
            });
        }])
    .controller('AllProjectsController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {
        }
    ]);