'use strict';
// this is a sub module
angular.module('myApp.rideshare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rideshare', {
    templateUrl: 'modules/rideshare/rideshare.html',
    controller: 'ViewRideshareCtrl'
  }).when('/rideshare/create', {
    templateUrl: 'modules/rideshare/create.html',
    controller: 'ViewCreateCtrl'
  }).when('/rideshare/create/images:id', {  //need id from page1
    templateUrl: 'modules/rideshare/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewRideshareCtrl', ['$scope', function($scope) {

}]).controller('ViewCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewImagesCtrl', ['$scope', function($scope) {

}]);