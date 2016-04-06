'use strict';

angular.module('myApp.lessons', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  .when('/lessons/create', {
    templateUrl: 'modulesFB/lessons/create.html',
    controller: 'ViewCreateCtrlFB'
  })
  .when('/lessons/edit/:id', {
    templateUrl: 'modulesFB/lessons/create.html',
    controller: 'ViewEditCtrlFB'
  })
  .when('/lessons/create/images/:id', {
    templateUrl: 'modulesFB/lessons/images.html',
    controller: 'ViewImagesCtrlFB'
  })
  .when('/lessons/create/imagesUpload/:id', {
    templateUrl: 'modulesFB/lessons/imageUpload.html',
    controller: 'ViewImageUploadLessonsCtrlFB'
  }).when('/lessons/create/youtube/:id', {
    templateUrl: 'modulesFB/lessons/youtube.html',
    controller: 'ViewYoutubeLessonsCtrlFB'
  }).when('/lessons/create/links/:id', {
    templateUrl: 'modulesFB/lessons/links.html',
    controller: 'ViewLinksLessonsCtrlFB'
  })
  
  //search and browse
  
  // '/lessons/search'
  // '/lessons/search/0'
  // '/lessons/search/0/keyword'
  // '/lessons/search/0/lat/lng/radius/location'
  // '/lessons/search/0/keyword/lat/lng/radius/location'
  
  .when('/lessons/search/:page/:keyword/:lat/:lng/:radius/:location', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  
  
  .when('/lessons/search/:page/:lat/:lng/:radius/:location', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  
  
  .when('/lessons/search/:page/:keyword', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  
  .when('/lessons/search/:page', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  
  .when('/lessons/search', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchCtrlFB'
  })
  .when('/lessons/detail/:id', {
    templateUrl: 'modulesFB/lessons/detail.html',
    controller: 'ViewDetailCtrlFB'
  })
  
  
  .when('/lessons/my/:page', {
    templateUrl: 'modulesFB/lessons/my.html',
    controller: 'ViewMyProfileCtrlFB'
  })
  .when('/lessons/my', {
    templateUrl: 'modulesFB/lessons/my.html',
    controller: 'ViewMyProfileCtrlFB'
  })
  
  ;
}])


.controller('ViewImageUploadLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', 'FileUploader', function($scope, dataService, $location, $routeParams, FileUploader) {
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  var requestUrl = $scope.config.apiUrl + 'records.php?action=uploadOnly&access_token='+access_token+'&id='+$routeParams.id;
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
      $scope.tutorsRecord.child($scope.id).child('details').child('images').child(response.data.paramsKey).set(response.data.param);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };
  
}])


.controller('ViewYoutubeLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  
  
  $scope.current = null;
  $scope.youtubeUrls = null;
  
  $scope.resetData = function() {
    $scope.current = $scope.tutorsArr.$getRecord($scope.id);
    $scope.youtubeUrls = $scope.current.details.youtubeUrls;
  };
  
  $scope.tutorsArr.$loaded().then(function (arr) {
    $scope.resetData();
  });
  
  $scope.addYoutube = function() {
    if (!$scope.frm.youtube) {
      return; 
    }
    
      $scope.tutorsRecord.child($scope.id).child('details').child('youtubeUrls').child(md5($scope.frm.youtube)).set($scope.frm.youtube);
      $scope.resetData();
      $scope.frm.youtube = '';
  };
}])
.controller('ViewLinksLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  
  $scope.current = null;
  $scope.linkUrls = {};
  
  $scope.resetData = function() {
    $scope.current = $scope.tutorsArr.$getRecord($scope.id);
    $scope.linkUrls = $scope.current.details.linkUrls;
  };
  
  $scope.tutorsArr.$loaded().then(function (arr) {
    $scope.resetData();
  });
  
  
  $scope.addLink = function() {
    if (!$scope.frm.linkUrl) {
      return; 
    }
    
      $scope.tutorsRecord.child($scope.id).child('details').child('linkUrls').child(md5($scope.frm.linkUrl)).set($scope.frm.linkUrl);
      $scope.resetData();
      $scope.frm.linkUrl = '';
    
  };
}])

