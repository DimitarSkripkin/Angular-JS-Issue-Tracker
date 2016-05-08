'use strict';

// show choosen project
angular.module('issueTracker.issues.editIssue', [
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/issues/:id/edit', {
                templateUrl: 'templates/issues/edit-issue.html',
                controller: 'EditIssueController'
            });
        }])
    .controller('EditIssueController', [
        '$scope',
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        'issues',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier, issues) {
            var issueId = $routeParams.id;
            
            authentication.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                });
            
            issues.getIssueById(issueId)
                .then(function (issue) {
                    $scope.issue = issue;
                    
                    var isAssignee = ($scope.currentUser.Id == issue.Assignee.Id);
                    $scope.isAssignee = isAssignee;
                    
                    projects.getProjectById(projectId)
                        .then(function (response) {
                            $scope.currentProject = response.data;
                            
                            var isLeader = ($scope.currentUser.Id == response.data.Lead.Id);
                            $scope.isLeader = isLeader;
                        });
                });
               
            $scope.editIssue = function (changedIssue) {
                var labels = newIssue.Labels.split(', ');
                newIssue.Labels = labels.map(function (label) {
                    return {
                        Name: label
                    };
                });
                
                issues.editIssueById(issueId, changedIssue)
                    .then(function (response) {
                        $location.path('/issues/' + issueId);
                    });
            }
        }
    ]);