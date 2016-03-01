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

.controller('ViewAuthLoginCtrl', ['$scope', 'dataService', function($scope, dataService) {
  $scope.loginStatus = null;
  
  $scope.frmLogin = {};
  
  
  function loginSuccess(response) {
    console.log('success: ', response);
    
    if (response.data.error === 1) {
      $scope.loginStatus = response.data.errorMessage;
      return;
    }
    
    $scope.$parent.loggedInUsersData = response.data.data;
    $scope.loginStatus = 'You are successfully logged in to our website.';
    $scope.frmLogin = {};

  }
  
  function loginFailure(response) {
    console.log('failure: ', response);
    
    $scope.loginStatus = 'Could not query the server, please try again later';
  }
  
  $scope.loginUser = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1';
    var postData = 'username='+encodeURIComponent($scope.frmLogin.email)+'&password='+encodeURIComponent($scope.frmLogin.password);
    dataService.post(url, postData, loginSuccess, loginFailure);
  };
  
}])
/*
  var ref = new Firebase("https://boiling-torch-3780.firebaseio.com");
  ref.authWithPassword({
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
        
        //login service from our database (api)
      }
      if(!$scope.$$phase) $scope.$apply();
    });
*/

.controller('ViewAuthCreateCtrl', ['$scope', 'dataService', function($scope, dataService) {


  $scope.createUserError = null;


  function createUserSuccess(response) {
    console.log('success results: ', response);
    if (response.data.error === 1) {
      $scope.createUserError = response.data.errorMessage;
      return;
    }
    
    $scope.createUserError = 'New User Created Successfully.';
    $scope.frm = {};
  }
  
  function createUserFailure(response) {
    console.log('failure results: ', response);
    $scope.createUserError = 'Failed to create user. Please try again';
  }
  
  $scope.createNewUser = function() {
    if ($scope.frm.confirm_password !== $scope.frm.password) {
       $scope.createUserError = 'Password does not match with confirm password. Please check again!';
       return;
    }
    
    console.log($scope.frm);
    
    
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1';
    var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+'&username='+encodeURIComponent($scope.frm.username)+'&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+'&user_details[age]='+encodeURIComponent($scope.frm.age);
    
    dataService.post(url, postData, createUserSuccess, createUserFailure);
  };
  
  
}]);

/*
  var ref = new Firebase("https://boiling-torch-3780.firebaseio.com");
  ref.createUser({
  email    : $scope.frm.email,
  password : $scope.frm.password
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
    $scope.createUserError = "Error creating user:" + error;
  } else {
    console.log(userData);
    console.log("Successfully created user account with uid:", userData.uid);
    $scope.createUserError = "Successfully created user account with uid:" + userData.uid;
    //save it in my database also ToDo * (api)
    
    $scope.frm = {};
  }
  
  //to update the scope in html page
  if(!$scope.$$phase) $scope.$apply();
});*/