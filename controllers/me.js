angular.module('MyApp')
  .controller('MeCtrl', function($scope, $auth, toastr, Me) {

    $scope.getUser = function() {
      Me.getUser()
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
      Me.postBookmark($scope.newBookmark)
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
      Me.removeBookmark(bookmark)
        .then(function(response) {
          $scope.user.bookmarks = _.reject($scope.user.bookmarks, function(el) { return el._id == bookmark._id; });
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
      Me.editBookmark(bookmark)
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
