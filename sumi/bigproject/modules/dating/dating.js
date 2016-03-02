'use strict';

angular.module('myApp.dating', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dating', {
    templateUrl: 'modules/dating/dating.html',
    controller: 'ViewdatingCtr'
  });
}])

.controller('ViewdatingCtr',['$scope',function($scope) {

}]);