'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateCtrl'
  }).when('/lessons/create/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesCtrl'
  })
   .when('/lessons/search/:page/:keyword/:lat/:lng/:radius', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewSearchCtrl'
  })
  
  
  .when('/lessons/search/:page/:lat/:lng/:radius', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewSearchCtrl'
  })
  
  
  .when('/lessons/search/:page/:keyword', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewSearchCtrl'
  })
  
  .when('/lessons/search/:page', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewSearchCtrl'
  })
  
  .when('/lessons/search', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewSearchCtrl'
  })
  ;
}])

.controller('ViewSearchCtrl', ['$scope','$location','dataService','$routeParams', function($scope,$location,dataService,$routeParams) {
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  $scope.details.components = {};
  //location ends
  
  
  console.log('route param is ', $routeParams);
  $scope.frm = {};
  
  
  //initialize the value of page, i.e. default value
  $scope.frm.page = 0;
  
  //page from url, if something coming from url, i will use that
  if ($routeParams.page) {
    $scope.frm.page = $routeParams.page;
  }
  //page
  
  //default keyword
  $scope.frm.keyword = '';
  
  //check if url has keyword
  if ($routeParams.keyword) {
    $scope.frm.keyword = $routeParams.keyword;
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
  
  console.log('frm is ', $scope.frm);
  
  function successGetData(response) {
    console.log('success: ', response.data.data.results);
    $scope.results = response.data.data.results;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }  
  $scope.getData = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/sumi/lessons';
    //check the keyword
    if ($scope.frm.keyword) {
      url = url + '&q=' + encodeURIComponent($scope.frm.keyword); 
    }
    
    if ($scope.location) {
      url = url + '&lat='+$scope.details.components.lat+'&lon='+$scope.details.components.lng+'&r='+encodeURIComponent($scope.frm.radius);
    }
    
    console.log(url);
    dataService.get(url, successGetData, failureGetData, true);
  };//get data ends
  
  $scope.getData();//get data on page load
  
  $scope.constructURL = function() {
    var url = '/lessons/search/0';
    
    if ($scope.frm.keyword) {
      url = url + '/' + encodeURIComponent($scope.frm.keyword);
    }
    
    if ($scope.location) {
      if (!$scope.frm.radius) {
        $scope.frm.radius = 30;
      }
      
      url = url + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng + '/' + encodeURIComponent($scope.frm.radius);
    }
    
    $location.path(url);
    console.log(url);
  };
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
  
}])

.controller('ViewCreateCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
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
    $location.path('/lessons/create/images/'+response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.submitCreateForm = function() {
     //call api service to submit the form
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/sumi/lessons&tid=1';
     
    console.log(url);
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
    dataService.post(url, postData, addSuccess, addFailure);
  };
}])

.controller('ViewImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.id = $routeParams.id;
  
  
  
  //get Data part
  $scope.images = null;
  function successGetData(response) {
    console.log('success: ', response);
    
    //get images from the server
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
  //end getData part
  //
  //add Image in database
  $scope.frm = {};
  function addImageSuccess(response) {
    console.log('success: ', response);
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


  };//add image function ends
  //ends add Image in database
  
  
  
}])


;