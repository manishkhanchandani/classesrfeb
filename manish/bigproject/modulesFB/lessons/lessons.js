'use strict';

angular.module('myApp.lessons', ['ngRoute', 'angularFileUpload', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  .when('/lessons/create', {
    templateUrl: 'modulesFB/lessons/create.html',
    controller: 'ViewCreateLessonsCtrlFB'
  })
  .when('/lessons/edit/:id', {
    templateUrl: 'modulesFB/lessons/create.html',
    controller: 'ViewEditLessonsCtrlFB'
  })
  .when('/lessons/create/images/:id', {
    templateUrl: 'modulesFB/lessons/images.html',
    controller: 'ViewImagesLessonsCtrlFB'
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
  // '/lessons/search/0/lat/lng/country/state/county/location'
  // '/lessons/search/0/keyword/lat/lng/country/state/county/location'
  
  .when('/lessons/search/:page/:keyword/:lat/:lng/:country/:state/:county/:location', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  
  
  .when('/lessons/search/:page/:lat/:lng/:country/:state/:county/:location', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  
  
  .when('/lessons/search/:page/:keyword', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  
  .when('/lessons/search/:page', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  
  .when('/lessons/search', {
    templateUrl: 'modulesFB/lessons/search.html',
    controller: 'ViewSearchLessonsCtrlFB'
  })
  .when('/lessons/detail/:id', {
    templateUrl: 'modulesFB/lessons/detail.html',
    controller: 'ViewDetailLessonsCtrlFB'
  })
  
  
  .when('/lessons/my/:page', {
    templateUrl: 'modulesFB/lessons/my.html',
    controller: 'ViewMyProfileLessonsCtrlFB'
  })
  .when('/lessons/my', {
    templateUrl: 'modulesFB/lessons/my.html',
    controller: 'ViewMyProfileLessonsCtrlFB'
  })
  
  ;
}])


.controller('ViewImageUploadLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', 'FileUploader', function($scope, dataService, $location, $routeParams, FileUploader) {
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
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
      obj.owsRecord.child($scope.id).child('details').child('images').child(response.data.paramsKey).set(response.data.param);
  };
  uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
  };
  
}])

.controller('ViewYoutubeLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  
  
  $scope.current = null;
  $scope.youtubeUrls = null;
  
  $scope.resetData = function() {
    $scope.current = obj.owsArr.$getRecord($scope.id);
    $scope.youtubeUrls = $scope.current.details.youtubeUrls;
  };
  
  obj.owsArr.$loaded().then(function (arrR) {
    $scope.resetData();
  });
  
  $scope.addYoutube = function() {
    if (!$scope.frm.youtube) {
      return; 
    }
    
      obj.owsRecord.child($scope.id).child('details').child('youtubeUrls').child(md5($scope.frm.youtube)).set($scope.frm.youtube);
      $scope.resetData();
      $scope.frm.youtube = '';
  };
  
  
  $scope.deleteYoutube = function(k) {
    var a = confirm('Do you really want to delete this youtube url?');
    if (!a) return;
    
    obj.owsRecord.child($scope.id).child('details').child('youtubeUrls').child(k).remove();
    $scope.resetData();
    //do api call
  };
  
}])

.controller('ViewLinksLessonsCtrlFB', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  //console.log($routeParams);
  var access_token = $scope.userData.token;
  $scope.id = $routeParams.id;
  $scope.frm = {};
  
  $scope.current = null;
  $scope.linkUrls = {};
  
  $scope.resetData = function() {
    $scope.current = obj.owsArr.$getRecord($scope.id);
    $scope.linkUrls = $scope.current.details.linkUrls;
  };
  
  obj.owsArr.$loaded().then(function (arrR) {
    $scope.resetData();
  });
  
  
  $scope.addLink = function() {
    if (!$scope.frm.linkUrl) {
      return; 
    }
    
      obj.owsRecord.child($scope.id).child('details').child('linkUrls').child(md5($scope.frm.linkUrl)).set($scope.frm.linkUrl);
      $scope.resetData();
      $scope.frm.linkUrl = '';
    
  };
  
  
  $scope.deleteLink = function(k) {
    var a = confirm('Do you really want to delete this url?');
    if (!a) return;
    
    obj.owsRecord.child($scope.id).child('details').child('linkUrls').child(k).remove();
    $scope.resetData();
    //do api call
  };
  
}])

