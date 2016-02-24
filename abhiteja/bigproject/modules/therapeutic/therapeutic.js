'use strict';

angular.module('myApp.therapeutic', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/therapeutic', {
            templateUrl: 'modules/therapeutic/therapeutic.html',
            controller: 'ViewTherapeuticCtrl'
        });
    }])

    .controller('ViewTherapeuticCtrl', ['$scope', function($scope) {

    }]);