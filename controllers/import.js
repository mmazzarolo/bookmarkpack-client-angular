angular.module('MyApp').controller('ImportCtrl', function($scope, $auth, toastr, Upload, $timeout) {

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

});
