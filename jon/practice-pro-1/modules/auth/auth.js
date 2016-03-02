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

    .controller('ViewAuthLoginCtrl', ['$scope', 'dataService', function($scope, dataService) {
        $scope.loginStatus = null;
        $scope.frmLogin = {};

        function loginSuccess(response) {
            console.log('success results: ', response);
            if (response.data.error === 1) {
                $scope.loginStatus = response.data.errorMessage;
                return;
            }

            //can not update global, unless specify updating the "parents" loggedInUsersData
            $scope.$parent.loggedInUsersData    = response.data.data;

            localStorage.setItem('userProfile', JSON.stringify($scope.$parent.loggedInUsersData));

            $scope.loginStatus          = 'User Authenticated Successfully.' + response.data.data.user_details.fullname;
            $scope.frm = {};

            //if(!$scope.$$phase) $scope.$apply();
        }

        function loginFailure(response) {
            console.log('failure results: ', response);
            $scope.loginStatus = 'Failed to login user. Please try again';
        }

        $scope.loginUser = function() {
            console.log($scope.frmLogin);
            var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1';
            var postData = 'username='+encodeURIComponent($scope.frmLogin.email)+'&password='+encodeURIComponent($scope.frmLogin.password);
            dataService.post(url, postData, loginSuccess, loginFailure);
        };

    }])
    /*
     var ref = new Firebase("https://boiling-inferno-4525.firebaseio.com");
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

    .controller('ViewAuthLogoutCtrl', ['$scope', 'dataService', function($scope, dataService) {
        $scope.logoutStatus = null;

        function logoutSuccess(response) {
            console.log('success results: ', response);
            if (response.data.error === 1) {
                $scope.logoutStatus = response.data.errorMessage;
                return;
            }
            $scope.logoutStatus = 'Logged Out Successfully.';
            $scope.frm = {};

            localStorage.removeItem('userProfile');
            $scope.$parent.loggedInUsersData    = null;
        }

        function logoutFailure(response){
            console.log('failure results: ', response);
            $scope.logoutStatus = 'Failed to logout from server. Please try to logout again';
        }

        var url     = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=logout&saveIP=1&uid='+$scope.loggedInUsersData.uid;

        dataService.get(url, logoutSuccess, logoutFailure, false);


    }])



    .controller('ViewAuthCreateCtrl', ['$scope', 'dataService', function($scope, dataService) {


        $scope.createUserError = null;


        function createUserSuccess(response) {

            console.log('success results: ', response);

            console.log(response);

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
 var ref = new Firebase("https://boiling-inferno-4525.firebaseio.com");
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