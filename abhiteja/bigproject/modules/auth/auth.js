'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/auth/create', {
            templateUrl: 'modules/auth/auth.html',
            controller: 'AuthCreateCtrl'
        })
        .when('/auth/login', {
            templateUrl: 'modules/auth/login.html',
            controller: 'AuthLoginCtrl'
        })
        .when('/auth/logout', {
            templateUrl: 'modules/auth/logout.html',
            controller: 'AuthLogoutCtrl'
        });
        
    }])

    .controller('AuthLoginCtrl', ['$scope','dataService', function($scope, dataService) {
            
            //$scope.loginUserError = null;
            //$scope.frmLogin = {};
            $scope.loginUser = function(){
                if($scope.frmLogin.password === null){ return; }
            
            console.log($scope.frmLogin);
            
            var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1';
            var postData = 'username='+encodeURIComponent($scope.frmLogin.email)+'&password='+encodeURIComponent($scope.frmLogin.password);
            
            function loginUserSuccess(response){
               console.log('success results: ', response);
               if(response.data.error === 1){
                   $scope.loginUserError = response.data.errorMessage;
                   return;
               }
               $scope.$parent.loggedInUserData = response.data.data;
               //setting data in localStorage
               localStorage.setItem('userProfile',JSON.stringify($scope.$parent.loggedInUserData));
               $scope.loginUserError = "You have Successfully Logged in to Website";
               $scope.frmLogin = {};
            }
            function loginUserFailure(response){
               console.log('failure results: ', response);
               $scope.loginUserError = "Failed to Login user. Please Try again";
            }

            dataService.post(url, postData, loginUserSuccess, loginUserFailure);
            
            
                /*
                 //var ref = new Firebase("https://boiling-heat-3323.firebaseio.com");
                 ref.authWithPassword({
                  email    : $scope.frmLogin.email,
                  password : $scope.frmLogin.password
                }, function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                    $scope.loginError = "Login Failed!" + error;
                  } else {
                    console.log("Authenticated successfully with payload:", authData.uid);
                    $scope.loginError = "Authenticated successfully with payload:" + authData.uid;
                    $scope.frmLogin = {};
                  }
                  if(!$scope.$$phase) $scope.$apply();
                });*/
        };
       $scope.loginUserError = null;
   }])

    .controller('AuthCreateCtrl', ['$scope','dataService', function($scope, dataService) {
            
       $scope.createNewUser = function(){
           if($scope.frm.confirm_password !==$scope.frm.password){
               $scope.createUserError = "Password doesn't match with corrent password. \n\
                                           Please try again!!!";
               
               return;
           }
           console.log($scope.frm);
          
           //calling backend API with url and post data
           var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1';
           var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+
                            '&username='+encodeURIComponent($scope.frm.username)+
                            '&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+
                            '&user_details[age]='+encodeURIComponent($scope.frm.age);
           
           function createUserSuccess(response){
               console.log('success results: ', response);
               if(response.data.error === 1){
                   $scope.createUserError = response.data.errorMessage;
                   return;
               }
               $scope.createUserError = "New User Created Successfully";
               $scope.frm = {};
           }
           function createUserFailure(response){
               console.log('failure results: ', response);
               $scope.createUserError = "Failed to create user. Please Try again";
           }
           dataService.post(url, postData, createUserSuccess, createUserFailure);
           
           /*
           var ref = new Firebase("https://boiling-heat-3323.firebaseio.com");
           ref.createUser({
                email    : $scope.frm.email,
                password : $scope.frm.password
                   }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                    $scope.createUserError = "Error creating user: " + error;
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    $scope.createUserError = "Successfully created user account with uid:" + userData.uid;
                    $scope.frm = {};
                    //save it in my database
                }
                if(!$scope.$$phase) $scope.$apply();
            }); */
       };
       
       $scope.createUserError = null;
            
}])

      .controller('AuthLogoutCtrl', ['$scope','dataService', function($scope, dataService) {
              
        $scope.logoutstatus = null;
        
            
        function logoutSuccess(response){
            if(response.data.error === 1){
                   $scope.logoutstatus = response.data.errorMessage;
                   return;
               }
               
               localStorage.removeItem('userProfile');
               $scope.$parent.loggedInUserData = null;
               $scope.logoutstatus = 'You successfully logged out from the website';
        }
        
        function logoutFailure(response){
            $scope.logoutstatus = "There was some server problem";
        }
        
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=logout&saveIP=1&uid='+$scope.$parent.loggedInUserData.uid; 
        
        dataService.get(url, logoutSuccess, logoutFailure, false);    
   }]);