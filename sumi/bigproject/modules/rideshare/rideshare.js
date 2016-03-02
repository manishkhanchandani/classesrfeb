'use strict';

angular.module('myApp.rideshare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rideshare', {
    templateUrl: 'modules/rideshare/rideshare.html',
    controller: 'ViewrideshareCtr'
  });
}])

.controller('ViewrideshareCtr',['$scope',function($scope) {

}]);