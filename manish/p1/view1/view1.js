'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/view1a', {
    templateUrl: 'view1/view1a.html',
    controller: 'View1aCtrl'
  })
  
  ;
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.myData = null;
    
    function success(response) {
        console.log('success', response);
        $scope.myData = response.data.result;
        
    }
    
    function failure(response) {
        console.log('failure', response);
    }
    
    $http({
        url: 'json/1.json',
        method: 'GET'
    }).then(success, failure);
}])


.controller('View1aCtrl', [function() {

}])

;