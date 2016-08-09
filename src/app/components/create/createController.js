angular.module('ice-breaker').controller('createController', [ 'httpService', '$http', 'configuration', '$state',
function(httpService, $http, configuration, $state) {
  this.activity = {};
  this.activity.interests = [];

  httpService.for('users').get('me').then((resp)=> {
    this.user = resp.data;
  })

  this.addOrRemoveInterest = (id) => {
    if (_.includes(this.activity.interests, id)) {
      _.remove(this.activity.interests, function(n) {
        return n == id;
      });
    } else {
      this.activity.interests.push(id);
    }
    console.log(this.activity.interests);
  }

  this.isSelected = (id) => {
    return _.includes(this.activity.interests, id)
  }

  this.goHome = () => {
    $state.go('home');
  }

  this.sendActivity = () => {
    this.activity.completed = false;
    this.activity.min_users = 2;
    this.activity.max_users = 2;
    const now = new Date();
    const fourHoursLater = new Date(now.getTime() + (4*1000*60*60));
    this.activity.ends = fourHoursLater.toISOString();
    this.activity.owner_id = this.user.id;
    this.activity.challenge = false;
    this.activity.discount = false;

    return httpService.post('activities', this.activity).then((resp) => {
      $state.go('home');
    });
  }

}]);