.controller('ViewDetailLessonsCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  $scope.results = {};
  $scope.results.mainImage = null;
  obj.owsArr.$loaded().then(function (arrR) {
    $scope.results = obj.owsArr.$getRecord($routeParams.id);
    $scope.images = $scope.results.details.images;
    $scope.youtubeUrls = $scope.results.details.youtubeUrls;
    $scope.linkUrls = $scope.results.details.linkUrls;
    
    if ($scope.results.details.defaultImage) $scope.results.mainImage = $scope.results.details.defaultImage;
    else if ($scope.results.details.images) {
      angular.forEach($scope.results.details.images, function(value, key) {
        if ($scope.results.mainImage) return;
        $scope.results.mainImage = value;
      });
    } else {
      $scope.results.mainImage = 'images/noimage.jpg';  
    }
  });
  
  
  
  $scope.setImage = function(image) {
    $scope.results.mainImage = image;
  };

  $scope.goBack = function() {
    window.history.back();
  };
  
  
}])

.controller('ViewMyProfileLessonsCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  $scope.searchStatus = null;
  $scope.frm = {};
  
  $scope.defaultImage = 'images/noimage.jpg';
  $scope.results = [];
  var keyword = decodeURIComponent($routeParams.keyword);
  var queryRef = obj.owsMy.child($scope.userData.id).orderByValue().limitToLast(500);
  queryRef.on('value', function(snapshot) {
    $scope.results = [];
    angular.forEach(snapshot.val(), function (value, key) {
      obj.owsRecord.child(key).once('value', function(returnVar) {
        var tmp = returnVar.val();
        tmp.id = key;
        $scope.results.push(tmp);
      });
    });
    console.log($scope.results);
    if(!$scope.$$phase) $scope.$apply();
  });

  $scope.deleteProfile = function(itemDetail) {
    var a = confirm('do you really want to delete this profile');
    if (!a) return;
    if (itemDetail.location.county) {
      obj.owsLocation.child(btoa(itemDetail.location.country)).child(btoa(itemDetail.location.state)).child(btoa(itemDetail.location.county)).child(itemDetail.id).remove();
    }
    
    
    if (itemDetail.tags) {
      var tmp = itemDetail.tags.split(',');
      angular.forEach(tmp, function(value, key) {
        var val = value.replace(/^\s+|\s+$/g, '');
        val = val.toLowerCase();
        if (itemDetail.location.county) {
          obj.owsTags.child(btoa(val)).child(btoa(itemDetail.location.country)).child(btoa(itemDetail.location.state)).child(btoa(itemDetail.location.county)).child(itemDetail.id).remove();
        }
        
        obj.owsOnlyTags.child(btoa(val)).child(itemDetail.id).remove();
      });
    }//end if
    
    obj.owsRecord.child(itemDetail.id).remove();
    obj.owsMy.child($scope.userData.id).child(itemDetail.id).remove();
  };
}])

