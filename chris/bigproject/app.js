'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    "myApp.lessons",
    "myApp.auth"
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.view3',
//  'myApp.view4',
//  'myApp.view5',
//  'myApp.view6'
  //,
  //'ngAutocomplete',
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', function($scope) {
  
}])
