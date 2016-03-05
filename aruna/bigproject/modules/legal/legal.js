'use strict';

angular.module('myApp.legal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/legal', {
    templateUrl: 'modules/legal/legal.html',
    controller: 'ViewLegalCtrl'
  })
  .when('/legal/create', {
    templateUrl: 'modules/legal/create.html',
    controller: 'ViewCreateCtrl'
  })
  .when('/legal/create/images/:id', {
    templateUrl: 'modules/legal/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewLegalCtrl', ['$scope',function($scope) {

}])
.controller('ViewCreateCtrl', ['$scope',function($scope) {
 //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends

}])
.controller('ViewImagesCtrl', ['$scope',function($scope) {

}]);