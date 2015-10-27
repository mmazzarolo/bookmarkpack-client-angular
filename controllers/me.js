angular.module('MyApp').controller('MeCtrl', function($scope, $auth, toastr, API) {

  $scope.getUser = function() {
    API.getMe()
      .then(function(response) {
        $scope.user = response.data;
      })
      .catch(function(response) {
        toastr.error(response.data.message, response.status);
      });
  };

  $scope.isAuthorized = function() {
    return $scope.user.username;
  };

  $scope.addBookmark = function() {
    API.addBookmark($scope.newBookmark)
      .then(function(response) {
        $scope.user.bookmarks.push(response.data);
        toastr.success('Bookmark added!');
      })
      .catch(function(response) {
        if (response.status != 422) {
          toastr.error(response.data.message, response.status);
        } else {
          angular.forEach(response.data.errors, function(value, key) {
            toastr.error(value.message);
          });
        }
      });
  };

  $scope.removeBookmark = function(bookmark) {
    API.deleteBookmark(bookmark)
      .then(function(response) {
        $scope.user.bookmarks = _.reject($scope.user.bookmarks, function(el) {
          return el._id == bookmark._id;
        });
        toastr.success('Bookmark deleted!');
      })
      .catch(function(response) {
        if (response.status != 422) {
          toastr.error(response.data.message, response.status);
        } else {
          angular.forEach(response.data.errors, function(value, key) {
            toastr.error(value.message);
          });
        }
      });
  };

  $scope.editUpdateBookmark = function(bookmark) {
    $scope.editingId = bookmark._id;
  };

  $scope.cancelUpdateBookmark = function() {
    $scope.editingId = null;
  };

  $scope.saveUpdateBookmark = function(bookmark) {
    var tagsStart = bookmark.tags;
    var tags = [];
    for (var item in bookmark.tags) {
      tags.push(bookmark.tags[item].text);
    }
    bookmark.tags = tags;
    console.log(bookmark.tags);
    API.updateBookmark(bookmark)
      .then(function(response) {
        var index = $scope.user.bookmarks.indexOf(bookmark);
        $scope.user.bookmarks[index].favicon = response.data.favicon;
        toastr.success('Bookmark edit!');
      })
      .catch(function(response) {
        if (response.status != 422) {
          toastr.error(response.data.message, response.status);
        } else {
          angular.forEach(response.data.errors, function(value, key) {
            toastr.error(value.message);
          });
        }
      });
    $scope.cancelUpdateBookmark();
  };

  $scope.getUser();
});
