'use strict';

angular.module('myApp.students', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  .when('/students/create', {
    templateUrl: 'modules/students/create.html',
    controller: 'ViewStudentsCreateCtrl'
  })
  .when('/students/edit/:id', {
    templateUrl: 'modules/students/create.html',
    controller: 'ViewStudentsEditCtrl'
  })
  .when('/students/create/images/:id', {
    templateUrl: 'modules/students/images.html',
    controller: 'ViewStudentsImagesCtrl'
  })
  .when('/students/create/imagesUpload/:id', {
    templateUrl: 'modules/students/imageUpload.html',
    controller: 'ViewStudentsImageUploadCtrl'
  }).when('/students/create/youtube/:id', {
    templateUrl: 'modules/students/youtube.html',
    controller: 'ViewStudentsYoutubeCtrl'
  }).when('/students/create/links/:id', {
    templateUrl: 'modules/students/links.html',
    controller: 'ViewStudentsLinksCtrl'
  })
  
  //search and browse
  
  // '/students/search'
  // '/students/search/0'
  // '/students/search/0/keyword'
  // '/students/search/0/lat/lng/radius/location'
  // '/students/search/0/keyword/lat/lng/radius/location'
  
  .when('/students/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  
  .when('/students/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  
  .when('/students/search/:page/:keyword', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  .when('/students/search/:page', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  
  .when('/students/search', {
    templateUrl: 'modules/students/search.html',
    controller: 'ViewStudentsSearchCtrl'
  })
  .when('/students/detail/:id', {
    templateUrl: 'modules/students/detail.html',
    controller: 'ViewStudentsDetailCtrl'
  })
  
  
  .when('/students/my/:page', {
    templateUrl: 'modules/students/my.html',
    controller: 'ViewStudentsMyProfileCtrl'
  })
  .when('/students/my', {
    templateUrl: 'modules/students/my.html',
    controller: 'ViewStudentsMyProfileCtrl'
  })
  
  ;
}])


.controller('ViewStudentsImageUploadCtrl', ['$scope', 'dataService', '$location', '$routeParams', 'FileUploader', function($scope, dataService, $location, $routeParams, FileUploader) {
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  
  var requestUrl = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=upload&access_token='+access_token+'&id='+$routeParams.id;
  var uploader = $scope.uploader = new FileUploader({
      url: requestUrl
  });
  // FILTERS

  uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  });

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };
  
}])


.controller('ViewStudentsYoutubeCtrl', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  $scope.youtubeUrls = [];
  
  function getSuccess(response) {
    //console.log('success: ', response);
    
    if (response.data && response.data.data && response.data.data.detailsFull && response.data.data.detailsFull.youtube) {
      angular.forEach(response.data.data.detailsFull.youtube, function(value, key) {
        $scope.youtubeUrls.push(value);
      });
      //console.log($scope.youtubeUrls);
    }
  }
  
  function getFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.getYoutube = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
    dataService.get(url, getSuccess, getFailure);
  };
  
  $scope.getYoutube();
  
  function addSuccess(response) {
    //console.log('success: ', response);
    $scope.youtubeUrls = [];
    $scope.getYoutube();
    $scope.frm = {};
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.addYoutube = function() {
    if (!$scope.frm.youtube) {
      return; 
    }
    
    
      var submitData = '';
      submitData = submitData + '&param='+encodeURIComponent($scope.frm.youtube);
      //url
      var access_token = $scope.userData.token;
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+access_token+'&key=youtube&id='+$routeParams.id;
      dataService.post(url, submitData, addSuccess, addFailure);
  };
}])
.controller('ViewStudentsLinksCtrl', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  $scope.linkUrls = [];
  
  function getSuccess(response) {
    //console.log('success: ', response);
    
    if (response.data && response.data.data && response.data.data.detailsFull && response.data.data.detailsFull.links) {
      angular.forEach(response.data.data.detailsFull.links, function(value, key) {
        $scope.linkUrls.push(value);
      });
      //console.log($scope.linkUrls);
    }
  }
  
  function getFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.getLinks = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
    dataService.get(url, getSuccess, getFailure);
  };
  
  $scope.getLinks();
  
  function addSuccess(response) {
    //console.log('success: ', response);
    $scope.linkUrls = [];
    $scope.getLinks();
    $scope.frm = {};
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.addLink = function() {
    if (!$scope.frm.linkUrl) {
      return; 
    }
    
    
      var submitData = '';
      submitData = submitData + '&param='+encodeURIComponent($scope.frm.linkUrl);
      //url
      var access_token = $scope.userData.token;
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+access_token+'&key=links&id='+$routeParams.id;
      dataService.post(url, submitData, addSuccess, addFailure);
  };
}])

