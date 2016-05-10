'use strict';

angular.module('myApp.food', ['ngRoute', 'angularFileUpload', 'youtube-embed', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/food', {
    templateUrl: 'modulesFB/food/food.html',
    controller: 'ViewFoodCtrlFB'
  })
  ;
}])

.controller('ViewFoodCtrlFB', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {
  var obj = dataService.foodSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  console.log($scope);
}])


;