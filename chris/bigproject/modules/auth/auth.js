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

.controller('ViewAuthLoginCtrl', ['$scope', function($scope) {
  var ref = new Firebase("https://cguo.firebaseio.com");
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
        //login service from our DB, ajax in Anguler
      }
      if(!$scope.$$phase) $scope.$apply();
    });
  };
  
}])

.controller('ViewAuthCtrl', ['$scope', function($scope) {
  var ref = new Firebase("https://cguo.firebaseio.com");
  $scope.createUserError = null;
  $scope.createNewUser = function() {
      if ($scope.frm.confirm_password !== $scope.frm.password) {
       $scope.createUserError = 'Password does not match with confirm password. Please check again!';
       return;
        }
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

        });
  };
}]);