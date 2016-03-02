'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', 
            [
                'ngRoute', 
                'myApp.lessons',
                'myApp.therapeutic',
                'myApp.automotive',
                'myApp.matrimony',
                'myApp.politics',
                'myApp.auth'])

       .config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/lessons'});
}])

.controller('mainController', ['$scope', function($scope) {
    $scope.loggedInUserData = null;
}]);
