angular.module('ice-breaker').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go('home');
    });

    // Now set up the states
    $stateProvider
      .state('centered', {
        abstract: true,
        views: {
          main: {
            templateUrl: '../app/components/centered/centered.html'
          }
        },
        data: {
          requireLogin: false
        }
      })
      .state('signin', {
        url: '/signin',
        controller: 'signInController',
        controllerAs: 'signInCtrl',
        views: {
          main: {
            controller: 'signInController',
            controllerAs: 'signInCtrl',
            templateUrl: '../app/components/signin/signin.html'
          }
        },
        data: {
          requireLogin: false
        }
      })
      .state('signup', {
        url: '/signup',
        controller: 'signUpController',
        controllerAs: 'signUpCtrl',
        views: {
          main: {
            controller: 'signUpController',
            controllerAs: 'signUpCtrl',
            templateUrl: '../app/components/signup/signup.html'
          }
        },
        data: {
          requireLogin: false
        }
      })
      .state('home', {
        url: '/home',
        views: {
          main: {
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            templateUrl: '../app/components/home/home.html'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('create', {
        url: '/create',
        views: {
          main: {
            controller: 'createController',
            controllerAs: 'createCtrl',
            templateUrl: '../app/components/create/create.html'
          }
        },
        data: {
          requireLogin: true
        }
      })
      .state('details', {
        url: '/activity/:id',
        views: {
          main: {
            controller: 'detailsController',
            controllerAs: 'detailsCtrl',
            templateUrl: '../app/components/details/details.html'
          }
        },
        data: {
          requireLogin: true
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
