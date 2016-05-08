'use strict';

// show choosen project
angular.module('issueTracker.issues.addIssue', [
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/projects/:id/add-issue', {
                templateUrl: 'templates/issues/add-issue.html',
                controller: 'AddIssueController'
            });
        }])
    .controller('AddIssueController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        'issues',
        'projects',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier, issues, projects) {
            var projectId = $routeParams.id;
            
            authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                });
            
            projects.getProjectById(projectId)
                .then(function (response) {
                    $scope.currentProject = response.data;
                });
            
            $scope.newIssue = {
                ProjectId: projectId
            };
            
            $scope.addNewIssue = function (newIssue) {
                var labels = newIssue.Labels.split(', ');
                newIssue.Labels = labels.map(function (label) {
                    return {
                        Name: label
                    };
                });
                
                newIssue.ProjectId = projectId;
                
                issues.addIssue(newIssue)
                    .then(function (response) {
                        $location.path('/projects/' + newIssue.ProjectId);
                    })
            }
        }
    ]);