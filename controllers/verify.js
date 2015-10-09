angular.module('MyApp')
  .controller('VerifyCtrl', function($scope, $location, $auth, toastr, Auth) {
    $scope.verify = function() {
      Auth.verifyAccount($scope.user)
        .then(function() {
          toastr.info('A verification email has been sent to ' + $scope.user.email);
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