.controller('ViewSearchLessonsCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', '$firebaseArray', function($scope, $location, dataService, $routeParams, $firebaseArray) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  $scope.frm.details.components = {};
  //location ends

  $scope.urlPrefix = 'lessons/search';
  $scope.urlSuffix = '';
  
  $scope.loading = false;
  $scope.defaultImage = 'images/noimage.jpg';
  
  //pagination starts here
  $scope.pagination = {};
  $scope.pagination.maxRows = 100;
  $scope.pagination.pageNum = 0;
  //page from url, if something coming from url, i will use that
  if ($routeParams.page) {
    $scope.pagination.pageNum = parseInt($routeParams.page);
  }
  //page
  
  //default keyword
  $scope.frm.keyword = '';
  
  $scope.pagination.startRow = $scope.pagination.pageNum * $scope.pagination.maxRows;
  
  $scope.pagination.startRowsPlus = $scope.pagination.startRow + 1;
  //pagination ends here

  
  //without any location or keyword
  var query = null;
  
  
  if ($routeParams.keyword) {
    $scope.frm.keyword = decodeURIComponent($routeParams.keyword);
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.keyword;
  }
  
  if ($routeParams.lat) {
    $scope.frm.details.components.lat = $routeParams.lat;
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.lat;
  }
  
  if ($routeParams.lng) {
    $scope.frm.details.components.lng = $routeParams.lng;
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.lng;
  }
  
  if ($routeParams.country) {
    $scope.frm.details.components.country = decodeURIComponent($routeParams.country);
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.country;
  }
  
  if ($routeParams.state) {
    $scope.frm.details.components.state = decodeURIComponent($routeParams.state);
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.state;
  }
  
  if ($routeParams.county) {
    $scope.frm.details.components.county = decodeURIComponent($routeParams.county);
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.county;
  }
  
  if ($routeParams.location) {
    $scope.frm.location = decodeURIComponent($routeParams.location);
    $scope.urlSuffix = $scope.urlSuffix + '/' + $routeParams.location;
  }
  
  $scope.setExtraPagination = function() {
    $scope.pagination.minRows = $scope.pagination.totalRows;
    if (($scope.pagination.startRow + $scope.pagination.maxRows) < $scope.pagination.totalRows) {
      $scope.pagination.minRows = ($scope.pagination.startRow + $scope.pagination.maxRows);
    }
    
    $scope.pagination.prevPage = $scope.pagination.pageNum - 1;
    if (($scope.pagination.pageNum - 1) < 0) {
      $scope.pagination.prevPage = 0;
    }
    
    $scope.pagination.nextPage = ($scope.pagination.pageNum + 1);
    if ($scope.pagination.totalPages < ($scope.pagination.pageNum + 1)) {
      $scope.pagination.nextPage = $scope.pagination.totalPages;
    } 
  };
  
  $scope.orderBy = '-timestamp';
  
  var queryRef = null;
  if ($routeParams.country && $routeParams.state && $routeParams.county) {
    $scope.results = [];
    var country = decodeURIComponent($routeParams.country);
    var state = decodeURIComponent($routeParams.state);
    var county = decodeURIComponent($routeParams.county);
    $scope.orderBy = 'distance';
    var tmpRef = obj.owsLocation;
    if ($routeParams.keyword) {
      var keyword = decodeURIComponent($routeParams.keyword);
      tmpRef = obj.owsTags.child(btoa(keyword));
    }
    queryRef = tmpRef.child(btoa(country)).child(btoa(state)).child(btoa(county)).orderByValue().limitToLast(500);
    queryRef.on('value', function(snapshot) {
      $scope.results = [];
      if (!snapshot.val()) return;
      var size = Object.keys(snapshot.val()).length;
      $scope.pagination.totalRows = size;
      $scope.pagination.totalPages = Math.ceil($scope.pagination.totalRows/$scope.pagination.maxRows)-1;
      //set pagination
      $scope.setExtraPagination();
      
      angular.forEach(snapshot.val(), function (value, key) {
        obj.owsRecord.child(key).once('value', function(returnVar) {
          var tmp = returnVar.val();
          tmp.distance = dataService.distance(parseFloat($routeParams.lat), parseFloat($routeParams.lng), tmp.location.latitude, tmp.location.longitude, 'M');
          $scope.results.push(tmp);
        });
      });
      
      if(!$scope.$$phase) $scope.$apply();
    });
  } else if ($routeParams.keyword) {
    $scope.results = [];
    var keyword = decodeURIComponent($routeParams.keyword);
    queryRef = obj.owsOnlyTags.child(btoa(keyword)).orderByValue().limitToLast(500);
    queryRef.on('value', function(snapshot) {
      var size = Object.keys(snapshot.val()).length;
      $scope.pagination.totalRows = size;
      $scope.pagination.totalPages = Math.ceil($scope.pagination.totalRows/$scope.pagination.maxRows)-1;
      //set pagination
      $scope.setExtraPagination();
      
      $scope.results = [];
      angular.forEach(snapshot.val(), function (value, key) {
        obj.owsRecord.child(key).once('value', function(returnVar) {
          $scope.results.push(returnVar.val());
        });
      });
      
      if(!$scope.$$phase) $scope.$apply();
    });
  } else {
    query = obj.owsRecord.orderByChild("timestamp").limitToLast(500);
    
    $scope.results = $firebaseArray(query);
    $scope.results.$loaded().then(function(arrR) {
      $scope.pagination.totalRows = arrR.length;
      $scope.pagination.totalPages = Math.ceil($scope.pagination.totalRows/$scope.pagination.maxRows)-1;
      
      //set pagination
      $scope.setExtraPagination();
    });
  
  }
  
  //initialize the value of page, i.e. default value
  /*Purpose of search data is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
  $scope.constructURL = function() {
    var url = '/lessons/search/0';
    
    if ($scope.frm.keyword) {
      url = url + '/' + encodeURIComponent($scope.frm.keyword);
    }
    
    if ($scope.frm.location) {
      url = url + '/' + $scope.frm.details.components.lat + '/' + $scope.frm.details.components.lng + '/' + encodeURIComponent($scope.frm.details.components.country) + '/' + encodeURIComponent($scope.frm.details.components.state) + '/' + encodeURIComponent($scope.frm.details.components.county) + '/' + encodeURIComponent($scope.frm.location);
    }

    $location.path(url);
  };
  
  
}])

.controller('ViewCreateLessonsCtrlFB', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.frm = {};
  $scope.frm.details = {};
  //location ends
  
  $scope.createStatus = null;
  
  $scope.submitCreateForm = function() {
      if (!$scope.frm.location) {
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
    postData.location.latitude = $scope.frm.details.components.lat;
    postData.location.longitude = $scope.frm.details.components.lng;
    postData.location.country = $scope.frm.details.components.country;
    postData.location.state = $scope.frm.details.components.state;
    postData.location.city = $scope.frm.details.components.city;
    postData.location.zip = $scope.frm.details.components.postal_code;
    postData.location.place_id = $scope.frm.details.place_id;
    postData.location.county = ($scope.frm.details.components.county) ? $scope.frm.details.components.county : '';
    postData.location.formatted_addr = $scope.frm.details.formatted_address;
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
    postData.details.charge_explanation = ($scope.frm.charge_explanation) ? $scope.frm.charge_explanation : '';
    postData.details.location = $scope.frm.location;
    postData.uid = $scope.userData.id;
    postData.timestamp = Firebase.ServerValue.TIMESTAMP;

    obj.owsArr.$add(postData).then(function(response) {
      var id = response.key();
      console.log('id: ', id);
      //save location
      obj.owsMy.child($scope.userData.id).child(id).set(Firebase.ServerValue.TIMESTAMP);
      if (postData.location.county) {
        obj.owsLocation.child(btoa(postData.location.country)).child(btoa(postData.location.state)).child(btoa(postData.location.county)).child(id).set(Firebase.ServerValue.TIMESTAMP);
      }
      if (postData.tags) {
        var tmp = postData.tags.split(',');
        angular.forEach(tmp, function(value, key) {
          var val = value.replace(/^\s+|\s+$/g, '');
          val = val.toLowerCase();
          if (postData.location.county) {
            obj.owsTags.child(btoa(val)).child(btoa(postData.location.country)).child(btoa(postData.location.state)).child(btoa(postData.location.county)).child(id).set(Firebase.ServerValue.TIMESTAMP);
          }
          
          obj.owsOnlyTags.child(btoa(val)).child(id).set(Firebase.ServerValue.TIMESTAMP);
        });
      }//end if
        //location ends
       $scope.frm = {};
       $location.path('/lessons/create/imagesUpload/'+id);
    });
  };
}])

.controller('ViewEditLessonsCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  
  $scope.frm = {};
  $scope.id = $routeParams.id;
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.frm.details = {};
  $scope.frm.details.components = {};
  //location ends
  
  $scope.current = null;
  
  $scope.resetData = function() {
    $scope.current = obj.owsArr.$getRecord($scope.id);
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
    
    $scope.frm.location = $scope.current.details.location;
    
    
    $scope.frm.details.components.lat = $scope.current.location.latitude;
    $scope.frm.details.components.lng = $scope.current.location.longitude;
    $scope.frm.details.components.country = $scope.current.location.country;
    $scope.frm.details.components.state = $scope.current.location.state;
    $scope.frm.details.components.city = $scope.current.location.city;
    $scope.frm.details.components.postal_code = ($scope.current.location.postal_code) ? $scope.current.location.postal_code : '';
    $scope.frm.details.place_id = $scope.current.location.place_id;
    $scope.frm.details.components.county = $scope.current.location.county;
    $scope.frm.details.formatted_address = $scope.current.location.formatted_addr;
  };
  
  obj.owsArr.$loaded().then(function (arrR) {
    $scope.resetData();
  });
  
  
  $scope.submitCreateForm = function() {
    if (!$scope.frm.location) {
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
    if ($scope.current.location.county) {
      obj.owsLocation.child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).remove();
    }
    if ($scope.current.tags) {
      var tmp = $scope.current.tags.split(',');
      angular.forEach(tmp, function(value, key) {
        var val = value.replace(/^\s+|\s+$/g, '');
        val = val.toLowerCase();
        if ($scope.current.location.county) {
          obj.owsTags.child(btoa(val)).child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).remove();
        }//end if
        
        obj.owsOnlyTags.child(btoa(val)).child($scope.id).remove();
      });
    }//end if
    //location ends
    //delete previous location
    $scope.current.title = $scope.frm.title;
    $scope.current.description = $scope.frm.description;
    $scope.current.location.latitude = $scope.frm.details.components.lat;
    $scope.current.location.longitude = $scope.frm.details.components.lng;
    $scope.current.location.country = $scope.frm.details.components.country;
    $scope.current.location.state = $scope.frm.details.components.state;
    $scope.current.location.city = $scope.frm.details.components.city;
    $scope.current.location.zip = $scope.frm.details.components.postal_code;
    $scope.current.location.place_id = $scope.frm.details.place_id;
    $scope.current.location.county = ($scope.frm.details.components.county) ? $scope.frm.details.components.county : '';
    $scope.current.location.formatted_addr = $scope.frm.details.formatted_address;
    $scope.current.tags = $scope.frm.tags;
    $scope.current.details.gender = ($scope.frm.gender) ? $scope.frm.gender : '';
    $scope.current.details.age = ($scope.frm.age) ? $scope.frm.age : '';
    $scope.current.details.email = ($scope.frm.email) ? $scope.frm.email : '';
    $scope.current.details.phone = ($scope.frm.phone) ? $scope.frm.phone : '';
    $scope.current.details.pref_email = ($scope.frm.pref_email) ? $scope.frm.pref_email : false;
    $scope.current.details.pref_phone_text = ($scope.frm.pref_phone_text) ? $scope.frm.pref_phone_text : false;
    $scope.current.details.pref_phone_call = ($scope.frm.pref_phone_call) ? $scope.frm.pref_phone_call : false;
    $scope.current.details.charges = $scope.frm.charges;
    $scope.current.details.charge_explanation = ($scope.frm.charge_explanation) ? $scope.frm.charge_explanation : '';
    $scope.current.details.location = $scope.frm.location;
    $scope.current.updated = Firebase.ServerValue.TIMESTAMP;
    obj.owsArr.$save($scope.current).then(function(response) {
        //save location
        if ($scope.current.location.county) {
          obj.owsLocation.child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).set(Firebase.ServerValue.TIMESTAMP);
        }
        if ($scope.current.tags) {
          var tmp = $scope.current.tags.split(',');
          angular.forEach(tmp, function(value, key) {
            var val = value.replace(/^\s+|\s+$/g, '');
            val = val.toLowerCase();
            if ($scope.current.location.county) {
            obj.owsTags.child(btoa(val)).child(btoa($scope.current.location.country)).child(btoa($scope.current.location.state)).child(btoa($scope.current.location.county)).child($scope.id).set(Firebase.ServerValue.TIMESTAMP);
            }//end if
            
            obj.owsOnlyTags.child(btoa(val)).child($scope.id).set(Firebase.ServerValue.TIMESTAMP);
          });
        }//end if
        //location ends
        $location.path('/lessons/create/imagesUpload/'+$routeParams.id);
    });
  };
}])

.controller('ViewImagesLessonsCtrlFB', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  
  var obj = dataService.tutorSetFirebase($scope.ref);
  $scope.meta = obj.meta;
  $scope.id = $routeParams.id;
  
  $scope.current = null;
  $scope.images = null;
  
  $scope.resetData = function() {
    $scope.current = obj.owsArr.$getRecord($scope.id);
    $scope.images = $scope.current.details.images;
  };
  
  obj.owsArr.$loaded().then(function (arrR) {
    $scope.resetData();
  });
  
  $scope.addImage = function() {
      obj.owsRecord.child($scope.id).child('details').child('images').child(md5($scope.frm.image)).set($scope.frm.image);
      $scope.resetData();
      $scope.frm.image = '';
  };//add image function ends
  //ends add Image in database
  
  
  $scope.deleteImage = function(k) {
    var a = confirm('Do you really want to delete this image');
    if (!a) return;
    
    obj.owsRecord.child($scope.id).child('details').child('images').child(k).remove();
    $scope.resetData();
    //do api call
  };
  
  $scope.makeDefaultImage = function(img) {
    obj.owsRecord.child($scope.id).child('details').child('defaultImage').set(img);
  };
  
}])
;