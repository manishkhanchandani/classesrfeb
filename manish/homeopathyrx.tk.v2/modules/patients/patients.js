'use strict';

angular.module('myApp.patients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'modules/patients/patients.html',
    controller: 'PatientsCtrl'
  }).when('/patients/new', {
    templateUrl: 'modules/patients/new.html',
    controller: 'PatientsNewCtrl'
  });
}])

.controller('PatientsCtrl', ['$scope', function($scope) {

}])

.controller('PatientsNewCtrl', ['$scope', function($scope) {
  $scope.frm = {};
  $scope.create = function()
  {
    console.log($scope.frm);
  };
}])

;