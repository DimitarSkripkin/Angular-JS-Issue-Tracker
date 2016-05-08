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
        '$rootScope',
        '$location',
        '$routeParams',
        'authentication',
        'notifier',
        'issues',
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier, issues) {
            var issueId = $routeParams.id;
            
            issues.getIssueById(issueId)
                .then(function(response) {
                    console.log(response.data);
                    $scope.issue = response.data;
                });
        }
    ]);