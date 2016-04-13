'use strict';

angular.module('myApp.manager', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/manager/county', {
    templateUrl: 'modulesFB/manager/county.html',
    controller: 'ViewManagerCountyCtrl'
  })
  ;
}])


.controller('ViewManagerCountyCtrl', ['$scope', function($scope) {
  if (!$scope.userData) {
   $location.path('/');
   return; 
  }
  if (!$scope.userData.uid) {
   $location.path('/');
   return; 
  }
  
  //location starts
  $scope.mapOptions = {
    types: '(cities)'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  $scope.frm.details.components = {};
  $scope.frm.status = null;
  //location ends
  
  $scope.addCountyManager = function() {
    //check if county is empty else give error
    if (!$scope.frm.details.components.county) {
      $scope.frm.status = 'Invalid County, please choose city';
      return; 
    }
    //check if county is already taken by someone
    
    //add county in pending list
    $scope.ref.child('manager').child('countyPending').child(btoa($scope.frm.details.components.country)).child(btoa($scope.frm.details.components.state)).child(btoa($scope.frm.details.components.county)).once("value", function(snapshot) {
        var a = snapshot.exists();
        console.log(snapshot.val());
        if (a) {
          return;
        }
        
        var data = {};
        data.location = $scope.frm.details.components;
        data.county = {};
        data.county.country = $scope.frm.details.components.country;
        data.county.state = $scope.frm.details.components.state;
        data.county.county = $scope.frm.details.components.county;
        data.name = $scope.userData.displayName;
        data.email = $scope.userData.email;
        data.uid = $scope.userData.uid;
        console.log(data);
        $scope.ref.child('manager').child('countyPending').child(btoa($scope.frm.details.components.country)).child(btoa($scope.frm.details.components.state)).child(btoa($scope.frm.details.components.county)).set(data);
      });
  };
}])
;