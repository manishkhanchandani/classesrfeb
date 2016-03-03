'use strict';

angular.module('myApp.housingsale', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/housingsale', {
    templateUrl: 'modules/housingsale/housingsale.html',
    controller: 'ViewHousingsaleCtrl'
  })
  .when('/housingsale/create', {
    templateUrl: 'modules/housingsale/create.html',
    controller: 'ViewCreateCtrl'
  })
  .when('/housingsale/create/images/:id', {
    templateUrl: 'modules/housingsale/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewHousingsaleCtrl', ['$scope',function($scope) {

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