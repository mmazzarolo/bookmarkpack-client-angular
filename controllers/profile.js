angular.module('MyApp').controller('ProfileCtrl', function($scope, $auth, toastr, API) {

  $scope.getProfile = function() {
    API.getProfile()
      .then(function(response) {
        $scope.user = response.data;
      })
      .catch(function(response) {
        toastr.error(response.data.message, response.status);
      });
  };

  $scope.updateProfile = function() {
    API.updateProfile($scope.user)
      .then(function() {
        toastr.success('Profile has been updated');
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

  $scope.updateEmail = function() {
    API.updateEmail($scope.emailData)
      .then(function() {
        toastr.success('Email has been updated');
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

  $scope.updatePassword = function() {
    API.updatePassword($scope.passwordData)
      .then(function() {
        toastr.success('Password has been updated');
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

  $scope.link = function(provider) {
    $auth.link(provider)
      .then(function() {
        toastr.success('You have successfully linked a ' + provider + ' account');
        $scope.getProfile();
      })
      .catch(function(response) {
        toastr.error(response.data.message, response.status);
      });
  };

  $scope.unlink = function(provider) {
    $auth.unlink(provider)
      .then(function() {
        toastr.info('You have unlinked a ' + provider + ' account');
        $scope.getProfile();
      })
      .catch(function(response) {
        toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
      });
  };

  $scope.getProfile();
});
