'use strict';

angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'modules/auth/auth.html',
    controller: 'ViewauthCtr'
  });
}])

.controller('ViewauthCtr',['$scope',function($scope) {

    var ref = new Firebase("https://vivid-torch-274.firebaseio.com");
    $scope.createNewUser = function() {
  ref.createUser({
      email    : $scope.frm.email,
      password : $scope.frm.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };


    
}]);