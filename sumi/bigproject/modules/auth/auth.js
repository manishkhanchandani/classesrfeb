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
  });
}])

.controller('ViewAuthLoginCtrl', ['$scope', function($scope) {
  $scope.loginError = null;
  $scope.loginUser = function() {
    /*ref.authWithPassword({
    email    : $scope.frmLogin.email,
    password : $scope.frmLogin.password
      }, 
        function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              $scope.loginError = "Login Failed!"+ error;
            } else {
              console.log("Authenticated successfully with payload:", authData);
              $scope.loginError = "Authenticated successfully with payload:"+ authData.uid;
               $scope.frmLogin={};
            }            
    if(!$scope.$$phase) $scope.$apply();
    $scope.frmLogin = {};
    });*/
  };
  }])

.controller('ViewAuthCreateCtrl',['$scope','dataService',function($scope,dataService) {
       
        $scope.createUserError= null;   
        
        function createUserSuccess(response) {
            console.log('success results: ', response);
            if (response.data.error === 1) {
              $scope.createUserError = response.data.errorMessage;
             
            }
            $scope.createUserError= "New User Created Successfully";            
        }  
        function createUserFailure(response) {
          console.log('failure results: ', response);
          $scope.createUserError = 'Failed to create user. Please try again';
        }

        $scope.createNewUser = function(){
        
        if($scope.frm.confirm_password !== $scope.frm.password){
            
            $scope.createUserError="Confirm password doesn't match with password. Please check once!";
            return;            
        }        
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1';
        var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+'&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+'&user_details[age]='+encodeURIComponent($scope.frm.age);
        dataService.post(url, postData, createUserSuccess, createUserFailure);
        };
    
     }]);
       /*
        *  var ref = new Firebase("https://vivid-torch-274.firebaseio.com");
        * ref.createUser({
      email    : $scope.frm.email,
      password : $scope.frm.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
            $scope.createUserError="Error creating user:"+ error;
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            $scope.createUserError="Successfully created user account with uid:"+ userData.uid;
            $scope.frm={};
          }
          if(!$scope.$$phase) $scope.$apply();
        });
    
    };*/
