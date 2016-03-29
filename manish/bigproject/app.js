'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'paginationModule',
  'myApp.auth',
  'myApp.lessons',
  'ngAutocomplete'
  //'ui.bootstrap'
])
.constant('configs', {
  siteUrl: 'lessons'
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', 'configs', function($scope, configs) {
  
  $scope.templateUrl = null;

  if (configs.siteUrl === 'lessons') {
    $scope.templateUrl = 'modules/navItems/lessons.html';
  } else if (configs.siteUrl === 'legal') {
    $scope.templateUrl = 'modules/navItems/legal.html';
  } else if (configs.siteUrl === 'activities') {
    $scope.templateUrl = 'modules/navItems/activities.html';
  } else if (configs.siteUrl === 'housing') {
    $scope.templateUrl = 'modules/navItems/housing.html';
  }
  
  $scope.loggedInUsersData = null;
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
      $scope.loggedInUsersData = JSON.parse(userProfile);
  }
  
}])

;
