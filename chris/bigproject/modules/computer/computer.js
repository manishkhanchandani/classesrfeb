'use strict';
// this is a sub module
angular.module('myApp.computer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/computer', {
    templateUrl: 'modules/computer/computer.html',
    controller: 'ViewComputerCtrl'
  }).when('/computer/create', {
    templateUrl: 'modules/computer/create.html',
    controller: 'ViewComputerCreateCtrl'
  }).when('/computer/create/images/:id', {  //need id from page1
    templateUrl: 'modules/computer/images.html',
    controller: 'ViewComputerImagesCtrl'
  });
}])

.controller('ViewComputerCtrl', ['$scope', function($scope) {

}]).controller('ViewComputerCreateCtrl', ['$scope', '$location', function($scope,$location) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
    $scope.submitCreateForm = function() {
        //call api service to submit the form
        console.log('test');
        // redirect, using dummy id for mow
        $location.path('/computer/create/images/1');
    };
}]).controller('ViewComputerImagesCtrl', ['$scope', function($scope) {

}]);