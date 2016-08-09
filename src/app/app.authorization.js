angular.module('ice-breaker').run([
  '$rootScope', '$state', 'authenticationService', '$http', 'localStorageService',
  function ($rootScope, $state, authenticationService, $http, localStorageService) {

    $http.defaults.headers.common.AUTHORIZATION = localStorageService.get('session_token');

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (!authenticationService.isLoggedIn() && toState.data.requireLogin) {
        event.preventDefault();
        $state.go('signin');
      } else if (authenticationService.isLoggedIn() && toState.name === 'auth.login') {
        event.preventDefault();
        $state.go('home');
      }
    });
  }
]);
