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

}]).controller('ViewComputerCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewComputerImagesCtrl', ['$scope', function($scope) {

}]);