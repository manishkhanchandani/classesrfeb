'use strict';

angular.module('myApp.learn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/learn', {
    templateUrl: 'modules/learn/learn.html',
    controller: 'LearnCtrl'
  }).when('/learn/:topic', {
    templateUrl: 'modules/learn/main.html',
    controller: 'LearnTopicCtrl'
  });
}])

.controller('LearnCtrl', [function() {

}])
.controller('LearnTopicCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.templateUrl = 'modules/learn/files/' + $routeParams.topic + '.html';
}]);