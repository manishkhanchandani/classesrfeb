'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'paginationModule',
  'advertisementModule',
  'myApp.auth',
  'myApp.lessons',
  'ngAutocomplete',
  'myApp.religion'
])

.constant('config', {
  sitePath: 'religion'
})

.config(['$routeProvider', 'config', function($routeProvider, config) {
  $routeProvider.otherwise({redirectTo: '/'+config.sitePath});
}])

.controller('mainController', ['$scope', 'config', function($scope, config) {
  $scope.loggedInUsersData = null;
  
  //get user data from localstorage
  var userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
   $scope.loggedInUsersData = JSON.parse(userProfile); 
   console.log('loggedinuser: ', $scope.loggedInUsersData);
  }
  //end localstorage
  
  $scope.project = config.sitePath;
  
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
