angular.module('MyApp').controller('ImportCtrl', function($scope, $auth, toastr, Upload, $timeout, API) {

  $scope.$watch('file', function() {
    if ($scope.file != null) {
      $scope.read($scope.file);
    }
  });

  var baseUrl = 'http://localhost:3000';

  $scope.read = function(file) {
    file.upload = Upload.upload({
      url: baseUrl + '/user/bookmarks/import',
      data: { file: file }
    });
    file.upload.then(function(response) {
      $timeout(function() {
        file.result = response.data.message;
      });
    }, function(response) {
      if (response.status > 0)
        toastr.error(response.data.message, response.status);
    }, function(evt) {
      file.progress = Math.min(100, parseInt(100.0 *
        evt.loaded / evt.total));
    });
  };

  $scope.github = function() {
    var username = {'username' : $scope.username};
    API.importGithub(username)
      .then(function(response) {
        $scope.user.bookmarks.concat(response.data);
        toastr.success('Bookmark added!');
      })
      .catch(function(response) {
        console.log(response);
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
