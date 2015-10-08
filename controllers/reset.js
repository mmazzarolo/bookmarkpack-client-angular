angular.module('MyApp')
  .controller('ResetCtrl', function($scope, $location, toastr, Account, $stateParams, $auth) {
    if ($auth.isAuthenticated()) { return; }
    $scope.reset = function() {
      Account.resetPassword($stateParams.token, $scope.data)
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
    }
  });
