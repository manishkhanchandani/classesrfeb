'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAutocomplete',
  'googleLoginFBModule',
  'paginationModule',
  'messagesModule',
  'myApp.messages',
  'myApp.lessons',
  'myApp.students',
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
    firebaseUrl: 'https://mycontacts12.firebaseio.com/projects/lessons',
    tid: 2,
    homePage: 'modulesFB/lessons/lessons.html',
    apiUrl: 'http://api.mkgalaxy.com/'
    
  }
})



.config(['$routeProvider', '$locationProvider', 'configs', function($routeProvider, $locationProvider, configs) {
  var host = window.location.hostname;
  var homePage = configs[host].homePage;
  $routeProvider
  .when('/', {
    templateUrl: homePage,
    controller: 'homePageController'
  })
  .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])

.controller('mainController', ['$scope', 'configs', '$location', '$firebaseArray', 'dataService', function($scope, configs, $location, $firebaseArray, dataService) {
  
  //config
  $scope.config = dataService.config();
  $scope.templateUrl = null;
  if ($scope.config.siteUrl === 'lessons') {
    $scope.templateUrl = 'modules/navItems/lessons.html';
  } else if ($scope.config.siteUrl === 'student') {
    $scope.templateUrl = 'modules/navItems/student.html';
  }
  document.title = $scope.config.title;
  //firebase functionality, remove if you want api
  $scope.ref = new Firebase($scope.config.firebaseUrl);
  $scope.tutorsRecord = $scope.ref.child('tutors').child('records');
  $scope.tutorsLocation = $scope.ref.child('tutors').child('location');
  $scope.tutorsTags = $scope.ref.child('tutors').child('tags');
  $scope.tutorsArr = $firebaseArray($scope.tutorsRecord);
  $scope.studentsRecord = $scope.ref.child('students').child('records');
  $scope.studentsLocation = $scope.ref.child('students').child('location');
  $scope.studentsTags = $scope.ref.child('students').child('tags');
  $scope.studentsArr = $firebaseArray($scope.studentsRecord);
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
