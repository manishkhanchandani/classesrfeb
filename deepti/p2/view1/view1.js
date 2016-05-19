'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  
  .when('/register', {
    templateUrl: 'view1/register.html',
    controller: 'ViewRegisterCtrl'
  })
    
    .when('/login',{
     templateUrl: 'view1/login.html',
    controller: 'ViewloginCtrl'
        
    });
}])


.controller('View1Ctrl', ['$scope', function($scope) {

}])
.controller('ViewRegisterCtrl', ['$scope', function($scope) {
    $scope.errorMessage=null;
    $scope.frm={};

    $scope.createNewuser = function() {
        console.log($scope.frm);
       if (!$scope.frm.email){
           $scope.errorMessage='please fill the email';
           return;
       }
        
        if (!$scope.frm.password){
           $scope.errorMessage='please fill the password';
           return;
       }
        if (!$scope.frm.cpassword){
           $scope.errorMessage='please confirm the password';
           return;
       }
        if ($scope.frm.password!==$scope.frm.cpassword){
            $scope.errorMessage='Passwords do not match';
            return;
        }
        $scope.errorMessage=null;
        
     var ref = new Firebase("https://amber-torch-2130.firebaseio.com");
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

.controller('ViewloginCtrl', ['$scope', function($scope) {
     $scope.errorMessage=null;
    $scope.frm={};

    $scope.login = function() {
        console.log($scope.frm);
       if (!$scope.frm.email){
           $scope.errorMessage='please fill the email';
           return;
       }
        
        if (!$scope.frm.password){
           $scope.errorMessage='please fill the password';
           return;
       }
        
 $scope.errorMessage=null;
        
 var ref = new Firebase("https://amber-torch-2130.firebaseio.com");
        
ref.authWithPassword({
  email    : $scope.frm.email,
  password : $scope.frm.password}, 
 function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
       $scope.errorMessage = "Login failed "+error;
        if(!$scope.$$phase) $scope.$apply();
  } else {
    console.log("Authenticated successfully with payload:", authData);
       $scope.frm = {};
        $scope.errorMessage = "Successfully authenticated";
        if(!$scope.$$phase) $scope.$apply();
  }
});
    };
        
    }])