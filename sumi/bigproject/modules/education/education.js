'use strict';

angular.module('myApp.education', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/education', {
    templateUrl: 'modules/education/education.html',
    controller: 'ViewEducationCtrl'
  })
    .when('/education/create', {
    templateUrl: 'modules/education/create.html',
    controller: 'ViewEducationCreateCtrl'
  })
    .when('/education/create/images/:id', {
    templateUrl: 'modules/education/images.html',
    controller: 'ViewEducationImagesCtrl'
  })
        
        ;
}])

.controller('ViewEducationCtrl',['$scope',function($scope) {
       
}])
.controller('ViewEducationCreateCtrl',['$scope','$location',function($scope,$location) {
        //location starts
       $scope.mapOptions = {
         types: 'geocode'
       };

       $scope.details = {};
       //location ends
        $scope.submitCreateForm=function(){
           //call to api
           
           $location.path('/education/create/images/1');
       };
}])
.controller('ViewEducationImagesCtrl',['$scope',function($scope) {
       
}])

;