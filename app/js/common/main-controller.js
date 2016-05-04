angular.module('issueTracker.common', [
        'issueTracker.common.notifier'
    ])
    .controller('MainCtrl', [
        '$scope',
        '$location',
        'authentication',
        'notifier',
        function ($scope, $location, authentication, notifier) {
            // Put the authentication in the $scope to make it accessible from all screens
            $scope.authentication = authentication;
        }]);
