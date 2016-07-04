'use strict';

angular.module('myApp.learn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/learn', {
    templateUrl: 'modules/learn/learn.html',
    controller: 'LearnCtrl'
  }).when('/learn/week1', {
    templateUrl: 'modules/learn/week1.html',
    controller: 'LearnWeek1Ctrl'
  });
}])

.controller('LearnCtrl', [function() {

}])
.controller('LearnWeek1Ctrl', [function() {

}]);