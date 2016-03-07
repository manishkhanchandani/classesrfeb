'use strict';
// this is a sub module
angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewLessonsCreateCtrl'
  }).when('/lessons/create/images/:id', {  //need id from page1
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewLessonsImagesCtrl'
  });
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {

}])
.controller('ViewLessonsCreateCtrl', ['$scope','$location', function($scope, $location) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
    $scope.submitCreateForm = function() {
        //call api service to submit the form
        console.log('test');
        // redirect, using dummy id for mow
        $location.path('/lessons/create/images/1');
    };
}])
.controller('ViewLessonsImagesCtrl', ['$scope', function($scope) {

}]);