'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  })
    .when('/view4a', {
    templateUrl: 'view4/view4a.html',
    controller: 'View4aCtrl'
  });
}])

.controller('View4Ctrl', [function() {

}])
.controller('View4aCtrl', [function() {

}]);