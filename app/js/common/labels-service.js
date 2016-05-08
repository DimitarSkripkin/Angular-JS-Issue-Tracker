'use strict';

angular.module('issueTracker.labels', [])
    .factory('labels', [
        '$http',
        'baseServiceUrl',
        function ($http, baseServiceUrl) {
            function getLabels(filter) {
                return $http.get(baseServiceUrl + '/Labels/?filter=' + filter);
            }
            
            return {
                getLabels: getLabels
            };
        }]);