.controller('ViewDetailCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
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
  
  var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&tid='+dataService.tid()+'&id='+$routeParams.id;
  dataService.get(url, getSuccess, getFailure, true);
  
  $scope.goBack = function() {
    window.history.back();
  };
  
  
}])

.controller('ViewMyProfileCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  
  $scope.searchStatus = null;
  
  $scope.frm = {};
  
  
  $scope.frm.urlPrefix = 'lessons/my';
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
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=my&showLocation=1&tid='+dataService.tid()+'&path=/manny/lessons&noCache=1';
    
    
    url = url + '&page=' + $scope.frm.page;
    var access_token = $scope.userData.token;
    url = url + '&access_token='+access_token;
    dataService.get(url, successGetData, failureGetData, false);
  };//get data ends
  
  $scope.getData();//get data on page load
  
  function deleteSuccess(response) {
    $scope.getData();
  }
  
  function deleteFailure(response) {
    console.log('failure: ', response);
  }

  $scope.deleteProfile = function(itemDetail) {
    var a = confirm('do you really want to delete this profile');
    if (!a) return;
    var access_token = $scope.userData.token;
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=delete&tid='+dataService.tid()+'&id='+itemDetail.id+'&access_token='+access_token;
    dataService.get(url, deleteSuccess, deleteFailure, false);
  };
}])



