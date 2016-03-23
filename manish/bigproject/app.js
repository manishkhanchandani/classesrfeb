'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'paginationModule',
  'myApp.auth',
  'myApp.lessons',
  'ngAutocomplete'
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', function($scope) {
  $scope.loggedInUsersData = null;
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
      $scope.loggedInUsersData = JSON.parse(userProfile);
  }
  
}])

;
