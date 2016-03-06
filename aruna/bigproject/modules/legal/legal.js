'use strict';

angular.module('myApp.legal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/legal', {
    templateUrl: 'modules/legal/legal.html',
    controller: 'ViewLegalCtrl'
  })
  .when('/legal/create', {
    templateUrl: 'modules/legal/create.html',
    controller: 'ViewLegalCreateCtrl'
  })
  .when('/legal/create/images/:id', {
    templateUrl: 'modules/legal/images.html',
    controller: 'ViewLegalImagesCtrl'
  });
}])

.controller('ViewLegalCtrl', ['$scope',function($scope) {

}])
.controller('ViewLegalCreateCtrl', ['$scope','$location',function($scope,$location) {
 //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
   $scope.submitLegalCreateForm = function() {
     //call api service to submit the form
     console.log('hello');
     $location.path('/legal/create/images/1');
  };

}])
.controller('ViewLegalImagesCtrl', ['$scope',function($scope) {

}]);