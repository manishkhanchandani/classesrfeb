'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  .when('/addRep/kent/:chapter/:start/:end', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter/:start', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  
  
  .when('/rep/kent/:chapter/:start/:end', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter/:start', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  
  ;
}])


.controller('AddRepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', function($scope, dataService, $filter, $routeParams) {
  console.log('routeparams: ', $routeParams);
  document.body.scrollTop;

  //show chapters
  function successChapter(response) {
    $scope.chapters = response.data.data;
    if ($routeParams.chapter) {
      angular.forEach($scope.chapters, function(value) {
        if ($scope.chapter) return;
        if (parseInt($routeParams.chapter) === parseInt(value.id)) {
          $scope.chapter = value.chapter;  
        }
      });
    }
  }
  
  dataService.getChapters(successChapter, function(r) {console.log('err: ', r);});
  //show chapters ends
  
  //show symptoms & pagination
  
  //update symptom
}])


.controller('RepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', '$location', function($scope, dataService, $filter, $routeParams, $location) {
  console.log('routeparams: ', $routeParams);
  
  //show chapters
  
  //show repertory & pagination & localstorage
  
  //add symptom to repertory
  
  //show symptom from repertory
}])
;

