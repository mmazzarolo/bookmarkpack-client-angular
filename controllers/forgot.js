angular.module('MyApp')
  .controller('ForgotCtrl', function($scope, $auth, toastr, Account) {
    if ($auth.isAuthenticated()) { return; }
    $scope.forgot = function() {
      Account.forgotPassword($scope.data)
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
    };
  });
