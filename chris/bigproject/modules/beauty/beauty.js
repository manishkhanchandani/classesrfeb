'use strict';
// this is a sub module
angular.module('myApp.beauty', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beauty', {
    templateUrl: 'modules/beauty/beauty.html',
    controller: 'ViewBeautyCtrl'
  }).when('/beauty/create', {
    templateUrl: 'modules/beauty/create.html',
    controller: 'ViewCreateCtrl'
  }).when('/beauty/create/images:id', {  //need id from page1
    templateUrl: 'modules/beauty/images.html',
    controller: 'ViewImagesCtrl'
  });
}])

.controller('ViewBeautyCtrl', ['$scope', function($scope) {

}]).controller('ViewCreateCtrl', ['$scope', function($scope) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
}]).controller('ViewImagesCtrl', ['$scope', function($scope) {

}]);