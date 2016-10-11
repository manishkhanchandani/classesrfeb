'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/currentMatch/:name/:dob/:lat/:lng/:date/:lat2/:lng2/:days', {
    templateUrl: 'view1/currentMatch.html',
    controller: 'View2Ctrl'
  });
  
}])


.filter('encodeUrl', function() {
  return function(str) {
	  return encodeURIComponent(str);
  };
})


.filter('pad', function() {
  return function(num) {
    var size = 2;
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  };
})

.controller('View2Ctrl', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {
  console.log($routeParams);
  $scope.name = $routeParams.name;
  function matchCurrentSuccess(response) {
    console.log(response);
    if (response.data.success != 1) {
     //show alert 
    }
    $scope.matchCurrentResult = response.data.data;
    
    
  }
  
  function matchCurrentFailure(response) {
    console.log('error: ', response);
  }
  
  var url = 'http://api.mkgalaxy.com/api.php?action=continuityLatLng&noOfDays='+$routeParams.days+'&from[dob]='+$routeParams.dob+'&from[lat]='+$routeParams.lat+'&from[lng]='+$routeParams.lng+'&to[dob]='+$routeParams.date+'&to[lat]='+$routeParams.lat2+'&to[lng]='+$routeParams.lng2;
 dataService.get(url, matchCurrentSuccess, matchCurrentFailure, 1);
}])

