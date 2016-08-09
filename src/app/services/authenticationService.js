angular.module('ice-breaker').factory('authenticationService', [
  'httpService', '$http', 'localStorageService', '$state',
  function (httpService, $http, localStorageService, $state) {

    return {
      logout: () => {
        const successLogoutCb = () => {
          localStorageService.remove('session_token');
          delete $http.defaults.headers.common.AUTHORIZATION;
          $state.go('auth.login');
        };

        const errorLogoutCb = () => {
          window.console.log('Error when trying to log out');
        };

        return httpService.delete('logout').then(successLogoutCb, errorLogoutCb);
      },

      isLoggedIn: () => {
        return !!localStorageService.get('session_token');
      },

      login: (params) => {
        const defaultSuccessCb = (data) => {
          localStorageService.set('session_token', data.data.session_token);
          $http.defaults.headers.common.AUTHORIZATION = data.data.session_token;
          return data;
        };
        return httpService.post('login', params).then(defaultSuccessCb);
      },

      signUp: (params) => {

        const defaultSuccessCb = (data) => {
          localStorageService.set('session_token', data.data.session_token);
          $http.defaults.headers.common.AUTHORIZATION = data.data.session_token;
          return data;
        };

        return httpService.post('users', params).then(defaultSuccessCb);
      }
    };
  }
]);