.controller('ViewStudentsDetailCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.results = {};
  
  $scope.setImage = function(image) {
    $scope.results.mainImage = image;
  };

  function getSuccess(response) {
    $scope.results = response.data.data;
    
    var images = $scope.results.detailsFull.images;
    $scope.images = images;
    if (images) {
      angular.forEach(images, function(value1, key1) {
        if (!$scope.results.mainImage) {
          $scope.results.mainImage = value1;
        }//end if
      });//end foreach
    }//end if
    
    if (!$scope.results.mainImage) {
      $scope.results.mainImage = 'images/noimage.jpg';
    }//end if
    
    
    $scope.youtubeUrls = [];
    $scope.linkUrls = [];
    if (response.data && response.data.data && response.data.data.detailsFull && response.data.data.detailsFull.youtube) {
      angular.forEach(response.data.data.detailsFull.youtube, function(value, key) {
        $scope.youtubeUrls.push(value);
      });
      angular.forEach(response.data.data.detailsFull.links, function(value, key) {
        $scope.linkUrls.push(value);
      });
    }
    
    
    //console.log($scope.results);
  }
  
  function getFailure(response) {
    console.log('failed: ', response);
  }
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&id='+$routeParams.id;
  dataService.get(url, getSuccess, getFailure, true);
  
  $scope.goBack = function() {
    window.history.back();
  };
  
  
}])

.controller('ViewStudentsMyProfileCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  

  
  $scope.frm = {};
  
  
  $scope.frm.urlPrefix = 'students/my';
  $scope.frm.urlSufix = '';
  
  
  //initialize the value of page, i.e. default value
  $scope.frm.page = 0;
  
  //page from url, if something coming from url, i will use that
  if ($routeParams.page) {
    $scope.frm.page = $routeParams.page;
  }
  //page
  
  $scope.results = null;
  
  
  function successGetData(response) {
    //console.log('success: ', response);
    $scope.results = response.data.data.results;
    //create the mainImage
    angular.forEach($scope.results, function(value, key) {
      var images = value.detailsFull.images;
      if (images) {
        angular.forEach(images, function(value1, key1) {
          if (!$scope.results[key].mainImage) {
            $scope.results[key].mainImage = value1;
          }//end if
        });//end foreach
      }//end if
      
      if (!$scope.results[key].mainImage) {
        $scope.results[key].mainImage = 'images/noimage.jpg';
      }//end if
    });//end foreach
    //image ends
    $scope.data = response.data.data;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
  }
  
  $scope.getData = function() {
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=my&showLocation=1&path=/manny/students&max=4&noCache=1';
    
    
    url = url + '&page=' + $scope.frm.page;
    var access_token = $scope.userData.token;
    url = url + '&access_token='+access_token;
    dataService.get(url, successGetData, failureGetData, false);
  };//get data ends
  
  $scope.getData();//get data on page load
}])



