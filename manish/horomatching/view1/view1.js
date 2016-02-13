'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

  $scope.profile = {
    'name': 'Manish',
    'day': 5,
    'month': 6,
    'year': 1974,
    'hour': 12,
    'minute': 30
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
  $scope.matchProfile = function() {
    console.log($scope.data);
  };
}]);