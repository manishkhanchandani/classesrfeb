'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
    .when('/view1a', {
    templateUrl: 'view1/view1a.html',
    controller: 'View1aCtrl'
  });
}])

.controller('View1Ctrl', [function() {

}])
.controller('View1aCtrl', [function() {

}]);
