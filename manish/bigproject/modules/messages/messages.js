'use strict';

angular.module('myApp.messages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'modules/messages/messages.html',
    controller: 'MessagesCtrl'
  });
  $routeProvider.when('/messages/:uid', {
    templateUrl: 'modules/messages/messages.html',
    controller: 'MessagesCtrl'
  });
}])

.controller('MessagesCtrl', ['$scope', '$routeParams', 'dataService', 'configs', '$location', function($scope, $routeParams, dataService, configs, $location) {
  $scope.routeParams = $routeParams;
  /*if (!$scope.userData) {
     alert('Please login first to send message');
     window.history.back();
     return;
  }
  console.log($scope.userData);
  console.log($routeParams);
  if ($routeParams.uid) {
    if ($scope.userData.id === $routeParams.uid) {
      $location.path('/messages');
      return;
    }
  }
  //firebase reference
  var host = $location.host();
  var ref = new Firebase(configs[host].firebaseUrl);
  
  //from user
  var usersFrom = ref.child('users').child($scope.userData.id);
  $scope.usersFrom = $firebaseArray(usersFrom);
  
  //to user
  if ($routeParams.uid) {
    var usersTo = ref.child('users').child($routeParams.uid);
    $scope.usersto = $firebaseArray(usersTo);
    //adding from - to user
    usersTo.child($scope.userData.id).set({email: $scope.userData.email, id: $scope.userData.id, name: $scope.userData.name, image: $scope.userData.image, url: $scope.userData.url});
  }
  
  
  function getSuccess(response) {
    console.log('success', response);
    var results = response.data.data;
    //adding from - to user
    usersFrom.child($routeParams.uid).set({email: results.user_details.email, id: results.uid, name: results.user_details.name, image: results.user_details.image, url: results.user_details.url});
  }
  
  function getFailure(response) {
    console.log('failure', response);
  }
  
  if ($routeParams.uid) {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=user&id='+$routeParams.uid;
    dataService.get(url, getSuccess, getFailure, true);
  }*/
}]);