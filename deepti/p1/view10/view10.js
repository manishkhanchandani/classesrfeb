'use strict';

angular.module('myApp.view10', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view10', {
    templateUrl: 'view10/view10.html',
    controller: 'View10Ctrl'
  });
}])

.controller('View10Ctrl', [function() {

}]);