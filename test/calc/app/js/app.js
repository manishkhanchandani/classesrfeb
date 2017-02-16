var myApp = angular.module('myApp', [])

.controller('CalculatorController', ['$scope', function($scope) {
  $scope.title = 'testing';
  
  $scope.destinations = [];
  
  $scope.newDestination = {
    city: undefined,
    country: undefined
  };
  
  $scope.addDestination = function() {
    $scope.destinations.push(
      {
        city: $scope.newDestination.city,
        country: $scope.newDestination.country
      }
    );  
  };
  
  
  $scope.removeDestination = function(index) {
    $scope.destinations.splice(index, 1);
  };
  
  
}]);