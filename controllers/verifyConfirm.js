angular.module('MyApp').controller('VerifyConfirmCtrl', function($scope, $location, $auth, $stateParams, toastr, API) {

  $scope.verifyConfirm = function() {
    API.verifyConfirmAccount($stateParams.token)
      .then(function() {
        toastr.info('Your account has been verified!');
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

  $scope.verifyConfirm();

});
