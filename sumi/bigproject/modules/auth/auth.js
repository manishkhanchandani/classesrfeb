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

.controller('ViewAuthLoginCtrl', ['$scope', 'dataService',function($scope,dataService) {
  $scope.loginError = null;
 
    function loginSuccess(response) {
    console.log('success: ', response);
  }
  
  function loginFailure(response) {
    console.log('failure: ', response);
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
