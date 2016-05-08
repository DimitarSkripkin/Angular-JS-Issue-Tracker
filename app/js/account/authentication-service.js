'use strict';

angular.module('issueTracker.account.authentication', [])
    .factory('authentication', [
        '$http',
        '$cookies',
        '$q',
        'identity',
        'baseServiceUrl',
        function ($http, $cookies, $q, identity, baseServiceUrl) {
            var AUTHENTICATION_COOKIE_KEY = 'AuthToken';

			function preserveUserData(data) {
				var accessToken = data.access_token;
				$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
				$cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                identity.requestCurrentUserProfile();
			}

			function removeUserData() {
				$http.defaults.headers.common.Authorization = undefined;
				$cookies.remove(AUTHENTICATION_COOKIE_KEY);
			}
            
            function changePassword(userData) {
                return $http.post(baseServiceUrl + '/api/Account/ChangePassword', userData);
            }
            
            function login(userData) {
                var deferred = $q.defer();
                
                var loginUserData = 'username=' + userData.email + '&password=' + userData.password + '&grant_type=password';
                
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/Token',
                    data: loginUserData
                };
                
                $http(request).success(function(data) {
                    //$http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
                    preserveUserData(data);
                    deferred.resolve(data);
                }).error(deferred.reject);
                
                return deferred.promise;
            }
            
            function register(userData) {
                var deferred = $q.defer();
                
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/Account/Register',
                    data: userData
                };
                
                $http(request).success(function(data) {
                    //$http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
                    preserveUserData(data);
                    deferred.resolve(data);
                }).error(deferred.reject);
                
                return deferred.promise;
            }
            
            function logout() {
                removeUserData();
                identity.removeUserProfile();
            }
            
            function isAnonymous() {
                return !$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }
            
            function isLoggedIn() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }

			function refreshCookie() {
				if (isLoggedIn()) {
					$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
					identity.requestCurrentUserProfile();
				}
			}
            
            function getAllUsers() {
                return $http.get(baseServiceUrl + '/Users/');
            }
            
            return {
                changePassword: changePassword,
                login: login,
                register: register,
                logout: logout,
                isAnonymous: isAnonymous,
                isLoggedIn: isLoggedIn,
                refreshCookie: refreshCookie,
                getAllUsers: getAllUsers
            }
        }]);
