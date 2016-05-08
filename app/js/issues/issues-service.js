'use strict';

angular.module('issueTracker.issues', [])
    .factory('issues', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        'pageSize',
        function ($http, $cookies, $q, identity, baseServiceUrl, pageSize) {
            function getUserIssues(pageNumber, orderedBy) {
                pageNumber = pageNumber || 1;
                orderedBy = orderedBy || 'DueDate desc';
                return $http.get(baseServiceUrl + '/Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderedBy);
            }
            
            return {
                getUserIssues: getUserIssues
            };
        }]);