'use strict';

// User Dashboard
// o Route: #/
// o Includes the user's assigned issues, ordered by due date in descending order and a panel with all the
//      projects that you are associated with (you have an assigned issue in them or you are a project
//      leader) 

// dashboard screen
angular.module('issueTracker.home.dashboard', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            var routeChecks = {
                authenticated: [
                    '$q',
                    'authentication',
                    function($q, authentication) {
                        if (authentication.isLoggedIn()) {
                            return $q.when(true);
                        }
                        
                        return $q.reject('Unauthorized Access');
                    }]
            };
        
            $routeProvider.when('/dashboard', {
                templateUrl: 'templates/home/dashboard.html',
                controller: 'DashboardController',
                resolve: routeChecks.authenticated
            });
        }])
    .controller('DashboardController', [
        '$scope',
        '$location',
        'authentication',
        'identity',
        'issues',
        'pageSize',
        function ($scope, $location, authentication, identity, issues, pageSize) {
            $scope.currentPage = 1;
            $scope.pageSize = pageSize;
            
            issues.getUserIssues()
                .then(function (responce) {
                    $scope.issues = responce.data.Issues;
                    $scope.total = responce.data.TotalCount;
                });
        }]);
