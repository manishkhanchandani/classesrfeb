'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/rx', {
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
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('ViewRxCtrl', ['$scope', '$firebaseArray', '$routeParams', '$location', function($scope, $firebaseArray, $routeParams, $location) {
  $scope.ref = new Firebase('https://mkgxy.firebaseio.com/projects/homeopathy');
  $scope.frm = {};
  
  $scope.getCurrentDiseases = function(results) {
    if (!$routeParams.disease_id) {
      return;
    }
    var details = {};
    angular.forEach(results[$routeParams.disease_id].details, function(value, key) {
      if (!value) {
        return;
      }
      details[key] = value;
    });
    $scope.frm.disease = results[$routeParams.disease_id];
    $scope.frm.disease.details = details;
    
    if ($routeParams.rid) {
      $scope.frm.tongue = $scope.frm.disease.details[$routeParams.rid];
    }
  };
  
  var diseases = localStorage.getItem('diseases');
  if (!diseases) {
    diseases = {};
    $scope.results = $firebaseArray($scope.ref.child('diseases'));
    $scope.results.$loaded().then(function (arrR) {
      angular.forEach(arrR, function(value, key) {
        diseases[value.$id] = value;
      });
      $scope.getCurrentDiseases(diseases);
      $scope.results = diseases;
      localStorage.setItem('diseases', JSON.stringify(diseases));
    });
  } else {
    diseases = JSON.parse(diseases);
    $scope.getCurrentDiseases(diseases);
    $scope.results = diseases;
  }
  
  
  $scope.updateDisease = function() {
    if (!$scope.frm.disease) return;
    $location.path('/rx/did_'+$scope.frm.disease.disease_id);
  };
  
  $scope.updateRemedy = function() {
    if (!$scope.frm.disease) return;
    if (!$scope.frm.tongue) return;
    $location.path('/rx/did_'+$scope.frm.disease.disease_id+'/rid_'+$scope.frm.tongue.id);
  };
}])
;