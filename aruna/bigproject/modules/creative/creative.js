'use strict';

angular.module('myApp.creative', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/creative', {
    templateUrl: 'modules/creative/creative.html',
    controller: 'ViewcreativeCtrl'
  });
}])

.controller('ViewcreativeCtrl', ['$scope',function($scope) {

}]);