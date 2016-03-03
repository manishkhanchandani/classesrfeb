'use strict';
// app.js is global and will be called on every page refresh.

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.auth',
  'myApp.lessons',
  'ngAutocomplete'
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', function($scope) {
    //create global variable that can be access anywhere
    $scope.loggedInUsersData    = null;

    //Get the details from local storage
    var userProfile                 = localStorage.getItem('userProfile');

    if( userProfile ){
        $scope.loggedInUsersData    = JSON.parse(userProfile);
    }


}])
