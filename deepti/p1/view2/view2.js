'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  })
    
    .when('/view2a', {
    templateUrl: 'view2/view2a.html',
    controller: 'View2aCtrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http',function($scope,$http) {

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

.controller('View2aCtrl', [function() {

}]);