'use strict';

// add project
angular.module('issueTracker.projects.addProject', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            var routeChecks = {
                authenticated: [
                    '$q',
                    'authentication',
                    'identity',
                    function($q, authentication, identity) {
                        if (authentication.isLoggedIn() && identity.isAdmin()) {
                            return $q.when(true);
                        }
                        
                        return $q.reject('Unauthorized Access');
                    }]
            };
            
            $routeProvider.when('/projects-add', {
                templateUrl: 'templates/projects/add-project.html',
                controller: 'AddProjectController',
                resolve: routeChecks.authenticated
            });
        }])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'authentication',
        'notifier',
        'projects',
        function ($scope, $location, authentication, notifier, projects) {
            authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                });
            
            $scope.addNewProject = function (newProject) {
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
                
                projects.addProject(newProject)
                    .then(function (response) {
                        notifier.showSuccess("Project created");
                        $location.path("/");
                    });
            }
        }]);