'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateLessonsCtrl'
  }).when('/lessons/create/:id', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateLessonsCtrl'
  }).when('/lessons/create/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesLessonsCtrl'
  }).when('/lessons/create/imageurls/:id', {
    templateUrl: 'modules/lessons/imageurls.html',
    controller: 'ViewImagesUrlsLessonsCtrl'
  }).when('/lessons/create/youtube/:id', {
    templateUrl: 'modules/lessons/youtube.html',
    controller: 'ViewYoutubeLessonsCtrl'
  }).when('/lessons/create/links/:id', {
    templateUrl: 'modules/lessons/links.html',
    controller: 'ViewLinksLessonsCtrl'
  }).when('/lessons/my', {
    templateUrl: 'modules/lessons/my.html',
    controller: 'ViewMyLessonsCtrl'
  });
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewCreateLessonsCtrl', ['$scope', function($scope) {
    $scope.frm = {};
    
    //location starts
    $scope.mapOptions = {
      types: 'geocode'
    };

    $scope.details = {};
    //location ends
  
    $scope.mainDetails = function() {
       console.log($scope.frm);
    };
}])
.controller('ViewImagesLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewImagesUrlsLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewYoutubeLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewLinksLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewMyLessonsCtrl', ['$scope', function($scope) {
  
}]);