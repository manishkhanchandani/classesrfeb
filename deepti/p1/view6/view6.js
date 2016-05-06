'use strict';

angular.module('myApp.view6', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view6', {
    templateUrl: 'view6/view6.html',
    controller: 'View6Ctrl'
  })
    
    .when('/view6a', {
    templateUrl: 'view6/view6a.html',
    controller: 'View6aCtrl'
  });
    
}])

.controller('View6Ctrl', [function() {

}])
.controller('View6aCtrl', [function() {

}]);