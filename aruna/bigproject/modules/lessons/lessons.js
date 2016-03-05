'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  })
    .when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateCtrl'
  })
    .when('/lessons/create/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesCtrl'
  })
;
}])

.controller('ViewLessonsCtrl', ['$scope',function($scope) {

}])

.controller('ViewCreateCtrl', ['$scope', function($scope) {
   //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
}])

.controller('ViewImagesCtrl', ['$scope', function($scope) {
  
}])

;