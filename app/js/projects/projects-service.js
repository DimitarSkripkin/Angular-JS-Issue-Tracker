'use strict';

angular.module('issueTracker.projects', [])
    .factory('projects', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        'pageSize',
        function ($http, $cookies, $q, identity, baseServiceUrl, pageSize) {
            function getProjectById(projectId) {
                return $http.get(baseServiceUrl + '/Projects/' + projectId);
            }
            
            function addProject(project) {
                return $http.post(baseServiceUrl + '/Projects/', project);
            }
            
            function editProjectById(projectId, project) {
                return $http.put(baseServiceUrl + '/Projects/' + projectId, project);
            }
            
            function getAllProjects() {
                return $http.get(baseServiceUrl + '/Projects/');
            }
            
            function getProjectsByFilter(pageNumber, projectFilter) {
                var url = baseServiceUrl +
                    '/Projects/?pageSize=' + pageSize +
                    '&pageNumber=' + pageNumber +
                    '&filter=' + projectFilter;
                
                return $http.get(url);
            }
            
            return {
                getProjectById: getProjectById,
                addProject: addProject,
                editProjectById: editProjectById,
                getAllProjects: getAllProjects,
                getProjectsByFilter: getProjectsByFilter
            };
        }]);