'use strict';

angular.module('issueTracker.account.authentication', [])
    .factory('authentication', [
        '$http',
        '$cookies',
        '$q',
        'baseServiceUrl',
        function ($http, $cookies, $q, baseServiceUrl) {
            var AUTHENTICATION_COOKIE_KEY = 'AuthToken';

			function preserveUserData(data) {
				var accessToken = data.access_token;
				$http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
				$cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
			}

			function removeUserData() {
				$http.defaults.headers.common.Authorization = undefined;
				$cookies.remove(AUTHENTICATION_COOKIE_KEY);
			}
            
            function changePassword(userData) {
                //debugger;
                return $http.post(baseServiceUrl + '/api/Account/ChangePassword', userData);
                
                // var deferred = $q.defer();
                
                // $http.post(baseServiceUrl + 'api/Account/ChangePassword', userData)
                //     .then(function (succsess) {
                //         deferred.resolve(succsess);
                //     }, function (err) {
                //         deferred.reject(err);
                //     });
                
                // return deferred.promise;
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
            }
            
            function getCurrentUser() {
                debugger;
                return {
                    userName: 'bla@a.a'
                };
                // var userObject = sessionStorage['currentUser'];
                // if (userObject) {
                //     return JSON.parse(sessionStorage['currentUser']);
                // }
            }
            
            function isAnonymous() {
                return !$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }
            
            function isLoggedIn() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }
            
            function isNormalUser() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            }
            
            function isAdmin() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            }

			function refreshCookie() {
				if (isLoggedIn()) {
					$http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
					//identity.requestCurrentUserProfile();
				}
			}
            
            return {
                changePassword: changePassword,
                login: login,
                register: register,
                logout: logout,
                getCurrentUser: getCurrentUser,
                isAnonymous: isAnonymous,
                isLoggedIn: isLoggedIn,
                isNormalUser: isNormalUser,
                isAdmin: isAdmin,
                refreshCookie: refreshCookie
            }
        }]);
