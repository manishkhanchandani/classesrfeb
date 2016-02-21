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
    submitData = submitData + '&title='+encodeURIComponent($scope.frmAdd.name);
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
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&path='+path;
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
}]);