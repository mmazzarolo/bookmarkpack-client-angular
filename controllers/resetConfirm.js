angular.module('MyApp').controller('ResetConfirmCtrl', function($scope, $location, toastr, API, $stateParams, $auth) {

  if ($auth.isAuthenticated()) return;

  $scope.resetConfirm = function() {
    API.resetConfirmPassword($stateParams.token, $scope.data)
      .then(function() {
        toastr.info('You can now login with your new password.');
        $location.path('/');
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

});
