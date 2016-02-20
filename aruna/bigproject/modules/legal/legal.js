'use strict';

angular.module('myApp.legal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/legal', {
    templateUrl: 'modules/legal/legal.html',
    controller: 'ViewlegalCtrl'
  });
}])

.controller('ViewlegalCtrl', ['$scope',function($scope) {

}]);