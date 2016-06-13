'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'ngAutocomplete',
  'ui.bootstrap',
  'googleLoginModule',
  'rawModule',
  'paginationModule'
])

.constant('configs', {
    clientId: '754890700194-je7kh2gv91st19no73hf358u631uidh8.apps.googleusercontent.com',
    clientSecret: '3P-qhjGsheVQgNYronZ3Xxwz',
    apiKey: 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs',
    tid: 'lawcourse',
    apiUrl: 'http://api.mkgalaxy.com/',
    projectName: 'Law Course'
})
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
})

.filter('stripSlashes', function() {
 return function(input) {
  if(input == null){ return ""; }
  var _data = input.replace(new RegExp("\\\\", "g"), "");
  return _data;
 };
})


.filter('customChanges', function() {
 return function(input) {
  if(input == null){ return ""; }
  var _data = input.replace(new RegExp(" ", "g"), "&nbsp; ");
  _data = _data.replace(new RegExp("\n", "g"), "<br />");
  return _data;
 };
})

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])

.controller('mainController', ['$scope', 'configs', function($scope, configs) {
  
  $scope.projectName = configs.projectName;
  
  $scope.userData = null;
  
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userData');
  if (userProfile) {
      $scope.userData = JSON.parse(userProfile);
  }
  
}])
