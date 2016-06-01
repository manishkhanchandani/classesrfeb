'use strict';

angular.module('myApp.doctors', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/doctors/register', {
    templateUrl: 'modules/doctors/doctors.html',
    controller: 'DoctorsRegisterCtrl'
  });
}])

.controller('DoctorsRegisterCtrl', ['$scope', function($scope) {
  console.log($scope);
}]);