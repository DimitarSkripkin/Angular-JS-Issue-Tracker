angular.module('issueTracker.common', [])
    .controller('MainCtrl', [
        '$scope',
        'authentication',
        'identity',
        function ($scope, authentication, identity) {
            // Put authentication in the $scope to make it accessible from all screens
            $scope.authentication = authentication;
            
            identity.getCurrentUser()
                .then(function(user) {
                    $scope.currentUser = user;
                });
        }]);
