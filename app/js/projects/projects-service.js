'use strict';

angular.module('issueTracker.projects', [])
    .factory('projects', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        function ($http, $cookies, $q, identity, baseServiceUrl) {
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
            
            return {
                getProjectById: getProjectById,
                addProject: addProject,
                editProjectById: editProjectById,
                getAllProjects: getAllProjects
            };
        }]);