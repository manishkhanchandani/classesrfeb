'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'loginModule',
  'messagesModule',
  'myApp.view1',
  'firebase'
  //'ui.bootstrap'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  $locationProvider.html5Mode(true);
}])

.controller('mainController', ['$scope', 'dataService', '$timeout', function($scope, dataService, $timeout) {
  $scope.config = dataService.config();
  $scope.ref = new Firebase($scope.config.firebaseUrl);
  $scope.userData = null;
  
   //onAuth
	function authDataCallback(authData) {
		//console.log('authdata', authData);
		if (authData) {
		  //console.log("User is logged in", authData);
      $scope.ref.child('users').child(authData.uid).once("value", function(snapshot) {
        var a = snapshot.exists();
        if (!a) {
          return;
        }
        $scope.userData = snapshot.val();
        localStorage.setItem('userData', JSON.stringify($scope.userData));
        console.log('udata: ', $scope.userData);
        $timeout(function(){
          if(!$scope.$$phase) $scope.$apply();
        });
      });
		} else {
		  console.log("User is logged out", authData);
		  $scope.userData = null;
		}
	}
	
	$scope.ref.onAuth(authDataCallback);
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userData');
  if (userProfile) {
      $scope.userData = JSON.parse(userProfile);
  }
  
}])
