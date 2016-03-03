'use strict';
// this is a sub module
angular.module('myApp.computer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/computer', {
    templateUrl: 'modules/computer/computer.html',
    controller: 'ViewComputerCtrl'
  }).when('/computer/create', {
    templateUrl: 'modules/computer/create.html',
    controller: 'ViewCreateCtrl'
  }).when('/computer/create/images:id', {  //need id from page1
    templateUrl: 'modules/computer/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewComputerCtrl', ['$scope', function($scope) {

}]).controller('ViewCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewImagesCtrl', ['$scope', function($scope) {

}]);