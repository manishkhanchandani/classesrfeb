'use strict';

angular.module('myApp.view11', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view11', {
    templateUrl: 'view11/view11.html',
    controller: 'View11Ctrl'
  });
}])

.controller('View11Ctrl', [function() {

}]);