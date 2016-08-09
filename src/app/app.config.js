angular.module('ice-breaker').config([
  'localStorageServiceProvider',
  function (localStorageServiceProvider) {

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('ice-breaker-/* @echo environment */'));
  }
]);
