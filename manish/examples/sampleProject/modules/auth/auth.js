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
  var ref = new Firebase("https://boiling-torch-3780.firebaseio.com");
  $scope.loginError = null;
  
  $scope.frmLogin = {};
  
  $scope.loginUser = function() {
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
  };
  
}])

.controller('ViewAuthCreateCtrl', ['$scope', 'dataService', function($scope, dataService) {
  var ref = new Firebase("https://boiling-torch-3780.firebaseio.com");

  $scope.createUserError = null;

  function createUserSuccess(response) {
    console.log('success results: ', response);
    if (response.data.error === 1) {
      $scope.createUserError = response.data.errorMessage;
      return;
    }
    
    $scope.createUserError = "Successfully created user account with uid:" + response.data.data.uid + ", email: " + response.data.data.email + ", Username: " + response.data.data.username;
    $scope.frm = {};
  }
  
  function createUserFailure(response) {
    $scope.createUserError = "Error creating user " + response.statusText;
  }
    
  $scope.createNewUser = function() {
    if ($scope.frm.confirm_password !== $scope.frm.password) {
       $scope.createUserError = 'Password does not match with confirm password. Please check again!';
       return;
    }
    
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1';
    var postData = 'email='+encodeURIComponent($scope.frm.email)+'&password='+encodeURIComponent($scope.frm.password)+'&username='+encodeURIComponent($scope.frm.username)+'&user_details[fullname]='+encodeURIComponent($scope.frm.fullname)+'&user_details[age]='+encodeURIComponent($scope.frm.age);
    
    dataService.post(url, postData, createUserSuccess, createUserFailure);
  };
  
  
}]);