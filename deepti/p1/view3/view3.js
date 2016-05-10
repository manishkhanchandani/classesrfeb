'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  })
    .when('/view3a', {
    templateUrl: 'view3/view3a.html',
    controller: 'View3aCtrl'
  });
}])

.controller('View3Ctrl', ['$scope','$http',function($scope,$http) {
    
     function success(response){
    console.log('success',response);
        $scope.mydata=response.data;
        
    
}

function failure(response){
    console.log('failure',response);
}
    
    $http({
        url:'json/templates.json',
        method:'GET'
    }).then (success,failure);
    

}])
.controller('View3aCtrl', [function() {

}]);