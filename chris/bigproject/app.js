'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'paginationModule',
    "myApp.lessons",
    "myApp.auth",
    "myApp.computer",
    "myApp.activities",
    "myApp.beauty",
    "myApp.rideshare",
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.view3',
//  'myApp.view4',
//  'myApp.view5',
//  'myApp.view6'
  //,
  'ngAutocomplete'
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', function($scope) {
  $scope.loggedInUsersData = null;
    
    // for browser refresh
    var userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        $scope.loggedInUsersData = JSON.parse(userProfile);
    }
}])
