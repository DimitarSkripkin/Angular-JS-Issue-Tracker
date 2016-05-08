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
        'projects',
        function ($scope, projects) {
            projects.getAllProjects()
                .then(function (response) {
                   $scope.projects = response.data;
                });
        }
    ]);