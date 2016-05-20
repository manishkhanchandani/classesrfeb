'use strict';

angular.module('myApp.view2', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  //creating a reference to firebase
  var ref = new Firebase('https://mycontacts12.firebaseio.com/fb2');
  $scope.records = $firebaseArray(ref);


  //add form submission
  $scope.addRecord = function() {
    console.log($scope.frm);
    $scope.records.$add($scope.frm).then(function(response) {
      console.log(response.key());
      $scope.frm = {};
    });
  };
  
  //get Record
  $scope.editFrm = {};
  $scope.editRecord = function(v) {
    var rec = $scope.records.$getRecord(v.$id);
    $scope.editFrm.firstname = rec.firstname;
    $scope.editFrm.lastname = rec.lastname;
    $scope.editFrm.id = rec.$id;
  };
  //edit form submission
  
  $scope.submitEditForm = function() {
    var rec = $scope.records.$getRecord($scope.editFrm.id);
    
    rec.firstname = $scope.editFrm.firstname;
    rec.lastname = $scope.editFrm.lastname;
    $scope.records.$save(rec).then(function(response) {
      
    });
  };
  
  
  //show detail record
  $scope.viewDetail = function(v)
  {
    var rec = $scope.records.$getRecord(v.$id);
    $scope.firstname = rec.firstname;
    $scope.lastname = rec.lastname;
  }
  
  //delete record
  $scope.deleteRecord = function(v) {
    console.log(v);
    $scope.records.$remove(v);
  };
  
  
}]);