.controller('ViewStudentsSearchCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  $scope.title = 'Students';
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  $scope.details.components = {};
  //location ends
  
  $scope.frm = {};
  
  
  $scope.frm.urlPrefix = 'students/search';
  $scope.frm.urlSufix = '';
  
  $scope.loading = false;
  
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
    
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.keyword;
  }
  
  $scope.frm.radius = 30;
  
  
  if ($routeParams.lat) {
    $scope.details.components.lat = $routeParams.lat;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lat;
  }
  
  if ($routeParams.lng) {
    $scope.details.components.lng = $routeParams.lng;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lng;
  }
 
  if ($routeParams.radius) {
     $scope.frm.radius = $routeParams.radius;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.radius;
  }
  
  if ($routeParams.location) {
    $scope.location = decodeURIComponent($routeParams.location);
    
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.location;
  }
  
  $scope.results = null;
  
  
  function successGetData(response) {
    //console.log('success: ', response);
    $scope.results = response.data.data.results;
    $scope.loading = false;
    
    //create the mainImage
    angular.forEach($scope.results, function(value, key) {
      var images = value.detailsFull.images;
      if (images) {
        angular.forEach(images, function(value1, key1) {
          if (!$scope.results[key].mainImage) {
            $scope.results[key].mainImage = value1;
          }//end if
        });//end foreach
      }//end if
      
      if (!$scope.results[key].mainImage) {
        $scope.results[key].mainImage = 'images/noimage.jpg';
      }//end if
    });//end foreach
    //image ends
    
    
    $scope.data = response.data.data;
  }
  
  function failureGetData(response) {
    console.log('failed: ', response);
    $scope.loading = false;
  }
  
  $scope.getData = function() {
    $scope.loading = true;
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&max=12';
    
    
    var path = '/manny/students';
    url = url + '&path=' + path;
    
    //check the keyword
    if ($scope.frm.keyword) {
      url = url + '&q=' + encodeURIComponent($scope.frm.keyword); 
    }
    
    //check the location
    if ($scope.location) {
      url = url + '&lat='+$scope.details.components.lat+'&lon='+$scope.details.components.lng+'&r='+encodeURIComponent($scope.frm.radius);
    }
    
    url = url + '&page=' + $scope.frm.page;
    //console.log(url);
    dataService.get(url, successGetData, failureGetData, true);
  };//get data ends
  
  $scope.getData();//get data on page load
  
  
  /*Purpose of search data is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
  $scope.constructURL = function() {
    var url = '/students/search/0';
    
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
  };
}])

.controller('ViewStudentsCreateCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
  $scope.createStatus = null;
  $scope.frm = {};
  
  function addSuccess(response) {
    //console.log('success: ', response);
    //console.log('id is : ', response.data.data.id);
    $scope.frm = {};
    $location.path('/students/create/imagesUpload/'+response.data.data.id);
  }
  
  function addFailure(response) {
    $scope.createStatus = 'Something went wrong, please try again';
    //console.log('failure: ', response);
  }
  
  $scope.submitCreateForm = function() {
      if (!$scope.location) {
        $scope.createStatus = 'Please enter location';
        return; 
      }
      if (!$scope.frm.title) {
        $scope.createStatus = 'Please enter title';
        return; 
      }
      if (!$scope.frm.description) {
        $scope.createStatus = 'Please enter description';
        return; 
      }
      if (!$scope.frm.tags) {
        $scope.createStatus = 'Please enter subjects';
        return; 
      }
     //call api service to submit the form
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.userData.token+'&path=/manny/students&tid=1';
     
    //console.log(url);
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
    postData = postData + '&location[formatted_addr]='+encodeURIComponent($scope.location);
    
    postData = postData + '&tags='+encodeURIComponent($scope.frm.tags);
    
    postData = postData + '&data[gender]='+encodeURIComponent($scope.frm.gender);
    
    //console.log(postData);
    dataService.post(url, postData, addSuccess, addFailure);
  };
}])


.controller('ViewStudentsEditCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  $scope.frm = {};
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  $scope.details.components = {};
  //location ends
  
  function successGetData(response) {
    //console.log('success1: ', response);
    if (response.data.data.uid !== $scope.userData.uid) {
      //if logged in users data does not match with current records data, then send user to my profile
      $location.path('/students/my');
      return;
    }
    
    $scope.frm.title = response.data.data.title;
    $scope.frm.description = response.data.data.description;
    $scope.frm.tags = response.data.data.detailsFull.tagsSingle;
    $scope.frm.gender = response.data.data.detailsFull.gender;
    $scope.location = response.data.data.location.formatted_addr;
    
    
    $scope.details.components.lat = response.data.data.location.latitude;
    $scope.details.components.lng = response.data.data.location.longitude;
    $scope.details.components.country = response.data.data.location.country;
    $scope.details.components.state = response.data.data.location.state;
    $scope.details.components.city = response.data.data.location.city;
    $scope.details.components.postal_code = response.data.data.location.postal_code;
    $scope.details.place_id = response.data.data.location.place_id;
    $scope.details.components.county = response.data.data.location.county;
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
  
  function addSuccess(response) {
    $scope.frm = {};
    $location.path('/students/create/imagesUpload/'+$routeParams.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
  $scope.submitCreateForm = function() {
     //call api service to submit the form
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=update&saveIP=1&access_token='+$scope.userData.token+'&path=/manny/students&tid=1&id='+$routeParams.id;

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
    postData = postData + '&location[formatted_addr]='+encodeURIComponent($scope.location);
    
    postData = postData + '&tags='+encodeURIComponent($scope.frm.tags);
    
    postData = postData + '&data[gender]='+encodeURIComponent($scope.frm.gender);
    dataService.post(url, postData, addSuccess, addFailure);
  };
}])

.controller('ViewStudentsImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.id = $routeParams.id;
  
  
  
  //get Data part
  $scope.images = null;
  function successGetData(response) {
    //console.log('success: ', response);
    
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
  
  
  
  //add Image in database
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
    //console.log($scope.frm);
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.userData.token+'&key=images&id='+$routeParams.id;
    var postData = '';
    postData = postData + '&param='+encodeURIComponent($scope.frm.image);
    
    //console.log(url);
    //console.log(postData);  
    
    dataService.post(url, postData, addImageSuccess, addImageFailure);


  };//add image function ends
  //ends add Image in database
  
  
  $scope.deleteImage = function(k) {
    //console.log(k);
    var a = confirm('Do you really want to delete this image');
    if (!a) return;
    
    //do api call
  };
  
}])


;