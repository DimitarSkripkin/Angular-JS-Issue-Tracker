'use strict';

angular.module('issueTracker.issues', [])
    .factory('issues', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        function ($http, $cookies, $q, identity, baseServiceUrl) {
            return {
            };
        }]);