'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])
.controller('View2Ctrl', ['$scope', function($scope) {

}]);