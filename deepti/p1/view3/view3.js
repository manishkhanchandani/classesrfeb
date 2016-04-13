'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  })
    .when('/view3a', {
    templateUrl: 'view3/view3a.html',
    controller: 'View3aCtrl'
  });
}])

.controller('View3Ctrl', [function() {

}])
.controller('View3aCtrl', [function() {

}]);