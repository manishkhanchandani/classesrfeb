'use strict';

angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewAtivitiesCtrl'
  })
  .when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewActivitiesCreateCtrl'
  })
  .when('/activities/create/images/:id', {
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewActivitiesImagesCtrl'
  })
        ;
}])

.controller('ViewActivitiesCtrl', ['$scope',function($scope) {

}])

.controller('ViewActivitiesCreateCtrl', ['$scope','$location',function($scope,$location) {
//location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
   $scope.submitActivitiesCreateForm = function() {
     //call api service to submit the form
     console.log('hey');
     $location.path('/activities/create/images/1');
  };
}])

.controller('ViewActivitiesImagesCtrl', ['$scope',function($scope) {

}]);