angular.module('ice-breaker').controller('detailsController', [ 'httpService', '$http', 'configuration', '$stateParams', '$state',
  function(httpService, $http, configuration, $stateParams, $state) {
    this.tags = configuration.tags;
    this.success = false;

    this.goHome = () => {
      $state.go('home');
    };

    httpService.for('activities').get($stateParams.id).then((resp) => {
      this.activity = resp.data;
      this.diffSeconds = ((new Date(this.activity.ends) - new Date()) / 1000)
    })

    this.addComment = () => {
      httpService.for('activities').post(`${this.activity.id}/add_comment`,{ content: this.newComment }).then(() => {
        $state.go('details', { id: this.activity.id }, {reload: true});
      });
    }

    this.leave = () => {
      httpService.for('activities').post(`${this.activity.id}/leave`).then(()=> {
        $state.go('home');
      });
    }

    this.throwConfetti = () => {
      this.success = true;
    }
  }
]);
