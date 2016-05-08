'use strict';

// show choosen project
angular.module('issueTracker.issues.viewIssue', [
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
             $routeProvider.when('/issues/:id', {
                templateUrl: 'templates/issues/issue.html',
                controller: 'ViewIssueController'
            });
        }])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        'authentication',
        'notifier',
        'issues',
        'projects',
        function ($scope, $routeParams, authentication, notifier, issues, projects) {
            var issueId = $routeParams.id;
            
            //$scope.newPostText = "";
            $scope.addNewPost = function (newPostText) {
                var comment = {
                    Text: newPostText
                };
                
                issues.addCommentsByIssueId(issueId, comment)
                    .then(function (responseComments) {
                        $scope.issueComments = responseComments.data;
                        $scope.newPostText = "";
                    });
            }
            
            issues.getIssueById(issueId)
                .then(function(response) {
                    var issue = response.data;
                    $scope.issue = issue;
                    
                    var isAssignee = ($scope.currentUser.Id == issue.Assignee.Id);
                    $scope.canEditIssue = isAssignee;
                    
                    projects.getProjectById(issue.Project.Id)
                        .then(function (responseProject) {
                            var isLeader = ($scope.currentUser.Id == responseProject.data.Lead.Id);
                            $scope.canEditIssue = (isAssignee || isLeader);
                        });
            
                    issues.getCommentsByIssueId(issueId)
                        .then(function (responseComments) {
                            $scope.issueComments = responseComments.data;
                        });
                });
        }
    ]);