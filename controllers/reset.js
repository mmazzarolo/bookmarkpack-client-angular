angular.module('MyApp').controller('ResetCtrl', function($scope, $location, toastr, API, $stateParams, $auth) {

  if ($auth.isAuthenticated()) return;

  $scope.reset = function() {
    API.resetPassword($scope.data)
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
