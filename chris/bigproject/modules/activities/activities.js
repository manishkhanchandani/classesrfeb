'use strict';
// this is a sub module
angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewActivitiesCtrl'
  }).when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewActivitiesCreateCtrl'
  }).when('/activities/create/images/:id', {  //need id from page1
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewActivitiesImagesCtrl'
  }).when('/activities/search', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })
  // search & browse, plus paging of results
  .when('/activities/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })
  .when('/activities/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })  
  .when('/activities/search/:page/:keyword', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })  
  .when('/activities/search/:page', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })
  .when('/activities/search', {
    templateUrl: 'modules/activities/search.html',
    controller: 'ViewActivitiesSearchCtrl'
  })
  ;
}])

.controller('ViewActivitiesCtrl', ['$scope', function($scope) {

}])
.controller('ViewActivitiesSearchCtrl', ['$scope', '$location', '$routeParams', 'dataService', function($scope, $location, $routeParams, dataService) {
    $scope.frm = {};
    
    //Google location autocomplete starts
    $scope.mapOptions = {
        type: 'geocode'
    };
    $scope.details = {};
    $scope.details.components = {}
    //Google location autocomplete ends
    
    // update $scope.frm from $routeParams
    $scope.frm.page = $routeParams.page? $routeParams.page : 0;
    if ($routeParams.keyword) {
        $scope.frm.keyword = $routeParams.keyword;
    }
    $scope.frm.radius = $routeParams.radius? $routeParams.radius : 30;
    if ($routeParams.lat) {
        $scope.details.components.lat = $routeParams.lat;
    }
    if ($routeParams.lng) {
        $scope.details.components.lng = $routeParams.lng;
    }
  if ($routeParams.location) {
    $scope.location = decodeURIComponent($routeParams.location);
  }
    
    $scope.results = {};
    function successGetData(response) {
        console.log('success: ', response.data.data.results);
        $scope.results = response.data.data.results;
    }
    function failureGetData(response) {
        console.log('failed: ', response);
    }
    $scope.getData = function() {
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/chris/activities';
        if ($scope.frm.keyword) {
            url = url + '&q=' + encodeURIComponent($scope.frm.keyword);
        }
        if ($scope.location) {
            url = url + '&lat=' + $scope.details.components.lat;
            url = url + '&lon=' + $scope.details.components.lng;
            url = url + $scope.frm.radius;
        }
        console.log('API url: ', url);
        dataService.get(url, successGetData, failureGetData, true);
    }; //getData ends
    
    $scope.getData(); // get data on page load
    // construct url from form, for directing
    $scope.constructURL = function() {
        console.log($scope.frm);
        var url = '/activities/search/0';
      if ($scope.frm.keyword) {
          url = url + '/' + encodeURIComponent($scope.frm.keyword);
      }
    if ($scope.location) {
      if (!$scope.frm.radius) {
        $scope.frm.radius = 30;
      }
      
      url = url + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng + '/' + encodeURIComponent($scope.frm.radius) + '/' + encodeURIComponent($scope.location);
     }
      $location.path(url);
        
    }
}])
.controller('ViewActivitiesCreateCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
    //location starts 
    $scope.mapOptions = { 
        types: 'geocode' 
    }; 
    $scope.details = {}; 
    //location ends
  function addSuccess(response) {
    console.log('success: ', response);
    console.log('id is : ', response.data.data.id);
    $scope.frm = {};
    $location.path('/activities/create/images/'+response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
    $scope.submitCreateForm = function() {
        //url
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/chris/activitiess&tid=1';
        console.log(url);
        //postdata
        var postData = '';
        postData = postData + '&title='+encodeURIComponent($scope.frm.title);
        postData = postData + '&description='+encodeURIComponent($scope.frm.description);

        postData = postData + '&location[latitude]='+encodeURIComponent($scope.details.components.lat);
        postData = postData + '&location[longitude]='+encodeURIComponent($scope.details.components.lng);
        postData = postData + '&location[country]='+encodeURIComponent($scope.details.components.country);
        postData = postData + '&location[state]='+encodeURIComponent($scope.details.components.state);
        postData = postData + '&location[city]='+encodeURIComponent($scope.details.components.city);
        postData = postData + '&location[zip]='+encodeURIComponent($scope.details.components.postal_code);
        postData = postData + '&location[place_id]='+encodeURIComponent($scope.details.place_id);
        postData = postData + '&location[county]='+encodeURIComponent($scope.details.components.county);
        postData = postData + '&location[formatted_addr]='+encodeURIComponent($scope.details.formatted_address);

        postData = postData + '&tags='+encodeURIComponent($scope.frm.tags);

        postData = postData + '&data[gender]='+encodeURIComponent($scope.frm.gender);

        console.log(postData);
        //call api service to submit the form
        dataService.post(url, postData, addSuccess, addFailure);
    };
}]).controller('ViewActivitiesImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams',function($scope, $location, dataService, $routeParams) {  
  $scope.id = $routeParams.id;
    // getData
    $scope.images = null;
  function successGetData(response) {
    console.log('success: ', response);
      // get images from server
      $scope.images = response.data.data.detailsFull.images;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
  
  $scope.getData = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
    dataService.get(url, successGetData, failureGetData, false);
  };
  
  //call the getdata function
  $scope.getData();
// getData end  
  $scope.frm = {};
  
  function addImageSuccess(response) {
    //console.log('success: ', response);
    $scope.frm = {};
      $scope.getData();
  }
  
  function addImageFailure(response) {
    console.log('failed: ', response);
  }
    
  $scope.addImage = function() {
    console.log($scope.frm);
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.loggedInUsersData.token+'&key=images&id='+$routeParams.id;
    var postData = '';
    postData = postData + '&param='+encodeURIComponent($scope.frm.image);
    
    console.log(url);
    console.log(postData);  
    
    dataService.post(url, postData, addImageSuccess, addImageFailure);

  };//add image function end
}]);