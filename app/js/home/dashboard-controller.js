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
        'projects',
        'pageSize',
        function ($scope, $location, authentication, identity, issues, projects, pageSize) {
            $scope.currentIssuePage = 1;
            $scope.pageSize = pageSize;
            
            issues.getUserIssues()
                .then(function (response) {
                    $scope.issues = response.data.Issues;
                    $scope.totalIssues = response.data.TotalCount;
                });
                
            // A function to do some act on paging click
            $scope.changeIssuePage = function(page, pageSize, total) {
                $scope.currentIssuePage = page;
                
                issues.getUserIssues(page)
                    .then(function (response) {
                        $scope.issues = response.data.Issues;
                        $scope.totalIssues = response.data.TotalCount;
                    });
            };
            
            $scope.associatedProjectPage = 1;
            var associatedProjectPage = 1;
            
            identity.getCurrentUser()
                .then(function (currentUser) {
                    projects.getProjectsByFilter(associatedProjectPage, 'Lead.Id="' + currentUser.Id + '"')
                        .then(function (response) {
                            $scope.associatedProjects = response.data.Projects;
                            $scope.totalAssociatedProjects = response.data.TotalCount;
                        }); 
                });
                
            // A function to do some act on paging click
            $scope.changeAssociatedProjectsPage = function(page, pageSize, total) {
                $scope.associatedProjectPage = page;
                
                identity.getCurrentUser()
                    .then(function (currentUser) {
                        projects.getProjectsByFilter(page, 'Lead.Id="' + currentUser.Id + '"')
                            .then(function (response) {
                                $scope.associatedProjects = response.data.Projects;
                                $scope.totalAssociatedProjects = response.data.TotalCount;
                            }); 
                    });
            };
        }]);
