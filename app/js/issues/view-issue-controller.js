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
        function ($scope, $routeParams, authentication, notifier, issues) {
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
                    $scope.issue = response.data;
                    
                    issues.getCommentsByIssueId(issueId)
                        .then(function (responseComments) {
                            $scope.issueComments = responseComments.data;
                        });
                });
        }
    ]);