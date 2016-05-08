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
        '$routeParams',
        'notifier',
        'projects',
        'issues',
        function ($scope, $routeParams, notifier, projects, issues) {
            var projectId = $routeParams.id;
            
            projects.getProjectById(projectId)
                .then(function(response) {
                    $scope.project = response.data;
                    
                    issues.getIssueByProjectId(projectId)
                        .then(function (issueResponse) {
                            $scope.projectIssues = issueResponse.data;
                        })
                });
        }
    ]);