.controller('ViewSearchCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.title = 'Teachers';
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  $scope.frm.details.components = {};
  //location ends
  
  
  
  $scope.frm.urlPrefix = 'lessons/search';
  $scope.frm.urlSufix = '';
  
  $scope.loading = false;
  
  //initialize the value of page, i.e. default value
  /*Purpose of search data is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
  $scope.constructURL = function() {
    var url = '/lessons/search/0';
    
    if ($scope.frm.keyword) {
      url = url + '/' + encodeURIComponent($scope.frm.keyword);
    }
    
    if ($scope.frm.location) {
      if (!$scope.frm.radius) {
        $scope.frm.radius = 30;
      }
      
      url = url + '/' + $scope.frm.details.components.lat + '/' + $scope.frm.details.components.lng + '/' + encodeURIComponent($scope.frm.radius) + '/' + encodeURIComponent($scope.frm.location);
    }
    
    $location.path(url);
  };
  
  
  
  
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
    $scope.frm.details.components.lat = $routeParams.lat;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lat;
  }
  
  if ($routeParams.lng) {
    $scope.frm.details.components.lng = $routeParams.lng;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lng;
  }
 
  if ($routeParams.radius) {
     $scope.frm.radius = $routeParams.radius;
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.radius;
  }
  
  if ($routeParams.location) {
    $scope.frm.location = decodeURIComponent($routeParams.location);
    
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
    var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&tid='+dataService.tid()+'&showLocation=1';
    
    
    var path = '/manny/lessons';
    url = url + '&path=' + path;
    
    //check the keyword
    if ($scope.frm.keyword) {
      url = url + '&q=' + encodeURIComponent($scope.frm.keyword); 
    }
    
    //check the location
    if ($scope.frm.location) {
      url = url + '&lat='+$scope.frm.details.components.lat+'&lon='+$scope.frm.details.components.lng+'&r='+encodeURIComponent($scope.frm.radius);
    }
    
    url = url + '&page=' + $scope.frm.page;
    //console.log(url);
    dataService.get(url, successGetData, failureGetData, true);
  };//get data ends
  
  $scope.getData();//get data on page load
  
  
}])

.controller('ViewCreateCtrlFB', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
  $scope.createStatus = null;
  $scope.frm = {};
  
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
 
    var postData = {};
    postData.title = $scope.frm.title;
    postData.description = $scope.frm.description;
    postData.location = {};
    postData.location.latitude = $scope.details.components.lat;
    postData.location.longitude = $scope.details.components.lng;
    postData.location.country = $scope.details.components.country;
    postData.location.state = $scope.details.components.state;
    postData.location.city = $scope.details.components.city;
    postData.location.zip = $scope.details.components.postal_code;
    postData.location.place_id = $scope.details.place_id;
    postData.location.county = $scope.details.components.county;
    postData.location.formatted_addr = $scope.details.formatted_address;
    postData.tags = $scope.frm.tags;
    postData.details = {};
    postData.details.gender = ($scope.frm.gender) ? $scope.frm.gender : '';
    postData.details.age = ($scope.frm.age) ? $scope.frm.age : '';
    postData.details.email = ($scope.frm.email) ? $scope.frm.email : '';
    postData.details.phone = ($scope.frm.phone) ? $scope.frm.phone : '';
    postData.details.pref_email = ($scope.frm.pref_email) ? $scope.frm.pref_email : false;
    postData.details.pref_phone_text = ($scope.frm.pref_phone_text) ? $scope.frm.pref_phone_text : false;
    postData.details.pref_phone_call = ($scope.frm.pref_phone_call) ? $scope.frm.pref_phone_call : false;
    postData.details.charges = $scope.frm.charges;
    postData.details.charge_explanation = $scope.frm.charge_explanation;
    postData.details.location = $scope.location;
    postData.uid = $scope.userData.id;
    postData.timestamp = Firebase.ServerValue.TIMESTAMP;

    $scope.tutorsArr.$add(postData).then(function(response) {
       var id = response.key();
       console.log('id: ', id);
       //save location
        $scope.tutorsLocation.child(btoa(postData.location.country)).child(btoa(postData.location.state)).child(btoa(postData.location.county)).child(id).set(true);
        if (postData.tags) {
          var tmp = postData.tags.split(',');
          angular.forEach(tmp, function(value, key) {
            var val = value.replace(/^\s+|\s+$/g, '');
            val = val.toLowerCase();
            $scope.tutorsTags.child(btoa(val)).child(btoa(postData.location.country)).child(btoa(postData.location.state)).child(btoa(postData.location.county)).child(id).set(true);
          });
        }//end if
        //location ends
       $scope.frm = {};
       $location.path('/lessons/create/imagesUpload/'+id);
    });
  };
}])


.controller('ViewEditCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  $scope.frm = {};
  $scope.id = $routeParams.id;
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  $scope.details.components = {};
  //location ends
  
  $scope.current = null;
  
  $scope.resetData = function() {
    $scope.current = $scope.tutorsArr.$getRecord($scope.id);
    if ($scope.current.uid !== $scope.userData.uid) {
      $location.path('/lessons/my');
      return;
    }//end if
    
    $scope.frm.title = $scope.current.title;
    $scope.frm.description = $scope.current.description;
    $scope.frm.tags = $scope.current.tags;
    $scope.frm.gender = $scope.current.details.gender;
    $scope.frm.age = parseInt($scope.current.details.age);
    $scope.frm.email = $scope.current.details.email;
    $scope.frm.phone = $scope.current.details.phone;
    $scope.frm.pref_email = ($scope.current.details.pref_email === true) ? true : false;
    $scope.frm.pref_phone_text = ($scope.current.details.pref_phone_text === true) ? true : false;
    $scope.frm.pref_phone_call = ($scope.current.details.pref_phone_call === true) ? true : false;
    $scope.frm.charges = parseInt($scope.current.details.charges);
    $scope.frm.charge_explanation = $scope.current.details.charge_explanation;
    
    $scope.location = $scope.current.details.location;
    
    
    $scope.details.components.lat = $scope.current.location.latitude;
    $scope.details.components.lng = $scope.current.location.longitude;
    $scope.details.components.country = $scope.current.location.country;
    $scope.details.components.state = $scope.current.location.state;
    $scope.details.components.city = $scope.current.location.city;
    $scope.details.components.postal_code = ($scope.current.location.postal_code) ? $scope.current.location.postal_code : '';
    $scope.details.place_id = $scope.current.location.place_id;
    $scope.details.components.county = $scope.current.location.county;
    $scope.details.formatted_address = $scope.current.location.formatted_addr;
  };
  
  $scope.tutorsArr.$loaded().then(function (arr) {
    $scope.resetData();
  });
  
  
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
 
    //delete previous location
    //save location
    $scope.tutorsLocation.child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).remove();
    var tmp = $scope.current.tags.split(',');
    angular.forEach(tmp, function(value, key) {
      var val = value.replace(/^\s+|\s+$/g, '');
      val = val.toLowerCase();
      $scope.tutorsTags.child(btoa(val)).child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).remove();
    });
    //location ends
    //delete previous location
    $scope.current.title = $scope.frm.title;
    $scope.current.description = $scope.frm.description;
    $scope.current.location.latitude = $scope.details.components.lat;
    $scope.current.location.longitude = $scope.details.components.lng;
    $scope.current.location.country = $scope.details.components.country;
    $scope.current.location.state = $scope.details.components.state;
    $scope.current.location.city = $scope.details.components.city;
    $scope.current.location.zip = $scope.details.components.postal_code;
    $scope.current.location.place_id = $scope.details.place_id;
    $scope.current.location.county = $scope.details.components.county;
    $scope.current.location.formatted_addr = $scope.details.formatted_address;
    $scope.current.tags = $scope.frm.tags;
    $scope.current.details.gender = ($scope.frm.gender) ? $scope.frm.gender : '';
    $scope.current.details.age = ($scope.frm.age) ? $scope.frm.age : '';
    $scope.current.details.email = ($scope.frm.email) ? $scope.frm.email : '';
    $scope.current.details.phone = ($scope.frm.phone) ? $scope.frm.phone : '';
    $scope.current.details.pref_email = ($scope.frm.pref_email) ? $scope.frm.pref_email : false;
    $scope.current.details.pref_phone_text = ($scope.frm.pref_phone_text) ? $scope.frm.pref_phone_text : false;
    $scope.current.details.pref_phone_call = ($scope.frm.pref_phone_call) ? $scope.frm.pref_phone_call : false;
    $scope.current.details.charges = $scope.frm.charges;
    $scope.current.details.charge_explanation = $scope.frm.charge_explanation;
    $scope.current.details.location = $scope.location;
    $scope.current.updated = Firebase.ServerValue.TIMESTAMP;
    $scope.tutorsArr.$save($scope.current).then(function(response) {
        //save location
        $scope.tutorsLocation.child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).set(true);
        if ($scope.current.tags) {
          var tmp = $scope.current.tags.split(',');
          angular.forEach(tmp, function(value, key) {
            var val = value.replace(/^\s+|\s+$/g, '');
            val = val.toLowerCase();
            $scope.tutorsTags.child(btoa(val)).child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).set(true);
          });
        }//end if
        //location ends
        $location.path('/lessons/create/imagesUpload/'+$routeParams.id);
    });
  };
}])

.controller('ViewImagesCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  $scope.id = $routeParams.id;
  
  $scope.current = null;
  $scope.images = null;
  
  $scope.resetData = function() {
    $scope.current = $scope.tutorsArr.$getRecord($scope.id);
    $scope.images = $scope.current.details.images;
  };
  
  $scope.tutorsArr.$loaded().then(function (arr) {
    $scope.resetData();
  });
  
  $scope.addImage = function() {
      $scope.tutorsRecord.child($scope.id).child('details').child('images').child(md5($scope.frm.image)).set($scope.frm.image);
      $scope.resetData();
      $scope.frm.image = '';
  };//add image function ends
  //ends add Image in database
  
  
  $scope.deleteImage = function(k) {
    var a = confirm('Do you really want to delete this image');
    if (!a) return;
    
    $scope.tutorsRecord.child($scope.id).child('details').child('images').child(k).remove();
    $scope.resetData();
    //do api call
  };
  
}])


;