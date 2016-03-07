'use strict';
// this is a sub module
angular.module('myApp.beauty', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beauty', {
    templateUrl: 'modules/beauty/beauty.html',
    controller: 'ViewBeautyCtrl'
  }).when('/beauty/create', {
    templateUrl: 'modules/beauty/create.html',
    controller: 'ViewBeautyCreateCtrl'
  }).when('/beauty/create/images/:id', {  //need id from page1
    templateUrl: 'modules/beauty/images.html',
    controller: 'ViewBeautyImagesCtrl'
  });
}])

.controller('ViewBeautyCtrl', ['$scope', function($scope) {

}]).controller('ViewBeautyCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewBeautyImagesCtrl', ['$scope', function($scope) {

}]);