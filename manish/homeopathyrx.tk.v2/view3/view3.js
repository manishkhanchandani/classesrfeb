'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  .when('/addRep/kent/:chapter/:start/:end', {
    templateUrl: 'view2/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter/:start', {
    templateUrl: 'view2/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter', {
    templateUrl: 'view2/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent', {
    templateUrl: 'view2/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  
  
  .when('/rep/kent/:chapter/:start/:end', {
    templateUrl: 'view2/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter/:start', {
    templateUrl: 'view2/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter', {
    templateUrl: 'view2/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent', {
    templateUrl: 'view2/view3.html',
    controller: 'RepKentCtrl'
  })
  
  ;
}])


.controller('AddRepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', function($scope, dataService, $filter, $routeParams) {
  console.log('routeparams: ', $routeParams);

}])


.controller('RepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', '$location', function($scope, dataService, $filter, $routeParams, $location) {
  console.log('routeparams: ', $routeParams);
}])
;

