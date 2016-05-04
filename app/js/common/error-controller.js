'use strict';

// for now ErrorController only shows 404(page not found)
angular.module('issueTracker.common.error', [])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/err/:errorId', {
                templateUrl: 'templates/partial/error.html',
                controller: 'ErrorController'
            });
        }])
    .controller('ErrorController', [
        '$scope',
        '$routeParams',
        function ($scope, $routeParams) {
            $scope.errorId = $routeParams.errorId;
        }]);