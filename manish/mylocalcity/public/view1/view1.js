'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/profile', {
    templateUrl: 'view1/profile.html',
    controller: 'ProfileCtrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View2Ctrl'
  })
  .when('/examples/create', {
    templateUrl: 'view1/examples/create.html',
    controller: 'ExamplesCreate'
  })
  
  ;
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])
.controller('View2Ctrl', ['$scope', function($scope) {

}])
.controller('ProfileCtrl', ['$scope', function($scope) {
  console.log($scope);
}])

.controller('ExamplesCreate', ['$scope', '$location', function($scope, $location) {
  if (!$scope.userData) {
    console.log('user is not logged in so cannot post');
    $location.path('/');
    return;
  }
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };
  
  //initializing
  $scope.frm = {};
  $scope.frm.details = {};
  $scope.createStatus = null;
  
  $scope.submitCreateForm = function() {
    console.log('frm is ', $scope.frm);
  }
  
}])
;