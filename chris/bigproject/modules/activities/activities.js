'use strict';
// this is a sub module
angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewActivitiesCtrl'
  }).when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewActivitiesCtrl'
  }).when('/activities/create/images:id', {  //need id from page1
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewActivitiesCtrl', ['$scope', function($scope) {

}]).controller('ViewCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewImagesCtrl', ['$scope', function($scope) {

}]);