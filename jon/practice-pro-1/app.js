'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.auth',
  'myApp.lessons'

  //,
  //'ngAutocomplete',
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', function($scope) {
    //create global variable that can be access anywhere
    $scope.loggedInUsersData    = null;

}])
