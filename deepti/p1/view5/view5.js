'use strict';

angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view5', {
    templateUrl: 'view5/view5.html',
    controller: 'View5Ctrl'
  })
    
    .when('/view5a', {
    templateUrl: 'view5/view5a.html',
    controller: 'View5aCtrl'
  });
}])

.controller('View5Ctrl', [function() {

}])
.controller('View5aCtrl', [function() {

}]);