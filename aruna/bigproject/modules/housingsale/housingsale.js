'use strict';

angular.module('myApp.housingsale', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/housingsale', {
    templateUrl: 'modules/housingsale/housingsale.html',
    controller: 'ViewHousingsaleCtrl'
  })
  .when('/housingsale/create', {
    templateUrl: 'modules/housingsale/create.html',
    controller: 'ViewHousingsaleCreateCtrl'
  })
  .when('/housingsale/create/images/:id', {
    templateUrl: 'modules/housingsale/images.html',
    controller: 'ViewHousingsaleImagesCtrl'
  });
}])

.controller('ViewHousingsaleCtrl', ['$scope',function($scope) {

}])
.controller('ViewHousingsaleCreateCtrl', ['$scope','$location',function($scope,$location) {
 //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
   $scope.submitHousingsaleCreateForm = function() {
     //call api service to submit the form
     console.log('hai');
     $location.path('/housingsale/create/images/1');
  };

}])
.controller('ViewHousingsaleImagesCtrl', ['$scope',function($scope) {

}]);