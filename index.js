angular
.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngTagsInput', 'ngFileUpload', 'config'])
.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, secret) {
  $stateProvider
  .state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'partials/home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl',
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'partials/signup.html',
    controller: 'SignupCtrl',
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('logout', {
    url: '/logout',
    template: null,
    controller: 'LogoutCtrl'
  })
  .state('reset', {
    url: '/reset',
    templateUrl: 'partials/reset.html',
    controller: 'ResetCtrl',
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('resetConfirm', {
    url: '/reset/:token',
    templateUrl: 'partials/resetConfirm.html',
    controller: 'ResetConfirmCtrl',
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'partials/profile.html',
    controller: 'ProfileCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('verifyConfirm', {
    url: '/verify/:token',
    template: null,
    controller: 'VerifyConfirmCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('me', {
    url: '/me',
    templateUrl: 'partials/me.html',
    controller: 'MeCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })
  .state('user', {
    url: '/:username',
    templateUrl: 'partials/user.html',
    controller: 'UserCtrl'
  });

  $urlRouterProvider.otherwise('/');

  $authProvider.baseUrl = secret.serverUrl;

  $authProvider.facebook({
    clientId: secret.facebookClientId
  });

  $authProvider.google({
    clientId: secret.googleClientId
  });

  console.log($authProvider.baseUrl);
  console.log(secret.facebookClientId);
  console.log(secret.googleClientId);

  $authProvider.withCredentials = false;

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = false;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

  var underscore = angular.module('underscore', []);
  underscore.factory('_', function() {
    return window._;
  });
});

