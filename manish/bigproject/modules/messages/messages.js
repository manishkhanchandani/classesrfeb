'use strict';

angular.module('myApp.messages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'modules/messages/messages.html',
    controller: 'MessagesCtrl'
  });
  $routeProvider.when('/messages/:uid', {
    templateUrl: 'modules/messages/messages.html',
    controller: 'MessagesCtrl'
  });
}])

.controller('MessagesCtrl', ['$scope', function($scope) {
}]);