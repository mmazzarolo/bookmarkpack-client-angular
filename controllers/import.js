angular.module('MyApp').controller('ImportCtrl', function($scope, $auth, toastr, Me, Upload, $timeout) {

  $scope.$watch('file', function () {
    if ($scope.file != null) {
        $scope.read($scope.file);
        }
    });

  $scope.read = function (file) {
    file.upload = Upload.upload({
                url: 'http://localhost:3000/user/bookmarks/import',
                data: {file: file}
            });
     file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data.message;
                });
            }, function (response) {
                if (response.status > 0)
                  console.log(response);
                    $scope.errorMsg = response.status + ': ' + response.data.message;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
    // Me.postImport(file)
    //     .then(function(response) {
    //       toastr.success('Done!');
    //     })
    //     .catch(function(response) {
    //       if (response.status != 422) {
    //         toastr.error(response.data.message, response.status);
    //       } else {
    //         angular.forEach(response.data.errors, function(value, key) {
    //           toastr.error(value.message);
    //         });
    //       }
    //     });
    // var reader;
    // reader = new FileReader();
    // reader.onload = function() {
    //   $scope.chromeFile = reader.result;
    //   console.log(reader.result);
    //   return $scope.$apply();
    // };
    // reader.readAsText(file);
    // console.log('asdf');

  };

  $scope.addBookmark = function() {
    Me.postBookmark($scope.newBookmark)
    .then(function(response) {
      $scope.user.bookmarks.push(response.data);
      toastr.success('Bookmark added!');
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
