angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:3000/api/v1/me');
      },
      updateProfile: function(profileData) {
        return $http.patch('http://localhost:3000/api/v1/me', profileData);
      },
      deleteProfile: function(profileData) {
        return $http.delete('http://localhost:3000/api/v1/me', profileData);
      },
      forgotPassword: function(email) {
        return $http.post('http://localhost:3000/auth/forgot', email);
      },
      resetPassword: function(token, data) {
        var url = 'http://localhost:3000/auth/reset/' + token;
        return $http.post(url, data);
      }
    };
  });
