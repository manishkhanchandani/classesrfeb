'use strict';

angular.module('myApp.manager', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/manager/county', {
    templateUrl: 'modulesFB/manager/county.html',
    controller: 'ViewManagerCountyCtrl'
  })
  .when('/manager/state', {
    templateUrl: 'modulesFB/manager/state.html',
    controller: 'ViewManagerStateCtrl'
  })
  .when('/manager/country', {
    templateUrl: 'modulesFB/manager/country.html',
    controller: 'ViewManagerCountryCtrl'
  })
  ;
}])


.controller('ViewManagerCountyCtrl', ['$scope', function($scope) {
  //location starts
  $scope.mapOptions = {
    types: '(cities)'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  //location ends
}])

.controller('ViewManagerStateCtrl', ['$scope', function($scope) {
  
}])

.controller('ViewManagerCountryCtrl', ['$scope', function($scope) {
  
}]);