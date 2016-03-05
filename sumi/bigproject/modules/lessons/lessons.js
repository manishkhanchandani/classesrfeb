'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewlessonsCtrl'
  });
}])

.controller('ViewlessonsCtrl',['$scope',function($scope) {
       
}]);