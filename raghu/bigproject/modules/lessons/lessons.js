'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	
	.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  })
	.when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateCtrl'
  })
	.when('/lessons/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesCtrl'
  })
	;
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
	
}])
.controller('ViewCreateCtrl', ['$scope', function($scope) {
	$scope.mapOptions = {
		types: 'geocode'
	};
	
	$scope.details = {};
		
}])
.controller('ViewImagesCtrl', ['$scope', function($scope) {
	
}])
;