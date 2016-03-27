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


.controller('ViewRxCtrl', ['$scope', 'dataService', '$routeParams', '$location', function($scope, dataService, $routeParams, $location) {
  $scope.frm = {};
  
  $scope.results = {};
  $scope.hom = {};
  $scope.remedyResults = null;
  $scope.queryResults = null;
  
  function getSuccess(response) {
    //console.log('success: ', response);
    $scope.results = response.data.data.diseases;
    $scope.hom = response.data.data.hom;
    if ($routeParams.disease_id) {
      $scope.queryResults = $scope.hom[$routeParams.disease_id];
      $scope.frm.disease = $scope.results[$routeParams.disease_id];
      if ($routeParams.rid) {
        $scope.remedyResults = $scope.hom[$routeParams.disease_id][$routeParams.rid];
        $scope.frm.tongue = $scope.hom[$routeParams.disease_id][$routeParams.rid];
      }
    }
  }
  
  function getFailure(response) {
    console.log('failure: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDiseaseAll';
  dataService.get(url, getSuccess, getFailure, true);
  
  
  
  $scope.updateDisease = function() {
    //$scope.queryResults = null;
    //$scope.remedyResults = null;
    if (!$scope.frm.disease) return;
    $location.path('/rx/'+$scope.frm.disease.disease_id);
    //$scope.queryResults = $scope.hom[$scope.frm.disease.disease_id];
  };
  
  
  
  $scope.updateRemedy = function() {
    if (!$scope.frm.disease) return;
    if (!$scope.frm.tongue) return;
    $location.path('/rx/'+$scope.frm.disease.disease_id+'/'+$scope.frm.tongue.id);
    //$scope.remedyResults = $scope.hom[$scope.frm.disease.disease_id][$scope.frm.tongue.id];
  };
  
  $scope.profiles = null;
  $scope.showProfiles = function() {
    var profiles = localStorage.getItem('profiles');
    $scope.profiles = JSON.parse(profiles);
  };
  
  $scope.saveFrm = {};
  
  var dt = new Date();
  var day = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  $scope.saveFrm.date = year + '-' + month + '-' + day;
    
  $scope.saveRemedy = function() {
    if (!$scope.saveFrm.name) {
     return; 
    }
    if (!$scope.saveFrm.date) {
     return; 
    }
    
    var dt = new Date();
    var day = dt.getDate();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var seconds = dt.getSeconds();
    var createdDt = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
    var key = btoa($scope.saveFrm.name + createdDt);
    var profile = {
      createdDt: $scope.saveFrm.date,
      formattedDt: dt.toString(),
      name: $scope.saveFrm.name,
      path: '/rx/'+$scope.frm.disease.disease_id+'/'+ $scope.frm.tongue.id,
      disease_id: $scope.frm.disease.disease_id,
      id: $scope.frm.tongue.id,
      remedy: $scope.remedyResults.remedies,
      key: key,
      disease: $scope.frm.disease.disease,
      pulse: $scope.frm.tongue.pulse,
      tongue: $scope.frm.tongue.tongue,
      tcd: $scope.frm.tongue.tcd
    };
    
    var obj = {};
    var profiles = localStorage.getItem('profiles');
    if (!profiles) {
      obj[key] = profile;
      localStorage.setItem('profiles', JSON.stringify(obj));
    } else {
      obj = JSON.parse(profiles);
      if (!obj[key]) {
        obj[key] = profile;
        localStorage.setItem('profiles', JSON.stringify(obj));
      }  
    }
    
    $scope.saveFrm.name = '';
    $scope.showProfiles();
  };
  
  $scope.showProfiles();
  
  $scope.deleteProfile = function(p) {
    var a = confirm('do you really want to delete this profile?');
    if (!a) return false;
    var obj = {};
    var profiles = localStorage.getItem('profiles');
    obj = JSON.parse(profiles);
    delete obj[p.key];
    localStorage.setItem('profiles', JSON.stringify(obj));
    $scope.showProfiles();
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