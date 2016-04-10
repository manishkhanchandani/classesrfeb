'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAutocomplete',
  'loginModule',
  'paginationModule',
  'messagesModule',
  'myApp.messages',
  'myApp.lessons',
  'myApp.students',
  'myApp.massage',
  'firebase'
  //'ui.bootstrap'
])
.constant('configs', {
  'ineedtutor.us': {
    siteUrl: 'lessons',
    clientId: '754890700194-je7kh2gv91st19no73hf358u631uidh8.apps.googleusercontent.com',
    clientSecret: '3P-qhjGsheVQgNYronZ3Xxwz',
    apiKey: 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs',
    title: 'I Need Tutor :: Search/Browse Teachers And Students',
    firebaseUrl: 'https://mkgxy.firebaseio.com/projects/lessons',
    tid: 2,
    homePage: 'modulesFB/lessons/lessons.html',
    apiUrl: 'http://api.mkgalaxy.com/'
  },
  'ineedmassage.us': {
    siteUrl: 'massage',
    clientId: '754890700194-je7kh2gv91st19no73hf358u631uidh8.apps.googleusercontent.com',
    clientSecret: '3P-qhjGsheVQgNYronZ3Xxwz',
    apiKey: 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs',
    title: 'I Need Massage :: Search/Browse Massage',
    firebaseUrl: 'https://mkgxy.firebaseio.com/projects/massage',
    tid: 3,
    homePage: 'modulesFB/massage/massage.html',
    apiUrl: 'http://api.mkgalaxy.com/'
  }
})

.config(['$routeProvider', '$locationProvider', 'configs', function($routeProvider, $locationProvider, configs) {
  var host = window.location.hostname;
  host = host.replace("www.", "");
  var homePage = configs[host].homePage;
  $routeProvider
  .when('/', {
    templateUrl: homePage,
    controller: 'homePageController'
  })
  .otherwise({redirectTo: '/'});
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


//http://gonzalo123.com/2014/09/08/sharing-scope-between-controllers-with-angularjs/
.factory('Scopes', function ($rootScope) {
    var mem = {};
 
    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
})



.controller('mainController', ['$scope', '$location', '$firebaseArray', 'dataService', '$timeout', function($scope, $location, $firebaseArray, dataService, $timeout) {
  
  //config
  $scope.config = dataService.config();
  $scope.templateUrl = 'modules/navItems/'+$scope.config.siteUrl+'.html';
 
  document.title = $scope.config.title;
  //firebase functionality, remove if you want api
  $scope.ref = new Firebase($scope.config.firebaseUrl);
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
        //console.log('udata: ', $scope.userData);
        $timeout(function(){
          if(!$scope.$$phase) $scope.$apply();
        });
      });
		  /*$scope.ref.child('users').child(authData.uid).once('value', function(ret) {
				  $scope.$apply(function() {
					  $scope.userData = ret.val();
					  //console.log('userdata: ', $scope.userData);
				  });
			  });*/
		} else {
		  console.log("User is logged out", authData);
		  $scope.userData = null;
		}
	}
	
	$scope.ref.onAuth(authDataCallback);
  
  
  /*$scope.tutorsRecord = $scope.ref.child('tutors').child('records');
  $scope.tutorsLocation = $scope.ref.child('tutors').child('location');
  $scope.tutorsTags = $scope.ref.child('tutors').child('tags');
  $scope.tutorsOnlyTags = $scope.ref.child('tutors').child('onlyTags');
  $scope.tutorsMy = $scope.ref.child('tutors').child('my');
  $scope.tutorsArr = $firebaseArray($scope.tutorsRecord);
  $scope.studentsRecord = $scope.ref.child('students').child('records');
  $scope.studentsLocation = $scope.ref.child('students').child('location');
  $scope.studentsTags = $scope.ref.child('students').child('tags');
  $scope.studentsOnlyTags = $scope.ref.child('students').child('onlyTags');
  $scope.studentsMy = $scope.ref.child('students').child('my');
  $scope.studentsArr = $firebaseArray($scope.studentsRecord);*/
  //firebase functionality
  
  $scope.userData = null;
  
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userData');
  if (userProfile) {
      $scope.userData = JSON.parse(userProfile);
  }
  
}])

.controller('homePageController', ['$scope', function($scope) {
  
}])

;
