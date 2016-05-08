'use strict';

// add project
angular.module('issueTracker.projects.addProject', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects-add', {
                templateUrl: 'templates/projects/add-project.html',
                controller: 'AddProjectController'
            });
        }])
    .controller('AddProjectController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {
        }
    ]);