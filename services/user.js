angular.module('MyApp')
  .factory('User', function($http) {
    return {
      getUser: function(username) {
        return $http.get('http://localhost:3000/users/' + username);
      },
      postBookmark: function(username, bookmark) {
        return $http.post('http://localhost:3000/users/' + username + '/add', bookmark);
      }
    };
  });
