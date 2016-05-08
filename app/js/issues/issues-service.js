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
            
            function getIssueByProjectId(projectId) {
                return $http.get(baseServiceUrl + '/Projects/' + projectId + '/Issues');
            }
            
            function getIssueById(issueId) {
                return $http.get(baseServiceUrl + '/Issues/' + issueId);
            }
            
            function editIssueById(issueId, issue) {
                return $http.put(baseServiceUrl + '/Issues/' + issueId, issue);
            }
            
            function addIssueById(issue) {
                return $http.post(baseServiceUrl + '/Issues/', issue);
            }
            
            function getCommentsByIssueId(issueId) {
                return $http.get(baseServiceUrl + '/Issues/' + issueId + '/comments');
            }
            
            function addCommentsByIssueId(issueId, comment) {
                return $http.post(baseServiceUrl + '/Issues/' + issueId + '/comments', comment);
            }
            
            return {
                getUserIssues: getUserIssues,
                getIssueByProjectId: getIssueByProjectId,
                getIssueById: getIssueById,
                editIssueById: editIssueById,
                addIssueById: addIssueById,
                getCommentsByIssueId: getCommentsByIssueId,
                addCommentsByIssueId: addCommentsByIssueId
            };
        }]);