'use strict';

angular.module('issueTracker.account.identity', [])
	.factory('identity', [
		'$http',
		'$q',
		'baseServiceUrl',
		function ($http, $q, baseServiceUrl) {
			var deferred = $q.defer();

			var currentUser = undefined;

			function getCurentUser() {
				if (currentUser) {
					return $q.when(currentUser);
				} else {
					return deferred.promise;
				}
			}

			function requestCurrentUserProfile() {
				var userProfileDeferred = $q.defer();

				$http.get(baseServiceUrl + '/users/me')
					.then(function (response) {
						currentUser = response.data;
						deferred.resolve(currentUser);
						userProfileDeferred.resolve();
					}, function (error) {
						userProfileDeferred.reject(error);
					});

				return userProfileDeferred.promise;
			}
            
            function isNormalUser() {
                return (currentUser != undefined && !currentUser.isAdmin);
            }
            
            function isAdmin() {
                return (currentUser != undefined && currentUser.isAdmin);
            }

			function removeUserProfile() {
				currentUser = undefined;
			}

			return {
				getCurrentUser: getCurentUser,
				requestCurrentUserProfile: requestCurrentUserProfile,
				isNormalUser: isNormalUser,
				isAdmin: isAdmin,
				removeUserProfile: removeUserProfile
			}
		}]);