/*<!--Change User Password
Route: #/profile/password
Users should be able to change their password from form (contains old password, new password and confirm new password). Show notification for success or error message.
-->*/

'use strict';

// The ChangePasswordController is responsible for the "Changing password" screen
angular.module('issueTracker.account.changePassword', [
        'issueTracker.account.authentication'
    ])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/profile/password', {
                templateUrl: 'templates/account/change-password.html',
                controller: 'ChangePasswordController'
            });
        }])
    .controller('ChangePasswordController', [
        '$scope',
        '$location',
        'authentication',
        'notifier',
        function ($scope, $location, authentication, notifier) {
            // if (userData.password.length < 6 || userData.confirmPassword.length < 6) {
            //     notifier.showError("Passwords must be at least 6 characters long");
            //     return false;
            // } else if (userData.password != userData.confirmPassword) {
            //     notifier.showError("Passwords doesn't match");
            //     return false;
            // }
            
            $scope.changePassword = function(userData) {
                authentication.changePassword(userData)
                    .then(function () {
                        notifier.showInfo("Password successfully changed");
                        $location.path("/");
                    }, function (err) {
                        notifier.showError("Password change failed", err);
                    });
            };
        }]);
