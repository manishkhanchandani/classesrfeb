'use strict';

angular.module('myApp.automotive', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/automotive', {
            templateUrl: 'modules/automotive/automotive.html',
            controller: 'ViewAutomotiveCtrl'
        });
    }])

    .controller('ViewAutomotiveCtrl', ['$scope', function($scope) {

    }]);