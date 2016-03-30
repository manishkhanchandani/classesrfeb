'use strict';
// this is a sub module
angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewLessonsCreateCtrl'
  }).when('/lessons/create/images/:id', {  //need id from page1
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewLessonsImagesCtrl'
  }).when('/lessons/search', {//search $ browse
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })
  //search and browse, plus paging of results
  //all using the same ctrl
  // '/lessons/search'
  // '/lessons/search/0'
  // '/lessons/search/0/keyword'
  // '/lessons/search/0/lat/lng/radius
  // '/lessons/search/0/keyword/lat/lng/radius'
  
  .when('/lessons/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })
  .when('/lessons/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })  
  .when('/lessons/search/:page/:keyword', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })  
  .when('/lessons/search/:page', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })
  .when('/lessons/search', {
    templateUrl: 'modules/lessons/search.html',
    controller: 'ViewLessonsSearchCtrl'
  })
  .when('/lessons/detail/:id', {
    templateUrl: 'modules/lessons/detail.html',
    controller: 'ViewLessonsDetailCtrl'
  })
  ;
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {

}])
.controller('ViewLessonsDetailCtrl', ['$scope', function($scope) {

}])
.controller('ViewLessonsSearchCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
    //location starts
    $scope.mapOptions = {
        types: 'geocode'
    };
    $scope.details = {};
    $scope.details.components = {};
    //location ends
    
    console.log($routeParams);
    $scope.frm = {};
    $scope.frm.urlPrefix = '#/lessons/search';  //before 0
    $scope.frm.urlSufix = '';  //after 0
      // update $scope.frm from $routeParams
    // This is how the parameters from url get to API url[in getData()] through $scope.frm.
  
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
    $scope.frm.keyword = decodeURIComponent($routeParams.keyword);
    $scope.frm.urlSufix =$scope.frm.urlSufix + '/' + encodeURIComponent($routeParams.keyword);
  }
    if ($routeParams.lat) {
        $scope.details.components.lat = $routeParams.lat;
    $scope.frm.urlSufix =$scope.frm.urlSufix + '/' + $routeParams.lat;
    }
    if ($routeParams.lng) {
        $scope.details.components.lng = $routeParams.lng
    $scope.frm.urlSufix =$scope.frm.urlSufix + '/' + $routeParams.lng;
    }
    
    $scope.frm.radius = 30;
  if ($routeParams.radius) {
    $scope.frm.radius = $routeParams.radius;
      
    $scope.frm.urlSufix =$scope.frm.urlSufix + '/' + $routeParams.radius;
  }
  if ($routeParams.location) {
    $scope.location = decodeURIComponent($routeParams.location);
    $scope.frm.urlSufix =$scope.frm.urlSufix + '/' + $routeParams.location;
  }
    
    $scope.results = {};
  function successGetData(response) {
    console.log('success: ', response.data.data.results);
      $scope.results = response.data.data.results;
      // create the mainImage
      angular.forEach($scope.results, function(value, key) {
          // value == $scope.results[key]
          var images = value.detailsFull.images;
          if (images) {
              angular.forEach(images, function(value1, key1) {
                  // value1 == images[key1];
                  // use the first image
                  if (!$scope.results[key].mainImage) {
                    $scope.results[key].mainImage = value1;  
                  }
              });
          }
          if (!$scope.results[key].mainImage) {
              $scope.results[key].mainImage = 'img/noimage.jpg';
          }
      });
      $scope.data = response.data.data;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
    
    $scope.getData = function() {
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/chris/lessons&max=2';
        if ($scope.frm.keyword) {
            url = url + '&q=' + encodeURIComponent($scope.frm.keyword);
        }
        if ($scope.location) {
            url = url + '&lat=' + encodeURIComponent($scope.details.components.lat);
            url = url + '&lon=' + encodeURIComponent($scope.details.components.lng);
            url = url + '&radius=' + encodeURIComponent($scope.frm.radius);
        }
        url = url + '&page=' + $scope.frm.page;
        dataService.get(url, successGetData, failureGetData, true);
    };//get data ends
  
  $scope.getData();//get data on page load

  /*Purpose of search data is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
    // renamed it to constructURL.
  $scope.constructURL = function() {
      console.log($scope.frm);
      
      var url = '/lessons/search/0';
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
.controller('ViewLessonsCreateCtrl', ['$scope','$location', 'dataService', function($scope, $location, dataService) {
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
//        console.log($scope.loggedInUsersData);
//        console.log($scope.frm);
//        console.log($scope.details);
        //url
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/chris/lessons&tid=1';
        console.log(url);
        //postdata
/*&title=This+is+title&path=/test&tid=1&location[latitude]=37.7974273&location[longitude]=-121.21605260000001&location[country]=United+States&location[state]=CA&location[city]=Manteca&location[zip]=&location[place_id]=ChIJCUWMJENAkIARjMxOe6Wp4p0&location[county]=San+Joaquin+County&location[formatted_addr]=Manteca,+CA,+United+States&tags=a,b,c&description=some+description

&data[gender]=Male
&data[profession]=engineer
&data[education]=masters*/
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

        // redirect, using dummy id for mow
        //$location.path('/lessons/create/images/1');
    };
}])
.controller('ViewLessonsImagesCtrl',  ['$scope', '$location', 'dataService', '$routeParams',function($scope, $location, dataService, $routeParams) {
  
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