'use strict';

angular.module('myApp.viewmm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add/mm', {
    templateUrl: 'viewmm/add.html',
    controller: 'ViewAddMMCtrl'
  }).when('/mm', {
    templateUrl: 'viewmm/viewmm.html',
    controller: 'ViewMMCtrl'
  }).when('/mm/:remedy/:author', {
    templateUrl: 'viewmm/viewmmdetail.html',
    controller: 'ViewMMDetailCtrl'
  }).when('/mm/:remedy', {
    templateUrl: 'viewmm/viewmmdetail.html',
    controller: 'ViewMMDetailCtrl'
  });
}])

.controller('ViewMMCtrl', ['$scope', function($scope) {
  
}])

.controller('ViewAddMMCtrl', ['$scope', function($scope) {
  
}])

.controller('ViewMMDetailCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
  $scope.error = null;
  if (!$routeParams.remedy) {
    $location.path('/mm');
    return;  
  }
  
  $scope.remedy = $routeParams.remedy;
}]);