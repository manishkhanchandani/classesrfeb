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
        });
        
    }])

    .controller('AuthLoginCtrl', ['$scope', function($scope) {
            var ref = new Firebase("https://boiling-heat-3323.firebaseio.com");
            $scope.loginUserError = null;
            $scope.frmLogin = {};
            $scope.loginUser = function(){
                if($scope.frmLogin.password === null){ return; }
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
                });
       };
   }])

    .controller('AuthCreateCtrl', ['$scope','dataService', function($scope, dataService) {
            var ref = new Firebase("https://boiling-heat-3323.firebaseio.com");
       $scope.createNewUser = function(){
           if($scope.frm.confirm_password !==$scope.frm.password){
               $scope.createUserError = "Password doesn't match with corrent password. \n\
                                           Please try again!!!";
               
               return;
           }
           console.log($scope.frm);
          
           //calling backend API with url and post data
           var url = 'http://bootstrap.mkgalax.com/svnprojects/horo/login.php?action=register&saveIP=1';
           var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+'\n\
                            &uid=3210&username='+encodeURIComponent($scope.frm.username)+
                            '&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+
                            '&user_details[age]='+encodeURIComponent($scope.frm.age);
           
           function createUserSuccess(response){
               console.log('success results: ', response);
           }
           function createUserFailure(response){
               console.log('failure results: ', response);
           }
           dataService.post(url, postData, createUserSuccess, createUserFailure);
           
           return;
           
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
            }); 
       };
       
       $scope.createUserError = null;
            
}]);