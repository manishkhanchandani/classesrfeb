'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase('https://mycontacts12.firebaseio.com/projects/homeopathyrx/mainTracking');
  
  $scope.trackingUser = {};
  ref.child('trackingUser').on('value', function (snapshot) {
    var trackingUser = {};
    angular.forEach(snapshot.val(), function(value, key) {
      trackingUser[value.location.ip] = value.location;
    });
    $scope.trackingUser = trackingUser;
  });
  //$scope.trackingUser = $firebaseArray(ref.child('trackingUser'));
  
  var dt = new Date();
  var day = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  var current = year + '-' + month + '-' + day;
  
  $scope.tracking = $firebaseArray(ref.child('tracking').child(current));
  
}]);