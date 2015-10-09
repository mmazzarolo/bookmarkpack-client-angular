angular.module('MyApp')
  .factory('Auth', function($http) {
    return {
      verifyAccount: function(data) {
        return $http.post('http://localhost:3000/auth/verify', data);
      },
      verifyConfirmAccount: function(token) {
        var url = 'http://localhost:3000/auth/verify/' + token;
        return $http.post(url);
      },
      resetPassword: function(data) {
        return $http.post('http://localhost:3000/auth/reset', data);
      },
      resetConfirmPassword: function(token, data) {
        var url = 'http://localhost:3000/auth/reset/' + token;
        return $http.post(url, data);
      }
    };
  });
