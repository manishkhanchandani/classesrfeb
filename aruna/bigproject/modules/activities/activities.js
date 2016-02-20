'use strict';

angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewactivitiesCtrl'
  });
}])

.controller('ViewactivitiesCtrl', ['$scope',function($scope) {

}]);