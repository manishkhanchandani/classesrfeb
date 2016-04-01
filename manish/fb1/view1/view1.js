'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase('https://mycontacts12.firebaseio.com/fb1');
  $scope.records = $firebaseArray(ref);
  
  
  $scope.frm = {};
  $scope.frmEdit = {};
  
  //add new records
  $scope.addForm = function() {
    $scope.records.$add($scope.frm).then(function(response) {
       var id = response.key();
       console.log('record added with id: ', id);
       $scope.frm = {};
    });
  };
  
  //when user fills the edit form and submit the data, it will update the server
  $scope.editForm = function() {
    console.log($scope.frmEdit);
    
    //get the id
    var id = $scope.frmEdit.id;
    
    //var record
    var record = $scope.records.$getRecord(id);
    
    record.firstname = $scope.frmEdit.firstname;
    record.lastname = $scope.frmEdit.lastname;
    
    $scope.records.$save(record).then(function(response) {
        $scope.frmEdit = {};
    });
  };
  
  //go to server, get the record and show record in edit form
  $scope.editLink = function(r) {
    $scope.frmEdit.firstname = r.firstname;
    $scope.frmEdit.lastname = r.lastname;
    $scope.frmEdit.id = r.$id;
  };
  
  //go to server, delete the record
  $scope.deleteLink = function(r) {
    $scope.records.$remove(r);
  };
  
}]);