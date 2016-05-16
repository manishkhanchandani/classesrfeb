'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  $scope.ref = new Firebase('https://mkgxy.firebaseio.com/projects/forex2');
  $scope.records = $firebaseArray($scope.ref);
  console.log($scope.records);
  /*var returnRec = {};
  records.$loaded().then(function (arrR) {
    
  });*/
}]);