angular.module('MyApp').controller('UserCtrl', function($scope, $auth, $stateParams, toastr, API) {

  $scope.getUser = function() {
    API.getUser($stateParams.username)
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

  $scope.getUser();
});
