'use strict';

angular.module('myApp.view.personalized-health.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:country/:language/healthprint/:questionPage', {
    templateUrl: 'view/personalized-health/questions/questions.html',
    controller: 'ViewPersonalizedHealthQuestionsCtrl'
  }).when('/:country/:language/healthprint', {
    templateUrl: 'view/personalized-health/questions/questions.html',
    controller: 'ViewPersonalizedHealthQuestionsCtrl'
  }).when('/healthprint/:questionPage', {
    templateUrl: 'view/personalized-health/questions/questions.html',
    controller: 'ViewPersonalizedHealthQuestionsCtrl'
  }).when('/healthprint', {
    templateUrl: 'view/personalized-health/questions/questions.html',
    controller: 'ViewPersonalizedHealthQuestionsCtrl'
  });
}])

.controller('ViewPersonalizedHealthQuestionsCtrl', ['$scope', '$routeParams', '$log', function($scope, $routeParams, $log) {
  
  $scope.checkLanguage($routeParams);
  var questionPage = $routeParams.questionPage || 0;
  $scope.questionPage = parseInt(questionPage);
}])

;