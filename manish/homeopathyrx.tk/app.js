'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'ngAutocomplete'
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/rx'});
}])

.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})

.controller('mainController', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {
  
  
	$scope.ref = new Firebase('https://mycontacts12.firebaseio.com/projects/homeopathyrx');
  //location start
  $scope.location = null;
  function ipSuccess(response) {
    $scope.location = response.data.data.result;
    //dataService.tracking($scope.ref, $scope.location);
  }
  
  function ipFailure(response) {
    console.log('ipfailed: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/ip.php';
  dataService.get(url, ipSuccess, ipFailure, true);
  //location ends
  
  
}])
