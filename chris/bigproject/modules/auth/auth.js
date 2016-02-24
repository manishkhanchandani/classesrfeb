'use strict';
// this is a sub module
angular.module('myApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth', {
    templateUrl: 'modules/auth/auth.html',
    controller: 'ViewAuthCtrl'
  });
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