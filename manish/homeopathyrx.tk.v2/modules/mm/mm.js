'use strict';

angular.module('myApp.mm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mm/:remedy', {
    templateUrl: 'modules/mm/mm.html',
    controller: 'MMCtrl'
  });
}])

.controller('MMCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  //$scope.templateUrl = 'modules/learn/files/' + $routeParams.topic + '.html';
  console.log($routeParams);
  $scope.remedy = $routeParams.remedy;
}]);