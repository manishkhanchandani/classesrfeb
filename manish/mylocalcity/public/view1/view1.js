'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/profile', {
    templateUrl: 'view1/profile.html',
    controller: 'ProfileCtrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])
.controller('View2Ctrl', ['$scope', function($scope) {

}])
.controller('ProfileCtrl', ['$scope', function($scope) {
  console.log($scope);
}]);