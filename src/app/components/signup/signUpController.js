angular.module('ice-breaker').controller('signUpController', [ '$state', 'localStorageService', '$rootScope', '$http', 'httpService',
function($state, localStorageService, $rootScope, $http, httpService) {

  this.user = {};
  this.tags = configuration.tags;


  this.signUp = () => {

     httpService.for('users').post('login', user).then((user) => {
      this.wrongDataErrorOcurred = false;
      $rootScope.loggedUser = user;
      localStorageService.set('loggedUser', user);
      $http.defaults.headers.common['Authorization'] = user.session_token;
      $state.go('home');
    }).catch(() => {
      this.wrongDataErrorOcurred = true;
    })
  };


  this.addTag = (tag) => {
    if(tag.selected) {
      _.remove(this.users.tags, tag);
    } else {
      this.users.tags.push(tag);
    };
    tag.selected = !tag.selected;
  };


}]);