'use strict';

angular.module('myApp.manager', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/manager/county', {
    templateUrl: 'modulesFB/manager/county.html',
    controller: 'ViewManagerCountyCtrl'
  })
  .when('/manager/county/:country/:state/:county', {
    templateUrl: 'modulesFB/manager/paypal.html',
    controller: 'PaypalManagerCountyCtrl'
  })
  .when('/manager/paypal/confirm/:country/:state/:county', {
    templateUrl: 'modulesFB/manager/paypal_confirm.html',
    controller: 'PaypalManagerCountyCtrl'
  })
  .when('/manager/paypal/cancel/:country/:state/:county', {
    templateUrl: 'modulesFB/manager/paypal_cancel.html',
    controller: 'PaypalManagerCountyCtrl'
  })
  ;
}])

.controller('PaypalManagerCountyCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
  $scope.frm = {};
  console.log($routeParams);
  var country = decodeURIComponent($routeParams.country);
  var state = decodeURIComponent($routeParams.state);
  var county = decodeURIComponent($routeParams.county);
  $scope.results = {};
  $scope.ref.child('manager').child('countyPending').child(country).child(state).child(county).once("value", function(snapshot) {
    var a = snapshot.exists();
    if (!a) {
      $scope.frm.status = 'County does not exists.';
      alert('County does not exists.');
      $location.path('/manager/county');
      if(!$scope.$$phase) $scope.$apply();
      return;
    }
    
    $scope.frm.confirmURL = 'http://ineedmassage.us/manager/paypal/confirm/' + encodeURIComponent(country) + '/' + encodeURIComponent(state) + '/' + encodeURIComponent(county);
		$scope.frm.cancelURL = 'http://ineedmassage.us/manager/paypal/cancel/' + encodeURIComponent(country) + '/' + encodeURIComponent(state) + '/' + encodeURIComponent(county);
		$scope.frm.notifyURL = 'http://ineedmassage.us/php/massage/manager/ipnNofity.php';
    $scope.results = snapshot.val();
    $scope.results.itemName = 'Website County Manger For ' + $scope.results.county.county + ', ' + $scope.results.county.state + ', ' + $scope.results.county.country;
    $scope.results.itemNumber = 1;
    $scope.results.customJson = {uid: $scope.userData.uid, path: $scope.results.path};
    if(!$scope.$$phase) $scope.$apply();
  });
}])

.controller('ViewManagerCountyCtrl', ['$scope', '$location', function($scope, $location) {
  if (!$scope.userData) {
   $location.path('/');
   return; 
  }
  if (!$scope.userData.uid) {
   $location.path('/');
   return; 
  }
  
  //location starts
  $scope.mapOptions = {
    types: '(cities)'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  $scope.frm.details.components = {};
  $scope.frm.status = null;
  //location ends
  
  $scope.addCountyManager = function() {
    //check if county is empty else give error
    if (!$scope.frm.details.components.county) {
      $scope.frm.status = 'Invalid County, please choose city';
      return; 
    }
    
    var country = btoa($scope.frm.details.components.country);
    var state = btoa($scope.frm.details.components.state);
    var county = btoa($scope.frm.details.components.county);
    
    //check if county is already taken by someone
    $scope.ref.child('manager').child('county').child(country).child(state).child(county).once("value", function(snapshot) {
        var a = snapshot.exists();
        if (a) {
          $scope.frm.status = 'County already taken. Choose another county.';
          if(!$scope.$$phase) $scope.$apply();
          return;
        }
        //check in pending county
          //add county in pending list
          $scope.ref.child('manager').child('countyPending').child(country).child(state).child(county).once("value", function(snapshot) {
              var a = snapshot.exists();
              if (a) {
                $scope.frm.status = 'County in pending state, please check back later or choose another county.';
                if(!$scope.$$phase) $scope.$apply();
                return;
              }
              
              var data = {};
              data.location = $scope.frm.details.components;
              data.county = {};
              data.county.country = $scope.frm.details.components.country;
              data.county.state = $scope.frm.details.components.state;
              data.county.county = $scope.frm.details.components.county;
              data.name = $scope.userData.displayName;
              data.email = $scope.userData.email;
              data.uid = $scope.userData.uid;
              data.path = country + '/' + state + '/' + county;
              obj.owsRecordTmp.child(id).child('paths').push('location/' + btoa(postData.location.country) + '/' + btoa(postData.location.state) + '/' + btoa(postData.location.county) + '/' + id);
              data.timestamp = Firebase.ServerValue.TIMESTAMP;
              $scope.ref.child('manager').child('countyPending').child(country).child(state).child(county).set(data);
              $scope.frm.status = 'County added successfully.';
              $location.path('/manager/county/' + encodeURIComponent(country) + '/' + encodeURIComponent(state) + '/' + encodeURIComponent(county));
              if(!$scope.$$phase) $scope.$apply();
            });
    });
  };
}])
;