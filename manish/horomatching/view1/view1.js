'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'dataService', function($scope, dataService) {

  $scope.profile = {
    /*'name': 'Manish',
    'day': 5,
    'month': 6,
    'year': 1974,
    'hour': 12,
    'minute': 30*/
    };
  
  $scope.mapOptions = {
      types: '(cities)'
    };

  $scope.details = {};
  
  $scope.allProfiles = null;
  
  $scope.getAllProfiles = function() {
    var profiles = localStorage.getItem('profiles');
    $scope.allProfiles = JSON.parse(profiles);
    console.log($scope.allProfiles);
  };
  $scope.getAllProfiles();
  
  
  function saveUser(profile) {
    //get the profile
    var profiles = localStorage.getItem('profiles');
    var key = btoa(profile.name);
    var obj = {};
    if (!profiles) {
      obj[key] = profile;
      localStorage.setItem('profiles', JSON.stringify(obj));
    } else {
      obj = JSON.parse(profiles);
      if (obj[key]) {
        console.log('user already existed');
        return;
      } else {
        obj[key] = profile;
        localStorage.setItem('profiles', JSON.stringify(obj));
      }
    }
    $scope.getAllProfiles();
    $scope.profile = {};
    
    return obj;
  }//end saveUser

  //form submission
  $scope.profileSubmit = function() {
    $scope.profile.lat = $scope.details.components.lat;
    $scope.profile.lng = $scope.details.components.lng;
    //saving user in local storage
    saveUser($scope.profile);
  };
  
  
  $scope.data = {};
  
  function matchProfileSuccess(response) {
    console.log(response);
  }
  
  function matchProfileFailure(response) {
    
  }
  
  
  $scope.matchProfile = function() {
    console.log($scope.data);
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=matchLatLng&from[dob]='+$scope.data.profile1.year+'-'+$scope.data.profile1.month+'-'+$scope.data.profile1.day+'+'+$scope.data.profile1.hour+':'+$scope.data.profile1.minute+':00&from[lat]='+$scope.data.profile1.lat+'&from[lng]='+$scope.data.profile1.lng+'&to[dob]='+$scope.data.profile2.year+'-'+$scope.data.profile2.month+'-'+$scope.data.profile2.day+'+'+$scope.data.profile2.hour+':'+$scope.data.profile2.minute+':00&to[lat]='+$scope.data.profile2.lat+'&to[lng]='+$scope.data.profile2.lng;
    dataService.get(url, matchProfileSuccess, matchProfileFailure, 1);
  };
}]);