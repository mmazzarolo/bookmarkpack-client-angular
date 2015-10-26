angular.module('MyApp')
.factory('Me', function($http) {
 return {
   getUser: function() {
     return $http.get('http://localhost:3000/user');
   },
   postBookmark: function(bookmark) {
     return $http({
       method: 'POST',
       url: 'http://localhost:3000/user/bookmarks/',
       data: bookmark,
       params: { 'extract[]': ['favicon','title'] }
     });
   },
   removeBookmark: function(bookmark) {
     return $http({
       method: 'DELETE',
       url: 'http://localhost:3000/user/bookmarks/',
       data: bookmark,
       headers: {'Content-Type': 'application/json;charset=utf-8'}
     });
   },
   editBookmark: function(bookmark) {
     return $http.patch('http://localhost:3000/user/bookmarks/', bookmark);
   }
 };
});
