'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAutocomplete',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.completeRep',
  'myApp.doctors',
  'myApp.patients',
  'myApp.learn',
  'myApp.mm',
  'firebase',
  'googleLoginModule',
  'paginationModule',
  'mySymptomsModule',
  'findmyremedyModule'
])

.constant('configs', {
    clientId: '754890700194-je7kh2gv91st19no73hf358u631uidh8.apps.googleusercontent.com',
    clientSecret: '3P-qhjGsheVQgNYronZ3Xxwz',
    apiKey: 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs',
    tid: 'homeopathyCase',
    apiUrl: 'http://api.mkgalaxy.com/',
    projectName: 'Homeopathy'
})

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])

.filter('customDate', function($filter) {
 return function(input) {
  if(input == null){ return ""; }
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
  return _date;
 };
})

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})


.filter('objectAsArray', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    return filtered;
  };
})

.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
  }
})

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
