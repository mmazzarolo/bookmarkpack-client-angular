angular.module('MyApp')
  .controller('ResetCtrl', function($scope, $location, toastr, Auth, $stateParams, $auth) {
    if ($auth.isAuthenticated()) { return; }
    $scope.reset = function() {
      Auth.resetPassword($scope.data)
        .then(function() {
          toastr.success('Mail sent correctly');
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
