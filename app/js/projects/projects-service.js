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
                return $http.put(baseServiceUrl + '/Projects/', project);
            }
            
            function editProjectById(projectId, project) {
                return $http.put(baseServiceUrl + '/Projects/' + projectId, project);
            }
            
            return {
                getProjectById: getProjectById,
                addProject: addProject,
                editProjectById: editProjectById
            };
        }]);