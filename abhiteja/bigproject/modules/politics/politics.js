'use strict';

angular.module('myApp.politics', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/politics', {
            templateUrl: 'modules/politics/politics.html',
            controller: 'ViewPoliticsCtrl'
        });
    }])

    .controller('ViewPoliticsCtrl', ['$scope', function($scope) {

    }]);