.controller('View1Ctrl', ['$scope', 'dataService', '$interval', function($scope, dataService, $interval) {

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
  $scope.allProfilesCount = 0;
  
  $scope.matchCurrentVar = {};
  $scope.matchCurrentVar.noOfDays = 10;
  $scope.data = {};
  $scope.points = null;
  
  
  $scope.getAllProfiles = function() {
    var profiles = localStorage.getItem('profiles');
    if (profiles) {
      $scope.allProfiles = JSON.parse(profiles);
      $scope.allProfilesCount = Object.keys($scope.allProfiles).length;
      
      for (var key in $scope.allProfiles) {
        $scope.data.profile1 = $scope.allProfiles[key];
        $scope.matchCurrentVar.profileCurrent = $scope.allProfiles[key];
        break;
      }
    }
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
    //extra jquery work 
    $('#birthPlace').val('');
    
    return obj;
  }//end saveUser

  //form submission
  $scope.profileSubmit = function() {
    $scope.profile.lat = $scope.details.components.lat;
    $scope.profile.lng = $scope.details.components.lng;
    $scope.profile.minute = pad($scope.profile.minute, 2);
    //saving user in local storage
    saveUser($scope.profile);
  };
  
  
  
  function matchProfileSuccess(response) {
    console.log(response);
    if (response.data.success != 1) {
     //show alert 
    }
    
    $scope.points = response.data.data.points;
  }
  
  function matchProfileFailure(response) {
    console.log('error: ', response);
  }
  
  function buildUrl(year1, month1, day1, hour1, minute1, lat1, lng1, year2, month2, day2, hour2, minute2, lat2, lng2) {
    var url = 'http://api.mkgalaxy.com/api.php?action=matchLatLng&from[dob]='+year1+'-'+month1+'-'+day1+'+'+hour1+':'+minute1+':00&from[lat]='+lat1+'&from[lng]='+lng1+'&to[dob]='+year2+'-'+month2+'-'+day2+'+'+hour2+':'+minute2+':00&to[lat]='+lat2+'&to[lng]='+lng2;
    return url;
  };
  
  function pad(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
  }

  $scope.matchError = null;
  $scope.matchProfile = function() {
    if (!($scope.data.profile1 && $scope.data.profile2 && Object.keys($scope.data.profile1).length > 0 && Object.keys($scope.data.profile2).length > 0)) {
      $scope.matchError = 'Please choose both profiles to continue.';
      return;
    }
    $scope.matchError = null;
    var url = buildUrl($scope.data.profile1.year, $scope.data.profile1.month, $scope.data.profile1.day, $scope.data.profile1.hour, $scope.data.profile1.minute, $scope.data.profile1.lat, $scope.data.profile1.lng, $scope.data.profile2.year, $scope.data.profile2.month, $scope.data.profile2.day, $scope.data.profile2.hour, $scope.data.profile2.minute, $scope.data.profile2.lat, $scope.data.profile2.lng); //'http://api.mkgalaxy.com/api.php?action=matchLatLng&from[dob]='+$scope.data.profile1.year+'-'+$scope.data.profile1.month+'-'+$scope.data.profile1.day+'+'+$scope.data.profile1.hour+':'+$scope.data.profile1.minute+':00&from[lat]='+$scope.data.profile1.lat+'&from[lng]='+$scope.data.profile1.lng+'&to[dob]='+$scope.data.profile2.year+'-'+$scope.data.profile2.month+'-'+$scope.data.profile2.day+'+'+$scope.data.profile2.hour+':'+$scope.data.profile2.minute+':00&to[lat]='+$scope.data.profile2.lat+'&to[lng]='+$scope.data.profile2.lng;
    dataService.get(url, matchProfileSuccess, matchProfileFailure, 1);
  };
  
  $scope.deleteProfile = function(item) {
    var a = confirm('Do you really want to delete this profile?');
    if (!a) return false;
    var profiles = localStorage.getItem('profiles');
    var obj = JSON.parse(profiles);
    for (var i in obj) {
      if (i == btoa(item.name)) {
        delete obj[i];
      }
    }
    
    localStorage.setItem('profiles', JSON.stringify(obj));
    $scope.getAllProfiles();
  };
  
  
  var d = new Date();
  $scope.matchCurrentVar.curDate = d.getFullYear() + '-' + pad(d.getMonth() + 1, 2) + '-' + pad(d.getDate(), 2) + ' ' + pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2);
  
  /*var stop = $interval(function() {
     var d = new Date();
     $scope.matchCurrentVar.curDate = d.getFullYear() + '-' + pad(d.getMonth() + 1, 2) + '-' + pad(d.getDate(), 2) + ' ' + pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2);
  }, 1000);
  */
  
  function matchCurrentSuccess(response) {
    console.log(response);
    $scope.matchCurrentResultStatus = '';
    if (response.data.success != 1) {
     //show alert 
    }
    $scope.matchCurrentResult = response.data.data;
    localStorage.setItem('currentResult', JSON.stringify($scope.matchCurrentResult));
    
    
  }
  
  function matchCurrentFailure(response) {
    console.log('error: ', response);
  }
  
  $scope.matchCurrent = function(details) {
    $scope.details = details;
    localStorage.setItem('currentLocation', JSON.stringify($scope.details));
    localStorage.setItem('currentPlace', $scope.matchCurrentVar.currentPlace);
    $scope.matchCurrentResultStatus = 'Loading...';
    var url = 'http://api.mkgalaxy.com/api.php?action=continuityLatLng&noOfDays='+$scope.matchCurrentVar.noOfDays+'&from[dob]='+$scope.matchCurrentVar.profileCurrent.year+'-'+pad($scope.matchCurrentVar.profileCurrent.month, 2)+'-'+pad($scope.matchCurrentVar.profileCurrent.day, 2)+'+'+pad($scope.matchCurrentVar.profileCurrent.hour, 2)+':'+pad($scope.matchCurrentVar.profileCurrent.minute, 2)+':00&from[lat]='+$scope.matchCurrentVar.profileCurrent.lat+'&from[lng]='+$scope.matchCurrentVar.profileCurrent.lng+'&to[dob]='+encodeURIComponent($scope.matchCurrentVar.curDate)+'&to[lat]='+$scope.details.components.lat+'&to[lng]='+$scope.details.components.lng;
    dataService.get(url, matchCurrentSuccess, matchCurrentFailure, 1);
  };
  //getting from localstorage
  var currentLocation = localStorage.getItem('currentLocation');
  if (currentLocation) {
      $scope.details = JSON.parse(currentLocation);
  }
  var currentPlace = localStorage.getItem('currentPlace');
  $scope.matchCurrentVar.currentPlace = currentPlace;
  
  var currentResult = localStorage.getItem('currentResult');
  if (currentResult) {
      $scope.matchCurrentResult = JSON.parse(currentResult);
  }
  //getting from localstorage
  
  $scope.setCurrentLocation = function() {
    return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geocoder = new google.maps.Geocoder;
        var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              var result = results[0];
              //custom
                var componentForm = {
                  street_number: 'short_name',
                  route: 'long_name',
                  locality: 'long_name',
                  administrative_area_level_1: 'short_name',
                  administrative_area_level_2: 'short_name',
                  country: 'long_name',
                  postal_code: 'short_name'
                };
                $scope.details.components = {};
                for (var component in componentForm) {
                    $scope.details.components[component] = null;
                }
                $scope.details.components['state'] = null;
                $scope.details.components['city'] = null;
                for (var i = 0; i < result.address_components.length; i++) {
                    if (typeof(result.address_components[i].types[0]) !== "undefined") {
                        var addressType = result.address_components[i].types[0];
                        if (componentForm[addressType]) {
                            var val = result.address_components[i][componentForm[addressType]];
                            $scope.details.components[addressType] = val;
                        }
                    }
                 }
                 $scope.details.components['state'] = $scope.details.components['administrative_area_level_1'];
                 $scope.details.components['county'] = $scope.details.components['administrative_area_level_2'];
                 $scope.details.components['city'] = $scope.details.components['locality'];
                 $scope.details.components['location'] = $scope.details.components['city'] + ', ' + $scope.details.components['state'] + ', ' + $scope.details.components['country'];
                 $scope.details.components['lat'] = result.geometry.location.lat();
                 $scope.details.components['lng'] = result.geometry.location.lng();
                 $scope.details.place_id = result.place_id;
                 $scope.matchCurrentVar.currentPlace = $scope.details.components['location'];
                 if (!$scope.$$phase) $scope.$apply();
                //custom ends
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });//end geocoder.geocode
      }, onError, { timeout: 30000 });//end navigator.geolocation
    }//end if (navigator.geolocation)
  };//end $scope.setCurrentLocation
  
  function onError(error) {
   alert(error.message);
  };
  $scope.setCurrentLocation();
  
  $scope.MM_openBrWindow = function(winName,features) { //v2.0
    var theURL = ('http://horomatching.tk/currentMatch/'+$scope.matchCurrentVar.profileCurrent.name+'/'+$scope.matchCurrentVar.profileCurrent.year+'-'+pad($scope.matchCurrentVar.profileCurrent.month, 2)+'-'+pad($scope.matchCurrentVar.profileCurrent.day, 2)+'+'+pad($scope.matchCurrentVar.profileCurrent.hour, 2)+':'+pad($scope.matchCurrentVar.profileCurrent.minute, 2)+'/'+$scope.matchCurrentVar.profileCurrent.lat+'/'+$scope.matchCurrentVar.profileCurrent.lng+'/'+encodeURIComponent($scope.matchCurrentVar.curDate)+'/'+$scope.details.components.lat+'/'+$scope.details.components.lng+'/'+$scope.matchCurrentVar.noOfDays);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(theURL),winName,features);
  };
}]);