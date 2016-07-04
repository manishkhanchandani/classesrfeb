'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.reviews',
  'paginationModule',
  'googleLoginModule',
  'ngAutocomplete',
  'ratingsModule'
])

.constant('configs', {
    clientId: '754890700194-je7kh2gv91st19no73hf358u631uidh8.apps.googleusercontent.com',
    clientSecret: '3P-qhjGsheVQgNYronZ3Xxwz',
    apiKey: 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs',
    tid: '1',
    apiUrl: 'http://api.mkgalaxy.com/',
    projectName: 'Reviews'
})

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])

.controller('mainController', ['$scope','configs', function($scope,configs) {
        
         $scope.templateUrl = 'modules/navItems/reviews.html';

  $scope.userData = null;
  
  
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userData');
  if (userProfile) {
      $scope.userData = JSON.parse(userProfile);
  }
        
}]);
