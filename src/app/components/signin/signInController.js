angular.module('ice-breaker').controller('signInController', [ '$state', 'localStorageService', '$rootScope', 'httpService', 'authenticationService',
function($state, localStorageService, $rootScope, httpService, authenticationService) {

  this.loginData = {};

    this.signIn = () => {
      authenticationService.login(this.loginData)
        .then(() => {
          $state.go('home');
        })
    };


}]);
