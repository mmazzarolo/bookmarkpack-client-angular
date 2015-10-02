angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:3000/api/v1/me');
      },
      updateProfile: function(profileData) {
        return $http.patch('http://localhost:3000/api/v1/me', profileData);
      }
    };
  });
