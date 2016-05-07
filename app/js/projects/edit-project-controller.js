'use strict';

// edit choosen project
angular.module('issueTracker.projects.editProject', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects/:id/edit', {
                templateUrl: 'templates/projects/edit-project.html',
                controller: 'EditProjectController'
            });
        }])
    .controller('EditProjectController', [
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