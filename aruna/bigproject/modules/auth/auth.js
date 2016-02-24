'use strict';

angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/create', {
    templateUrl: 'modules/auth/auth.html',
    controller: 'ViewAuthCreateCtrl'
  })
  .when('/auth/login', {
    templateUrl: 'modules/auth/login.html',
    controller: 'ViewAuthLoginCtrl'
  })
        ;
}])

.controller('ViewAuthLoginCtrl', ['$scope', function($scope) {
  var ref = new Firebase("https://glowing-inferno-3312.firebaseio.com");
  $scope.loginError = null;
  
  $scope.frmLogin = {};
  
  $scope.loginUser = function() {
    $scope.loginUser = function() {
    ref.authWithPassword({
      email    : $scope.frmLogin.email,
      password : $scope.frmLogin.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };

  };
  
}])


.controller('ViewAuthCreateCtrl', ['$scope',function($scope) {
 var ref = new Firebase("https://glowing-inferno-3312.firebaseio.com");
 $scope.createUserError = null;
      $scope.createNewUser = function() {
          
          if ($scope.frm.confirm_password !== $scope.frm.password) {
       $scope.createUserError = 'Password does not match with confirm password. Please check again!';
       return;
    }


   ref.createUser({
      email    : $scope.frm.email,
      password : $scope.frm.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        $scope.createUserError = "Error creating user:" + error;

      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.createUserError = "Successfully created user account with uid:" + userData.uid;
        $scope.frm={}; 
      }
      //to update the scope in html page
if(!$scope.$$phase) $scope.$apply();


    });
  };



}]);