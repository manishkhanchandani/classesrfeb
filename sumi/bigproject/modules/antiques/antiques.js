'use strict';

angular.module('myApp.antiques', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/antiques', {
    templateUrl: 'modules/antiques/antiques.html',
    controller: 'ViewAntiquesCtrl'
  })
    .when('/antiques/create', {
    templateUrl: 'modules/antiques/create.html',
    controller: 'ViewAntiquesCreateCtrl'
  })
    .when('/antiques/create/images/:id', {
    templateUrl: 'modules/antiques/images.html',
    controller: 'ViewAntiquesImagesCtrl'
  })
        
        ;
}])

.controller('ViewAntiquesCtrl',['$scope',function($scope) {
       
}])
.controller('ViewAntiquesCreateCtrl',['$scope','$location',function($scope,$location) {
        //location starts
       $scope.mapOptions = {
         types: 'geocode'
       };

       $scope.details = {};
       //location ends
        $scope.submitCreateForm=function(){
           //call to api
           
           $location.path('/antiques/create/images/1');
       };
}])
.controller('ViewAntiquesImagesCtrl',['$scope',function($scope) {
       
}])

;