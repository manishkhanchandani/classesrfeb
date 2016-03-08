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
    .when('/auth/logout', {
    templateUrl: 'modules/auth/logout.html',
    controller: 'ViewAuthLogoutCtrl'
  })
        ;
}])

.controller('ViewAuthLoginCtrl', ['$scope', 'dataService',function($scope,dataService) {
  $scope.loginStatus = null;
 
    function loginSuccess(response) {
    console.log('success: ', response);
    if(response.data.error === 1){
        $scope.loginStatus = response.data.errorMessage;
        return;
    }
         $scope.$parent.loggedInUsersData= response.data.data;
       localStorage.setItem('userProfile', JSON.stringify($scope.$parent.loggedInUsersData));
        $scope.frmLogin= {};
  }
  
  function loginFailure(response) {
    console.log('failure: ', response);
    $scope.loginStatus = "Couldn't query the server, Please try again";
  }
  
  $scope.loginUser = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1';
    var postData = 'username='+encodeURIComponent($scope.frmLogin.email)+'&password='+encodeURIComponent($scope.frmLogin.password);
    dataService.post(url, postData, loginSuccess, loginFailure);
  };
  
}])

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
}])

.controller('ViewAuthLogoutCtrl', ['$scope', 'dataService', function($scope, dataService) {
  
  $scope.logoutStatus = null;
  
  function logoutSuccess(response) {
    if (response.data.error === 1) {
      $scope.logoutStatus = response.data.errorMessage;
      return;
    }
    
    localStorage.removeItem('userProfile');
    $scope.$parent.loggedInUsersData = null;
    $scope.logoutStatus = 'You are successfully logged out from our website.';
  }
  
  function logoutFailure(response) {
     $scope.logoutStatus = 'There was some server problem, please try again...';
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=logout&saveIP=1&uid='+$scope.$parent.loggedInUsersData.uid;
  
  dataService.get(url, logoutSuccess, logoutFailure, false);

  
  
}])

;
