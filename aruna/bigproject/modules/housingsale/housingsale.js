'use strict';

angular.module('myApp.housingsale', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/housingsale', {
    templateUrl: 'modules/housingsale/housingsale.html',
    controller: 'ViewhousingsaleCtrl'
  });
}])

.controller('ViewhousingsaleCtrl', ['$scope',function($scope) {

}]);