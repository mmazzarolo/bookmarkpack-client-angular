angular.module('MyApp').controller('LoginCtrl', function($scope, $location, $auth, toastr) {

  $scope.login = function() {
    $auth.login($scope.user)
      .then(function() {
        toastr.success('You have successfully signed in');
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

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function() {
        toastr.success('You have successfully signed in with ' + provider);
        $location.path('/');
      })
      .catch(function(response) {
        console.log(response);
        angular.forEach(response.data, function(value, key) {
          toastr.error(value.message);
        });
        toastr.error(response.data.message);
      });
  };

});
