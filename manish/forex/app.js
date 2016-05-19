'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'ngAutocomplete',
  'firebase'
  //'ui.bootstrap'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])


.filter('arrayAsObject', function() {
  return function(items) {
    var filtered = {};
    angular.forEach(items, function(item, key) {
      filtered[key + '_key'] = {strategy: key, total: item};
    });
    return filtered;
  };
})

.controller('mainController', ['$scope', function($scope) {
  
}])
