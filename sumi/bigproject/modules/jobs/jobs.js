'use strict';

angular.module('myApp.jobs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobs', {
    templateUrl: 'modules/jobs/jobs.html',
    controller: 'ViewJobsCtrl'
  })
    .when('/jobs/create', {
    templateUrl: 'modules/jobs/create.html',
    controller: 'ViewJobsCreateCtrl'
  })
    .when('/jobs/create/images/:id', {
    templateUrl: 'modules/jobs/images.html',
    controller: 'ViewJobsImagesCtrl'
  })
        
        ;
}])

.controller('ViewJobsCtrl',['$scope',function($scope) {
       
}])
.controller('ViewJobsCreateCtrl',['$scope','$location',function($scope,$location) {
        //location starts
       $scope.mapOptions = {
         types: 'geocode'
       };

       $scope.details = {};
       //location ends
        $scope.submitCreateForm=function(){
           //call to api
           
           $location.path('/jobs/create/images/1');
       };
}])
.controller('ViewJobsImagesCtrl',['$scope',function($scope) {
       
}])

;