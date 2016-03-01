'use strict';
// this is a sub module
angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/create', {
    templateUrl: 'modules/auth/auth.html',
    controller: 'ViewAuthCtrl'
  })
  .when('/auth/login', {
    templateUrl: 'modules/auth/login.html',
    controller: 'ViewAuthLoginCtrl'
  });
}])

.controller('ViewAuthLoginCtrl', ['$scope', 'dataService', function($scope, dataService) {
  //var ref = new Firebase("https://cguo.firebaseio.com");
  $scope.loginError = null;
  
  $scope.frmLogin = {};
      function loginUserSuccess(response){
          console.log('success results: ', response);
          if (response.data.error === 1) {
              $scope.loginError = response.data.errorMessage;
              return;
          }
          $scope.loginError = 'Login successfully.';
          $scope.frmLogin = {};
      }
      function loginUserFailure(response){
          console.log('failure results: ', response);
          $scope.loginError = 'Failed to Login.';
      }
  
  $scope.loginUser = function() {
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1';
      var postData = 'userName='+encodeURIComponent($scope.frmLogin.email)+'&password='+encodeURIComponent($scope.frmLogin.password);
      dataService.post(url, postData, loginUserSuccess, loginUserFailure);
      console.log(postData);
    /*ref.authWithPassword({
      email    : $scope.frmLogin.email,
      password : $scope.frmLogin.password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $scope.loginError = "Login Failed!" + error;
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.loginError = "Authenticated successfully with uid:" + authData.uid;
        $scope.frmLogin = {};
        //login service from our DB, ajax in Anguler
      }
      if(!$scope.$$phase) $scope.$apply();
    });*/
  };
  
}])

.controller('ViewAuthCtrl', ['$scope', 'dataService', function($scope, dataService) {
//  var ref = new Firebase("https://cguo.firebaseio.com");
  $scope.createUserError = null;
      function createUserSuccess(response){
          console.log('success results: ', response);
          if (response.data.error === 1) {
              $scope.createUserError = response.data.errorMessage;
              return;
          }
          $scope.createUserError = 'New user created successfully.';
          $scope.frm = {};
      }
      function createUserFailure(response){
          console.log('failure results: ', response);
          $scope.createUserError = 'Failed to create user.';
      }
  $scope.createNewUser = function() {
      if ($scope.frm.confirm_password !== $scope.frm.password) {
       $scope.createUserError = 'Password does not match with confirm password. Please check again!';
       return;
        }
      
      console.log($scope.frm);
      // change the url to make a failure case.
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1';
      var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+'&username='+encodeURIComponent($scope.frm.username)+'&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+'&user_details[age]='+encodeURIComponent($scope.frm.age);
      dataService.post(url, postData, createUserSuccess, createUserFailure);
/*      return;
      
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
            // also save it in my DB later.  ToDo
              $scope.frm = {};
          }
          //to update the scope in html page, when using 3rd party tool, or regular JS in AngularJS, e.g. firebase here
          if(!$scope.$$phase) $scope.$apply();

        });*/
  };
}]);