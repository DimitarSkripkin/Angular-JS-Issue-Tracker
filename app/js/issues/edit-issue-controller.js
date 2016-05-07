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
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {
            var issueId = $routeParams.id;
        }
    ]);