'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  
  .when('/login', {
    templateUrl: 'view1/login.html',
    controller: 'ViewLoginCtrl'
  });
})]


.controller('View1Ctrl', [function('$scope', function($scope) {

}]);