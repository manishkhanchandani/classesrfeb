'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/auth/create', {
            templateUrl: 'modules/auth/auth.html',
            controller: 'AuthCreateCtrl'
        });
    }])

    .controller('AuthCreateCtrl', ['$scope', function($scope) {
            var ref = new Firebase("https://boiling-heat-3323.firebaseio.com");
       $scope.createNewUser = function(){
           if($scope.frm.confirm_password !==$scope.frm.password){
               $scope.createUserError = "Password doesn't match with corrent password. \n\
                                           Please try again!!!";
               return;
           }
           ref.createUser({
                email    : $scope.frm.email,
                password : $scope.frm.password
                   }, function(error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                    $scope.createUserError = "Error creating user: " + error;
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                    $scope.createUserError = "Successfully created user account with uid:" + userData.id;
                    $scope.frm = {};
                    //save it in my database
                }
                if(!$scope.$$phase) $scope.$apply();
            }); 
       };
       
       $scope.createUserError = null;
            
}]);