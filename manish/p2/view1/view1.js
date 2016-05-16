'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/login', {
    templateUrl: 'view1/login.html',
    controller: 'ViewLoginCtrl'
  })
  .when('/register', {
    templateUrl: 'view1/register.html',
    controller: 'ViewRegisterCtrl'
  })
  ;
}])

.controller('View1Ctrl', [function() {

}])

.controller('ViewRegisterCtrl', ['$scope', function($scope) {
  
  $scope.errorMessage = null;
  $scope.frm = {};

  $scope.createNewUser = function() {
    //validate the form fields
    if (!$scope.frm.email) {
      $scope.errorMessage = 'Please fill the email';
      return;
    }
    
    if (!$scope.frm.password) {
      $scope.errorMessage = 'Please fill the password';
      return;
    }
    
    if (!$scope.frm.cpassword) {
      $scope.errorMessage = 'Please fill the confirm password';
      return;
    }
    
    if ($scope.frm.password !== $scope.frm.cpassword) {
      $scope.errorMessage = 'Password and confirm password are not matching';
      return;
    }
    
    $scope.errorMessage = null;
    
    var ref = new Firebase("https://mkgxy.firebaseio.com");
    ref.createUser({
      email    : $scope.frm.email,
      password : $scope.frm.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.frm = {};
        $scope.errorMessage = "Successfully created user account with uid:" + userData.uid;
        if(!$scope.$$phase) $scope.$apply();
      }
    });

  };

}])
;