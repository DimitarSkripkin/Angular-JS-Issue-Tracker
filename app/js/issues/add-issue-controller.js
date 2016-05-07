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
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {
            var projectId = $routeParams.id;
        }
    ]);