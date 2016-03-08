'use strict';
// this is a sub module
angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewActivitiesCtrl'
  }).when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewActivitiesCreateCtrl'
  }).when('/activities/create/images/:id', {  //need id from page1
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewActivitiesImagesCtrl'
  });
}])

.controller('ViewActivitiesCtrl', ['$scope', function($scope) {

}]).controller('ViewActivitiesCreateCtrl', ['$scope', '$location', function($scope, $location) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
    $scope.submitCreateForm = function() {
        //call api service to submit the form
        console.log('test');
        // redirect, using dummy id for mow
        $location.path('/activities/create/images/1');
    };
}]).controller('ViewActivitiesImagesCtrl', ['$scope', function($scope) {

}]);