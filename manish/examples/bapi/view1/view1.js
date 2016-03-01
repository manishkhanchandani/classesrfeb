'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'dataService', function($scope, dataService) {
  $scope.options = {
      types: 'geocode'
  };
  $scope.details = {};
  
  //path
  var path = '/manish/sampleApi';
  //access_token
  var access_token = 'f2e5c123cbbd22ee24cc267038111d82';
  
  //Adding Details
  $scope.frmAdd = {};
  
  function addSuccess(response) {
    console.log('success: ', response);
    $scope.frmAdd = {};
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.add = function() {
    //main data
    var submitData = '';
    submitData = submitData + '&param='+encodeURIComponent($scope.frmAdd.name);
    //xtra data
    submitData = submitData + '&data[email]='+encodeURIComponent($scope.frmAdd.email);
    submitData = submitData + '&data[gender]='+encodeURIComponent($scope.frmAdd.gender);
    //location
    submitData = submitData + '&location[latitude]='+encodeURIComponent($scope.details.components.lat);
    submitData = submitData + '&location[longitude]='+encodeURIComponent($scope.details.components.lng);
    submitData = submitData + '&location[country]='+encodeURIComponent($scope.details.components.country);
    submitData = submitData + '&location[state]='+encodeURIComponent($scope.details.components.state);
    submitData = submitData + '&location[city]='+encodeURIComponent($scope.details.components.city);
    submitData = submitData + '&location[zip]='+($scope.details.components.zip ? encodeURIComponent($scope.details.components.zip) : '');
    submitData = submitData + '&location[place_id]='+encodeURIComponent($scope.details.place_id);
    submitData = submitData + '&location[county]='+encodeURIComponent($scope.details.components.county);
    submitData = submitData + '&location[formatted_addr]='+encodeURIComponent($scope.details.formatted_address);
    
    //tags
    submitData = submitData + '&tags='+encodeURIComponent($scope.frmAdd.tags);
    
    //url
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+access_token+'&path='+path;
    dataService.post(url, submitData, addSuccess, addFailure);
  };
  //Adding Details Ends
  
  //Get All
  function getAllSuccess(response) {
    console.log('success: ', response);
    $scope.getAllItems = response.data.data.results;
  }
  
  function getAllFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.getAll = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&noCache=1&path='+path;
    if ($scope.details) {
      if ($scope.details.components) {
        if ($scope.details.components.lat && $scope.details.components.lng) {
          url = url + '&lat=' + $scope.details.components.lat;
          url = url + '&lon=' + $scope.details.components.lng;
        }
      }
    }
    dataService.get(url, getAllSuccess, getAllFailure, false);
  };
  //Get All Ends
  
  //getOne
  function getOneSuccess(response) {
    console.log('success: ', response);
    $scope.getOneItems = response.data.data;
  }
  
  function getOneFailure(response) {
    console.log('failure: ', response);
  }
  $scope.getOne = function(item) {
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+ item.id;
     dataService.get(url, getOneSuccess, getOneFailure, false);
  };
  //getOne Ends
  
  //edit
  $scope.frmEdit = {};
  $scope.editDetails = {};
  $scope.edit = function(item) {
    console.log(item);
    $scope.frmEdit.name = item.title;
    $scope.frmEdit.email = item.detailsFull.email;
    $scope.frmEdit.gender = item.detailsFull.gender;
    $scope.frmEdit.tags = item.detailsFull.tagsSingle;
    $scope.autocompleteEdit = item.location.formatted_addr;
    $scope.editDetails.components = item.location;
    $scope.editDetails.components.lat = item.location.latitude;
    $scope.editDetails.components.lng = item.location.longitude;
    $scope.editDetails.place_id = item.location.place_id;
    $scope.editDetails.formatted_address = item.location.formatted_addr;
    $scope.frmEdit.id = item.id;
    console.log($scope.editDetails);
  };
  
  function editSuccess(response) {
    console.log('success: ', response);
    $scope.frmEdit = {};
  }
  
  function editFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.editSubmit = function() {
    //main data
    var submitData = '';
    submitData = submitData + '&title='+encodeURIComponent($scope.frmEdit.name);
    //xtra data
    submitData = submitData + '&data[email]='+encodeURIComponent($scope.frmEdit.email);
    submitData = submitData + '&data[gender]='+encodeURIComponent($scope.frmEdit.gender);
    //location
    submitData = submitData + '&location[latitude]='+encodeURIComponent($scope.editDetails.components.lat);
    submitData = submitData + '&location[longitude]='+encodeURIComponent($scope.editDetails.components.lng);
    submitData = submitData + '&location[country]='+encodeURIComponent($scope.editDetails.components.country);
    submitData = submitData + '&location[state]='+encodeURIComponent($scope.editDetails.components.state);
    submitData = submitData + '&location[city]='+encodeURIComponent($scope.editDetails.components.city);
    submitData = submitData + '&location[zip]='+($scope.editDetails.components.zip ? encodeURIComponent($scope.editDetails.components.zip) : '');
    submitData = submitData + '&location[place_id]='+encodeURIComponent($scope.editDetails.place_id);
    submitData = submitData + '&location[county]='+encodeURIComponent($scope.editDetails.components.county);
    submitData = submitData + '&location[formatted_addr]='+encodeURIComponent($scope.editDetails.formatted_address);
    
    //tags
    submitData = submitData + '&tags='+encodeURIComponent($scope.frmEdit.tags);
    
    //url
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=update&saveIP=1&id='+$scope.frmEdit.id+'&access_token='+access_token+'&path='+path;
    dataService.post(url, submitData, editSuccess, editFailure);
  };
  
  function deleteSuccess(response) {
   console.log('success: ', response); 
   $scope.getAll();
  }
  
  function deleteFailure(response) {
   console.log('failure: ', response); 
  }
  
  $scope.deleteItem = function(item) {
    var a = confirm('do you really want to delete this record?');
    if (!a) {
     return false; 
    }
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=delete&id='+item.id+'&access_token='+access_token;
    dataService.get(url, deleteSuccess, deleteFailure, false);
  };
}]);