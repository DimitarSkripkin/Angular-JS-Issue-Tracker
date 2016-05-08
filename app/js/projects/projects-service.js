'use strict';

angular.module('issueTracker.projects', [])
    .factory('projects', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        function ($http, $cookies, $q, identity, baseServiceUrl) {
            function getProjects() {}
            
            return {
            };
        }]);