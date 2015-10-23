angular.module('MyApp')
.factory('Me', function($http) {
  return {
    getUser: function() {
      return $http.get('http://localhost:3000/user');
    },
    postBookmark: function(bookmark) {
      return $http.post('http://localhost:3000/user/bookmarks', bookmark);
    },
    removeBookmark: function(bookmark) {
        // http://stackoverflow.com/questions/22186671/angular-resource-delete-wont-send-body-to-express-js-server
        var config = {
          method: 'DELETE',
          url: 'http://localhost:3000/user/bookmarks/',
          data: bookmark,
          headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        return $http(config);
      },
      editBookmark: function(bookmark) {
        return $http.patch('http://localhost:3000/user/bookmarks/', bookmark);
      }
    };
  });
