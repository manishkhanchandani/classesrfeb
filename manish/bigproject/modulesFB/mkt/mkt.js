'use strict';

angular.module('myApp.mkt', ['ngRoute', 'angularFileUpload', 'youtube-embed', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mkt', {
    templateUrl: 'modulesFB/mkt/mkt.html',
    controller: 'ViewMktCtrlFB'
  })
  ;
}])

.controller('ViewMktCtrlFB', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {
  var obj = dataService.mktSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  console.log($scope);
}])


;