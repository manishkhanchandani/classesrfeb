'use strict';
// this is a sub module
angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  });
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {

}]);