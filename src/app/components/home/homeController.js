angular.module('ice-breaker').controller('homeController', [ 'httpService', '$http', 'configuration', '$state',
  function(httpService, $http, configuration, $state) {
    this.activities = [];

    this.tags = configuration.tags;

    this.confirmActivity = (activity) => {
      httpService.for('activities').post(`${activity.id}/join`).then(()=>{
        $state.go('details', {id: activity.id});
      });
    };

    this.seeDetails = (id) => {
      $state.go('details', {id});
    };

    this.getRemaining = (activity) => {
      activity.diffSeconds = ((new Date(activity.ends) - new Date()) / 1000)
    };

    httpService.for('activities').get('search').then((feed) => {
      this.activities = feed.data;
    });

    httpService.for('activities').get('my_activities').then((resp) => {
      this.my_activities = resp.data;
    });

    this.createActivity = () => {
      $state.go('create');
    };

    this.getIcon = (activity) => {
      return `../../assets/${this.tags[activity.interests[0]].name}.svg`;
    };
  }
]);
