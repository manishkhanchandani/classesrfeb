'use strict';
// this is a sub module
angular.module('myApp.beauty', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/beauty', {
    templateUrl: 'modules/beauty/beauty.html',
    controller: 'ViewBeautyCtrl'
  }).when('/beauty/create', {
    templateUrl: 'modules/beauty/create.html',
    controller: 'ViewBeautyCreateCtrl'
  }).when('/beauty/create/images/:id', {  //need id from page1
    templateUrl: 'modules/beauty/images.html',
    controller: 'ViewBeautyImagesCtrl'
  }).when('/beauty/search', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })
  .when('/beauty/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })
  .when('/beauty/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })  
  .when('/beauty/search/:page/:keyword', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })  
  .when('/beauty/search/:page', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })
  .when('/beauty/search', {
    templateUrl: 'modules/beauty/search.html',
    controller: 'ViewBeautySearchCtrl'
  })
  ;
}])

.controller('ViewBeautyCtrl', ['$scope', function($scope) {

}])
.controller('ViewBeautySearchCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
    $scope.frm = {};
    $scope.frm.radius = 30;
    //location starts
    $scope.mapOptions = {
        types: 'geocode'
    };
    $scope.details = {};
    $scope.details.components = {};
    //location ends
    console.log($routeParams);
    $scope.frm = {};    
    // update $scope.frm from $routeParams
    // This is how the parameters from url get to API url[in getData()] through $scope.frm.
    $scope.frm.page = $routeParams.page? $routeParams.page : 0;
    if ($routeParams.keyward) {
        $scope.frm.keyward = $routeParams.keyward;
    }
    $scope.frm.radius = 30;
  if ($routeParams.radius) {
    $scope.frm.radius = $routeParams.radius;
  }
    if ($routeParams.lat) {
        $scope.details.components.lat = $routeParams.lat;
    }
    if ($routeParams.lng) {
        $scope.details.components.lng = $routeParams.lng;
    }
  if ($routeParams.location) {
    $scope.location = decodeURIComponent($routeParams.location);
  }
    // update ends  
    $scope.results = {};
  function successGetData(response) {
    console.log('success: ', response.data.data.results);
      $scope.results = response.data.data.results;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
    
    $scope.getData = function() {
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/chris/beauty';
        if ($scope.frm.keyword) {
            url = url + '&q=' + encodeURIComponent($scope.frm.keyword);
        }
        if ($scope.location) {
            url = url + '&lat=' + encodeURIComponent($scope.details.components.lat);
            url = url + '&lon=' + encodeURIComponent($scope.details.components.lon);
            url = url + '&radius=' + encodeURIComponent($scope.details.radius);
        }
        url = url + '&page=' + $scope.frm.page;
        dataService.get(url, successGetData, failureGetData, true);
    };//get data ends
  
  $scope.getData();//get data on page load
  $scope.constructURL = function() {
      console.log($scope.frm);
      
      var url = '/beauty/search/0';
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
.controller('ViewBeautyCreateCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
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
    $location.path('/beauty/create/images/'+response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
    $scope.submitCreateForm = function() {
        //url
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/chris/beauty&tid=1';
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
}]).controller('ViewBeautyImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
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