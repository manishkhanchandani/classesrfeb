'use strict';

angular.module('myApp.creative', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/creative', {
    templateUrl: 'modules/creative/creative.html',
    controller: 'ViewCreativeCtrl'
  })
  .when('/creative/create', {
    templateUrl: 'modules/creative/create.html',
    controller: 'ViewCreateCtrl'
  })
  .when('/creative/create/images/:id', {
    templateUrl: 'modules/creative/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewCreativeCtrl', ['$scope',function($scope) {

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