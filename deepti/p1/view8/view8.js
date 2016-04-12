'use strict';

angular.module('myApp.view8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view8', {
    templateUrl: 'view8/view8.html',
    controller: 'View8Ctrl'
  });
}])

.controller('View8Ctrl', [function() {

}]);