'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

  $scope.profile = {};
  
  $scope.mapOptions = {
      types: '(cities)'
    };

  $scope.details = {};

  //form submission
  $scope.profileSubmit = function() {
    console.log($scope.profile);
  };
}]);