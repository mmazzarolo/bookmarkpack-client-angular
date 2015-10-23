angular.module('MyApp')
  .factory('Me', function($http) {
    return {
      getUser: function() {
        console.log('http://localhost:3000/user/');
        return $http.get('http://localhost:3000/user');
      },
      postBookmark: function(username, bookmark) {
        console.log('http://localhost:3000/user/bookmarks/' + bookmark);
        return $http.post('http://localhost:3000/user/bookmarks', bookmark);
      },
      removeBookmark: function(username, bookmark) {
        console.log('http://localhost:3000/user/bookmarks/' + bookmark);
        return $http.delete('http://localhost:3000/user/bookmarks/', bookmark);
      },
      editBookmark: function(username, bookmark) {
        console.log('http://localhost:3000/user/bookmarks/' + bookmark);
        return $http.patch('http://localhost:3000/user/bookmaks/', bookmark);
      }
    };
  });
