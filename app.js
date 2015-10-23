angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'ngTagsInput'])
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
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

  $authProvider.baseUrl = 'http://localhost:3000';

  $authProvider.facebook({
    clientId: '1537545373172672'
  });

  $authProvider.google({
    clientId: '935284992833-m3ck8tviors0nbt9qtoqsnucsid7a9v0.apps.googleusercontent.com'
  });

  $authProvider.withCredentials = false;

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
    return window._; // assumes underscore has already been loaded on the page
  });

});
