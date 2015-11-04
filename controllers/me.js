angular.module('MyApp').controller('MeCtrl', function($scope, $auth, toastr, API) {

  $scope.getMyBookmarks = function() {
    API.getMyBookmarks()
      .then(function(response) {
        $scope.bookmarks = response.data;
      })
      .catch(function(response) {
        toastr.error(response.data.message, response.status);
      });
  };

  $scope.addBookmark = function() {
    API.addBookmark($scope.newBookmark)
      .then(function(response) {
        $scope.bookmarks.push(response.data);
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

  $scope.deleteBookmark = function(bookmark) {
    API.deleteBookmark(bookmark)
      .then(function(response) {
        $scope.bookmarks = _.reject($scope.bookmarks, function(el) {
          return el.id == bookmark.id;
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

  $scope.startEditingBookmark = function(bookmark) {
    $scope.editingId = bookmark.id;
  };

  $scope.cancelEditingBookmark = function() {
    $scope.editingId = null;
  };

  $scope.editBookmark = function(bookmark) {
    var tagsStart = bookmark.tags;
    var tags = [];
    for (var item in bookmark.tags) {
      tags.push(bookmark.tags[item].text);
    }
    bookmark.tags = tags;
    API.editBookmark(bookmark)
      .then(function(response) {
        var index = $scope.bookmarks.indexOf(bookmark);
        $scope.bookmarks[index] = response.data;
        $scope.cancelEditingBookmark();
        toastr.success('Bookmark updated!');
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

  $scope.getMyBookmarks();
  $scope.editingId = null;
});
