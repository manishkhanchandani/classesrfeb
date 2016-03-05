'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'paginationModule',
  'myApp.auth',
  'myApp.lessons',
  'ngAutocomplete',
  'myApp.religion'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', function($scope) {
  $scope.loggedInUsersData = null;
  
  //get user data from localstorage
  var userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
   $scope.loggedInUsersData = JSON.parse(userProfile); 
   console.log('loggedinuser: ', $scope.loggedInUsersData);
  }
  //end localstorage
  
  $scope.project = 'religion';
  
  switch ($scope.project) {
    case 'religion':
      $scope.menuTemplateUrl = 'modules/menu/religion.html';
      break;
    case 'lessons':
      $scope.menuTemplateUrl = 'modules/menu/lessons.html';
      break; 
  }
  
}])

;
