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
        function ($scope, $rootScope, $location, $routeParams, authentication, notifier) {
            var issueId = $routeParams.id;
        }
    ]);