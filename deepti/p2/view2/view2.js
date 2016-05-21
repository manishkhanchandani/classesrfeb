'use strict';

angular.module('myApp.view2', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$firebaseArray', function($scope,$firebaseArray) {
  var ref = new Firebase("https://amber-torch-2130.firebaseio.com/fb1");
   //create a reference for firebase                       
    $scope.records=$firebaseArray(ref);   
                          
    //add form submission
       $scope.AddRecord=function(){
         console.log($scope.frm);
           $scope.records.$add($scope.frm).then(function(response) {
      console.log(response.key());
      $scope.frm = {};
    });                
 };                   
    //get record
    
    $scope.editFrm = {};
  $scope.editRecord = function(v) {
    var rec = $scope.records.$getRecord(v.$id);
    $scope.editFrm.firstname = rec.firstname;
    $scope.editFrm.lastname = rec.lastname;
      $scope.editFrm.id=rec.$id;
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
    $scope.viewRecord=function(v){
        var rec = $scope.records.$getRecord(v.$id);
        $scope.firstname=rec.firstname;
        $scope.lastname=rec.lastname;
        
        
    }
    
    

    //delete record
    
    $scope.deleteRecord=function(v){
        console.log(v);
        $scope.records.$remove(v);
    }
}]);