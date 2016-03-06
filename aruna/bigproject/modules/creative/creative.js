'use strict';

angular.module('myApp.creative', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/creative', {
    templateUrl: 'modules/creative/creative.html',
    controller: 'ViewCreativeCtrl'
  })
  .when('/creative/create', {
    templateUrl: 'modules/creative/create.html',
    controller: 'ViewCreativeCreateCtrl'
  })
  .when('/creative/create/images/:id', {
    templateUrl: 'modules/creative/images.html',
    controller: 'ViewCreativeImagesCtrl'
  });
}])

.controller('ViewCreativeCtrl', ['$scope',function($scope) {

}])

 .controller('ViewCreativeCreateCtrl', ['$scope','$location', function($scope,$location) {
   //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
   $scope.submitCreativeCreateForm = function() {
     //call api service to submit the form
     console.log('hi');
     $location.path('/creative/create/images/1');
     
  };
}])

.controller('ViewCreativeImagesCtrl', ['$scope', function($scope) {
  
}])
;