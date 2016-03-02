'use strict';

angular.module('myApp.household', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/household', {
    templateUrl: 'modules/household/household.html',
    controller: 'ViewhouseholdCtr'
  });
}])

.controller('ViewhouseholdCtr',['$scope',function($scope) {

}]);