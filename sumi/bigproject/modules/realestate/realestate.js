'use strict';

angular.module('myApp.realestate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/realestate', {
    templateUrl: 'modules/realestate/realestate.html',
    controller: 'ViewRealEstateCtrl'
  })
    .when('/realestate/create', {
    templateUrl: 'modules/realestate/create.html',
    controller: 'ViewRealEstateCreateCtrl'
  })
    .when('/realestate/create/images/:id', {
    templateUrl: 'modules/realestate/images.html',
    controller: 'ViewRealEstateImagesCtrl'
  })
        
        ;
}])

.controller('ViewRealEstateCtrl',['$scope',function($scope) {
       
}])
.controller('ViewRealEstateCreateCtrl',['$scope','$location',function($scope,$location) {
        //location starts
       $scope.mapOptions = {
         types: 'geocode'
       };

       $scope.details = {};
       //location ends
        $scope.submitCreateForm=function(){
           //call to api
           
           $location.path('/realestate/create/images/1');
       };

}])
.controller('ViewRealEstateImagesCtrl',['$scope',function($scope) {
       
}])

;