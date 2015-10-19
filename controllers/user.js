angular.module('MyApp')
  .controller('UserCtrl', function($scope, $auth, $stateParams, toastr, User) {

    $scope.getUser = function() {
      User.getUser($stateParams.username)
        .then(function(response) {
          $scope.user = response.data.user;
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };

    $scope.isAuthorized = function() {
      return $scope.user.username;
    };

    $scope.addBookmark = function() {
      User.postBookmark($stateParams.username, $scope.newBookmark)
        .then(function(response) {
          $scope.user.bookmarks.push(response.data.bookmark);
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

    $scope.removeBookmark = function(removeBookmark) {
      User.removeBookmark($stateParams.username, removeBookmark._id)
        .then(function(response) {
          $scope.user.bookmarks = _.reject($scope.user.bookmarks, function(el) { return el._id === removeBookmark._id; });
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

    $scope.getUser();
  });
