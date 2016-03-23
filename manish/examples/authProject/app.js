'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1'
  //,
  //'ngAutocomplete',
  //'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('mainController', ['$scope', function($scope) {
  //https://www.firebase.com/docs/web/guide/login/password.html
  //https://www.firebase.com/docs/web/guide/user-auth.html
  $scope.ref = new Firebase("https://boiling-torch-3780.firebaseio.com");
  var ref = $scope.ref;
  
  $scope.createUser = function() {
    ref.createUser({
      email    : "bobtony@mkgalaxy.com",
      password : "password"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };
  
  $scope.loginUser = function() {
    ref.authWithPassword({
    email    : "bobtony@mkgalaxy.com",
      password : "password"
    }, function(error, authData) {
      if (error) {
        console.log(error.code);
        switch (error.code) {
          case "INVALID_EMAIL":
            console.log("The specified user account email is invalid.");
            break;
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error logging user in:", error);
        }
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };
  
  
  
  $scope.changeEmail = function() {
    ref.changeEmail({
      oldEmail : "bobtony2@mkgalaxy.com",
      newEmail : "bobtony@mkgalaxy.com",
      password : "password"
    }, function(error) {
      if (error === null) {
        console.log("Email changed successfully");
      } else {
        console.log("Error changing email:", error);
      }
    }); 
  };
  
  $scope.changePassword = function() {
    ref.changePassword({
      email       : "bobtony@mkgalaxy.com",
      oldPassword : "password2",
      newPassword : "password"
    }, function(error) {
      if (error === null) {
        console.log("Password changed successfully");
      } else {
        console.log("Error changing password:", error);
      }
    });
  };
  
  $scope.passwordReset = function() {
    ref.resetPassword({
      email : "bobtony@mkgalaxy.com"
    }, function(error) {
      if (error === null) {
        console.log("Password reset email sent successfully");
      } else {
        console.log("Error sending password reset email:", error);
      }
    });  
  };
  
  
  $scope.deleteUser = function() {
    ref.removeUser({
      email    : "bobtony@mkgalaxy.com",
      password : "password"
    }, function(error) {
      if (error === null) {
        console.log("User removed successfully");
      } else {
        console.log("Error removing user:", error);
      }
    });  
  };
  
  // Create a callback which logs the current auth state
  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
  }
  /*
  ref.onAuth(authDataCallback);
  //To stop listening for changes, you can use offAuth().
  ref.offAuth(authDataCallback);
  //Additionally, you can use the getAuth() method to synchronously check authentication state.

    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
    
    logout
    ref.unauth();
    */
  
}])
