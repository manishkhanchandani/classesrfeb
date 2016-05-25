'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
    'myApp.view2',
  'ngAutocomplete'
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', function($scope) {
     $scope.ref = new Firebase("https://amber-torch-2130.firebaseio.com");
    /*ref.createUser({
      email    : "a4@mkgalaxy.com",
      password : "password"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });*/
  
}]);
