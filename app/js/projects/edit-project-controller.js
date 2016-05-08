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
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        'projects',
        function ($scope, $location, $routeParams, authentication, notifier, projects) {
            var projectId = $routeParams.id;
            
            authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                });
            
            projects.getProjectById(projectId)
                .then(function(response) {
                    $scope.project = response.data;
                });
                
            $scope.editProject = function (newProject) {
                var priorities = newProject.Priorities.split(', ');
                newProject.Priorities = priorities.map(function (priority) {
                    return {
                        Name: priority
                    };
                });
                
                var labels = newProject.Labels.split(', ');
                newProject.Labels = labels.map(function (label) {
                    return {
                        Name: label
                    };
                });
                
                projects.editProjectById(projectId, newProject)
                    .then(function (response) {
                        notifier.showSuccess("Project created");
                        $location.path("/projects/" + projectId);
                    });
            }
        }
    ]);