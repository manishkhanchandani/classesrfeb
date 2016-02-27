'use strict';

angular.module('myApp.matrimony', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/matrimony', {
            templateUrl: 'modules/matrimony/matrimony.html',
            controller: 'ViewMatrimonyCtrl'
        });
    }])

    .controller('ViewMatrimonyCtrl', ['$scope', function($scope) {

    }]);