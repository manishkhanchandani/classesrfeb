'use strict';

angular.module('myApp.manager', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/manager/county', {
    templateUrl: 'modulesFB/manager/county.html',
    controller: 'ViewManagerCountyCtrl'
  })
  ;
}])


.controller('ViewManagerCountyCtrl', ['$scope', function($scope) {
  if (!$scope.userData) {
   $location.path('/');
   return; 
  }
  if (!$scope.userData.uid) {
   $location.path('/');
   return; 
  }
  
  //location starts
  $scope.mapOptions = {
    types: '(cities)'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  //location ends
}])
;