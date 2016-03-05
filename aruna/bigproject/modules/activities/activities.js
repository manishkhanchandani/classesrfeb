'use strict';

angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewAtivitiesCtrl'
  })
  .when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewCreateCtrl'
  })
  .when('/activities/create/images/:id', {
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewImagesCtrl'
  })
        ;
}])

.controller('ViewActivitiesCtrl', ['$scope',function($scope) {

}])

.controller('ViewCreateCtrl', ['$scope',function($scope) {
//location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
}])

.controller('ViewImagesCtrl', ['$scope',function($scope) {

}]);