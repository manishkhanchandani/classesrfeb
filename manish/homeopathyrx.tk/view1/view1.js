'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/rx', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })
  .when('/rx/:disease_id/:rid', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })
  .when('/rx/:disease_id', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })
  ;
}])

.controller('View1Ctrl', [function() {

}])


.controller('ViewRxCtrl', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {
  $scope.frm = {};
  
  $scope.results = {};
  $scope.hom = {};
  
  function getSuccess(response) {
    console.log('success: ', response);
    $scope.results = response.data.data.diseases;
    $scope.hom = response.data.data.hom;
  }
  
  function getFailure(response) {
    console.log('failure: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDiseaseAll';
  dataService.get(url, getSuccess, getFailure, true);
  
  
  $scope.queryResults = null;
  
  $scope.updateDisease = function() {
    $scope.queryResults = null;
    $scope.remedyResults = null;
    if (!$scope.frm.disease) return;
    console.log($scope.hom[$scope.frm.disease.disease_id]);
    $scope.queryResults = $scope.hom[$scope.frm.disease.disease_id];
  };
  
  
  $scope.remedyResults = null;
  
  $scope.updateRemedy = function() {
    $scope.remedyResults = null;
    if (!$scope.frm.disease) return;
    if (!$scope.frm.tongue && !$scope.frm.pulse) return;
    $scope.remedyResults = $scope.hom[$scope.frm.disease.disease_id][$scope.frm.tongue.id];
  };
}])


.controller('ViewRxCtrl2', ['$scope', 'dataService', function($scope, dataService) {
  
  $scope.frm = {};
  
  $scope.results = {};
  
  function getSuccess(response) {
    console.log('success: ', response);
    $scope.results = response.data.data;
  }
  
  function getFailure(response) {
    console.log('failure: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=diseases';
  dataService.get(url, getSuccess, getFailure, true);
  
  
  $scope.queryResults = null;
  function queryDiseaseSuccess(response) {
    console.log('success: ', response);
    $scope.queryResults = response.data.data;
  }
  
  function queryDiseaseFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.updateDisease = function() {
    $scope.queryResults = null;
    $scope.remedyResults = null;
    if (!$scope.frm.disease) return;
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDisease&disease_id=' + $scope.frm.disease.disease_id;
    dataService.get(url, queryDiseaseSuccess, queryDiseaseFailure, true);
  };
  
  
  $scope.remedyResults = null;
  function remedySuccess(response) {
    console.log('success: ', response);
    $scope.remedyResults = response.data.data;
  }
  
  function remedyFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.updateRemedy = function() {
    $scope.remedyResults = null;
    if (!$scope.frm.disease) return;
    if (!$scope.frm.tongue && !$scope.frm.pulse) return;
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=findRemedy&disease_id=' + $scope.frm.disease.disease_id;
    if ($scope.frm.tongue) {
      url = url + '&tongue_id=' + $scope.frm.tongue.tongue_id;
      url = url + '&pulse_id=' + $scope.frm.tongue.pulse_id;
    }
    console.log(url);
    dataService.get(url, remedySuccess, remedyFailure, true);
  };
}]);