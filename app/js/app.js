'use strict';

angular.module('issueTracker', [
        'ngRoute',
        'ngCookies',
        
        'issueTracker.common',
        'issueTracker.common.notifier',
        'issueTracker.common.error',
        
        'issueTracker.account.identity',
        'issueTracker.account.authentication',
        'issueTracker.account.changePassword',
        'issueTracker.account.login',
        'issueTracker.account.logout',
        'issueTracker.account.register',
        
        'issueTracker.home',
        'issueTracker.home.dashboard',
        
        'issueTracker.projects.allProjects',
        'issueTracker.projects.viewProject',
        'issueTracker.projects.addProject',
        'issueTracker.projects.editProject',
        
        'issueTracker.issues.addIssue',
        'issueTracker.issues.viewIssue',
        'issueTracker.issues.editIssue'
    ])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/err/404'});
            //$routeProvider.otherwise({ redirectTo: '/' });
        }])
    .run([
        '$rootScope',
        '$location',
        'authentication',
        function ($rootScope, $location, authentication) {
            $rootScope.$on('$routeChangeError',
                function(ev, current, previous, rejection) {
                    if (rejection == 'Unauthorized Access') {
                        $location.path('/');
                    }
                });
            
            authentication.refreshCookie();
        }])
    .constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net')
    .constant('pageSize', 5);