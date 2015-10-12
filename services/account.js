angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:3000/account');
      },
      updateProfile: function(accountData) {
        return $http.patch('http://localhost:3000/account', accountData);
      },
      deleteProfile: function(accountData) {
        return $http.delete('http://localhost:3000/account', accountData);
      },
      updatePassword: function(passwordData) {
        return $http.post('http://localhost:3000/account/password', passwordData);
      },
      updateEmail: function(emailData) {
        return $http.post('http://localhost:3000/account/email', emailData);
      }
    };
  });
