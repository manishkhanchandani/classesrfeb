'use strict';

angular.module('myApp.completeRep', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  
  .when('/completeRep/chapter/:chapter/pg/:page', {
    templateUrl: 'modules/completeRep/completeRep.html',
    controller: 'CompleteRepCtrl'
  })
  
  .when('/completeRep/chapter/:chapter', {
    templateUrl: 'modules/completeRep/completeRep.html',
    controller: 'CompleteRepCtrl'
  })
  
  
  .when('/completeRep/p_:page/k_:keyword', {
    templateUrl: 'modules/completeRep/completeRep.html',
    controller: 'CompleteRepCtrl'
  })
  
  .when('/completeRep/k_:keyword', {
    templateUrl: 'modules/completeRep/completeRep.html',
    controller: 'CompleteRepCtrl'
  })
  
  .when('/completeRep', {
    templateUrl: 'modules/completeRep/completeRep.html',
    controller: 'CompleteRepCtrl'
  })
  
  .when('/completeRep/my', {
    templateUrl: 'modules/completeRep/completeRepMy.html',
    controller: 'CompleteRepMyCtrl'
  })
  
  .when('/completeRep/add2', {
    templateUrl: 'modules/completeRep/completeRepAdd.html',
    controller: 'CompleteAddRepCtrl'
  })
  .when('/completeRep/add2/:page', {
    templateUrl: 'modules/completeRep/completeRepAdd.html',
    controller: 'CompleteAddRepCtrl'
  })
  
  .when('/completeRep/trace/:trace_id', {
    templateUrl: 'modules/completeRep/completeTrace.html',
    controller: 'CompleteTraceCtrl'
  })
  ;
}])


.controller('CompleteRepMyCtrl', ['$scope', '$location', 'dataService', '$routeParams', '$rootScope', function($scope, $location, dataService, $routeParams, $rootScope) {
  
}])

.controller('CompleteTraceCtrl', ['$scope', '$location', 'dataService', '$routeParams', '$rootScope', function($scope, $location, dataService, $routeParams, $rootScope) {
  
}])
.controller('CompleteRepCtrl', ['$scope', '$location', 'dataService', '$routeParams', '$rootScope', function($scope, $location, dataService, $routeParams, $rootScope) {
  
  $scope.frm = {};
  $scope.frm.page = 0;
  $scope.data = null;

  $scope.frm.urlPrefix = 'completeRep/p_';
  $scope.frm.urlSufix = '';
            
  //console.log($routeParams);
  /*
  //Save Case Functionality
  //show save fields
  $scope.save = false;
  $scope.showSaveFields = function() {
    $scope.save = true;
    $scope.showSavedList = false;
  };
  //save ends
  
  $scope.saveCase = function() {
    if ($scope.recordedSymptoms.length <= 0) return;
    if (!$scope.userData) return;
    var tmp = [];
    angular.forEach($scope.recordedSymptoms, function(value) {
      tmp.push(parseInt(value.id));  
    });
    var data = {};
    data.uid = $scope.userData.id;
    data.ids = tmp;
    data.name = $scope.frm.name;
    console.log(data);
    dataService.postJson('/php2/repertory/complete.php?action=save_complete_repertory', data, function(r) { $scope.frm.name = '';}, function(err) {console.log('err: ', err); });
  };
  
  
  $scope.getSavedCases = function(uid, cacheTime, cache) {
    $scope.showSavedList = true;
    $scope.save = false;
    var url = '/php2/repertory/complete.php?action=saved_complete_repertory&uid='+uid+'&cacheTime='+cacheTime;
    dataService.get(url, function(r) {$scope.savedListResults = r.data.data; }, function(r) {console.log('err getSavedCases: ', r);}, cache);
  }
  
  $scope.viewSavedList = function(trace_id, cache, cacheTime) {
    var url = '/php2/repertory/complete.php?action=savedOne_complete_repertory&trace_id='+trace_id+'&cacheTime='+cacheTime;
    dataService.get(url, function(r) { successMySymptoms(r, 2); }, function(r) {console.log('err getSavedCases: ', r);}, cache);
  };
  //Save Case Functionality
  */
  
  if ($routeParams.page) {
    $scope.frm.page = parseInt($routeParams.page);
  }
  $scope.frm.resultStatus = '';
  //$scope.frm.page = 0;
  
  $scope.searchRep = function()
  {
    if (!$scope.frm.keyword && ($scope.frm.chapter == null)) return;
    //$location.path('/completeRep/p_0/k_' + encodeURIComponent($scope.frm.keyword));
    document.body.scrollTop = 0;
    $scope.frm.loading = true;
    $scope.records = '';
    $scope.data = '';
    if ($scope.frm.keyword) {
      //$scope.frm.urlSufix = $scope.frm.urlSufix + '/k_' + keyword;
      var keyword = encodeURIComponent($scope.frm.keyword);
      var url = '/php2/repertory/complete.php?action=complete_search&keyword='+keyword+'&max=100&page='+$scope.frm.page;
    } else if ($scope.frm.chapter >= 0) {
      var url = 'php2/repertory/complete.php?action=complete_browse&chapter='+$scope.frm.chapter+'&max=25&page='+$scope.frm.page;
      console.log(url);
    }
    dataService.get(url, function (r) { 
      $scope.frm.loading = false;
      if (r.data.data.totalRows == 0) {
        $scope.frm.resultStatus = 'No Result Found.'; 
        return
      }; 
      $scope.frm.resultStatus = '';
      //$scope.records = r.data.data.results;
      $scope.recordsGroup = r.data.data.resultsGroup; 
      $scope.data = r.data.data;
    }, function (r) { console.log('failed: ', r)}, true);
  };
  
  $scope.pagNextPrev = function(page)
  {
    if (!$scope.frm.keyword && ($scope.frm.chapter == null)) return;
    console.log('page: ', page);
    $scope.frm.page = page;
    $scope.searchRep();
  };
  
  $scope.browse = function(chapter, page)
  {
    $scope.frm.keyword = '';
    $scope.frm.chapter = chapter;
    $scope.frm.page = page;
    $scope.searchRep();
    return false;
  };
  
  console.log($routeParams);
  if ($routeParams.chapter) {
    var pg = 0;
    if ($routeParams.page) {
      pg = parseInt($routeParams.page);  
    }
    $scope.browse($routeParams.chapter, pg);
  } else if ($routeParams.keyword) {
    $scope.frm.resultStatus = 'Loading......';
    $scope.frm.keyword = decodeURIComponent($routeParams.keyword);
    $scope.frm.urlSufix = $scope.frm.urlSufix + '/k_' + $routeParams.keyword;
    
    var keyword = encodeURIComponent($scope.frm.keyword);
    var url = '/php2/repertory/complete.php?action=complete_search&keyword='+keyword+'&start=0&max=25&page='+$scope.frm.page;
    dataService.get(url, function (r) { if (r.data.data.totalRows == 0) {$scope.frm.resultStatus = 'No Result Found. Send email to manishkk74@gmail.com and ask him to add rubrics related to word "' + $scope.frm.keyword + '"'; return}; $scope.frm.resultStatus = ''; $scope.recordsGroup = r.data.data.resultsGroup;  $scope.data = r.data.data;}, function (r) { console.log('failed: ', r)}, true);
  } else {
    //var url = '/php2/repertory/complete.php?action=complete_search&start=0&max=100&page='+$scope.frm.page;
    //dataService.get(url, function (r) { $scope.records = r.data.data.results; $scope.data = r.data.data;}, function (r) { console.log('failed: ', r)}, true); 
    
  }
  
  var url = '/php2/repertory/complete.php?action=getAllChapters';
  dataService.get(url, function (r) { $scope.chapters = r.data.data;}, function (r) { console.log('failed: ', r)}, true);
  
  
  
  /*
  //delete my symptoms
  $scope.recordedSymptomStatus = '';
  $scope.delSym = function(rid, type, trace_id) {
    $scope.recordedSymptomStatus = '';
    if (!$scope.userData) return;
    if (type == 1) {
      var url = '/php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+$scope.userData.id;
      dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
    } else if (type == 2) {
      var url = '/php2/repertory/complete.php?action=saved_complete_repertory_delete&rid='+rid+'&access_token='+$scope.userData.access_token;
      dataService.get(url, function(r) { if (r.data.error) {$scope.recordedSymptomStatus = r.data.error; return;} $scope.viewSavedList(trace_id, false, 0); }, function(r) {console.log('err delSym: ', r);}, false);
    }
  };
  */
  
  //add my symptom to repertory
  /*$scope.addsym = function(rec)
  {
    if (!$scope.userData) {
      alert('please login first to add symptom');
      return;  
    }
    var url = '/php2/repertory/complete.php?action=complete_repertory_add_specific&id='+rec.id+'&uid='+$scope.userData.id;
    dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
  };*/
  
  function getAllMySymptoms(uid, cacheTime, cache) {
    $rootScope.$broadcast("getAllMySymptoms", {uid: uid, cacheTime: cacheTime, cache: cache});
  }
  
  $scope.addsymSpecific = function(rec, intensity) {
    
    if (!$scope.userData) {
      alert('please login first to add symptom');
      return;  
    }
    var url = '/php2/repertory/complete.php?action=complete_repertory_add_specific&id='+rec.id+'&uid='+$scope.userData.id+'&intensity='+intensity;
    dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
  };
  
  /*
  $scope.recordedSymptoms = [];
  $scope.recordedRemedies = {};
  $scope.recordedType = null;
  //show symptom from repertory
  function successMySymptoms(response, type)
  {
    $scope.recordedType = type;
    $scope.recordedSymptoms = [];
    $scope.recordedRemedies = {};
    var snapshot = response.data.data;
    //console.log('snapshot: ', snapshot);
    angular.forEach(snapshot, function(value, key) {
      //console.log('val is ', value);
      var intensity = parseInt(value.intensity);
      //console.log('intensity is ', intensity);
      if (value.remedies) {
        var tmp = {};
        //console.log('remedies: ', value.remedies);
        angular.forEach(value.remedies, function(remedyDetails) {
          var keyDetails = btoa(remedyDetails.remedy);
          tmp[keyDetails] = remedyDetails;
          //console.log('sl ', keyDetails, ', ', remedyDetails, ', ', remedyDetails.remedy, ', ', remedyDetails.points);
          if (!$scope.recordedRemedies[keyDetails]) {
            $scope.recordedRemedies[keyDetails] = {};
            $scope.recordedRemedies[keyDetails].remedy = remedyDetails.remedy;
            $scope.recordedRemedies[keyDetails].points = 0;
            $scope.recordedRemedies[keyDetails].id = keyDetails;
          }
          var points = (parseFloat(remedyDetails.points) * intensity);
          tmp[keyDetails].points = points;
          $scope.recordedRemedies[keyDetails].points = $scope.recordedRemedies[keyDetails].points + points;
          //console.log('det: ', keyDetails, ', remedydetails: ', $scope.recordedRemedies[keyDetails]);
        });
        value.remedies = tmp;
      }
      $scope.recordedSymptoms.push(value);
    });
    //console.log('sym: ', $scope.recordedSymptoms);
    //console.log('rem: ', $scope.recordedRemedies);
  }
  
  
  function getAllMySymptoms(uid, cacheTime, cache) {
    
    var url = '/php2/repertory/complete.php?action=complete_repertory_getAll&uid='+uid+'&cacheTime='+cacheTime;
    dataService.get(url, function(r) { successMySymptoms(r, 1); }, function(r) {console.log('err getAllMySymptoms: ', r);}, cache);
  }
  
  //get data
  if ($scope.userData) {
    getAllMySymptoms($scope.userData.id, 30, true);
  }
  */
}])


.controller('CompleteAddRepCtrl', ['$scope', '$location', 'dataService', '$routeParams', '$rootScope', function($scope, $location, dataService, $routeParams, $rootScope) {
  
  if (!$scope.userData) {
    $location.path('/');
    return;
  }//end if
  
  $scope.frm = {};
  $scope.frm.showStatus = null;
  //add new symptom
  function addSymptoms(symptoms, remedies) {
    $scope.frm.showStatus = null;
    var uid = null;
    if ($scope.userData) {
      uid = $scope.userData.id;
    }//end if
    var data = {symptoms: symptoms, remedies: remedies, uid: uid};
    var url = '/php2/repertory/complete.php?action=add';
    dataService.postJson(url, data, function (r) { console.log('success: ', r); $scope.frm.data = ''; if (r.data.error) { $scope.frm.showStatus = r.data.error; $scope.viewSymptoms(); } else { $scope.viewSymptoms();}}, function (r) { console.log('failed: ', r)});
  }
  
  $scope.addSymptomData = function() {
    if (!$scope.frm.data) return;
    console.log('1. data: ', $scope.frm.data);
    var tmp = $scope.frm.data.split(':');
    var symptoms = tmp[0];
    console.log('2. sym: ', symptoms);
    var remedies = tmp[1];
    console.log('3. remedies: ', remedies);
    addSymptoms(symptoms, remedies);
  };
  
  //view all symptoms
  $scope.viewSymptoms = function() {
    $scope.frm.page = 0;
    if ($routeParams.page) {
      $scope.frm.page = parseInt($routeParams.page);
    }
    var url = '/php2/repertory/complete.php?action=complete_getAll&start=0&max=5&cacheTime=0&page='+$scope.frm.page;
    dataService.get(url, function (r) { console.log('success: ', r); $scope.records = r.data.data.results; /*console.log($scope.records); */}, function (r) { console.log('failed: ', r)});
  };
  $scope.viewSymptoms();
  
  //search symptoms
  $scope.searchSymptoms = function() {
    
  };
  
  
  function getAllMySymptoms(uid, cacheTime, cache) {
    $rootScope.$broadcast("getAllMySymptoms", {uid: uid, cacheTime: cacheTime, cache: cache});
  }
  
  
  $scope.addsymSpecific = function(rec, intensity) {
    
    if (!$scope.userData) {
      alert('please login first to add symptom');
      return;  
    }
    var url = '/php2/repertory/complete.php?action=complete_repertory_add_specific&id='+rec.id+'&uid='+$scope.userData.id+'&intensity='+intensity;
    dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
  };
  
  /*
  //delete my symptoms
  
  $scope.delSym = function(rid) {
    if (!$scope.userData) return;
    var url = '/php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+$scope.userData.id;
    dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
  };
  
  //add my symptom to repertory
  $scope.addsym = function(rec)
  {
    if (!$scope.userData) {
      alert('please login first to add symptom');
      return;  
    }
    var url = '/php2/repertory/complete.php?action=complete_repertory_add&id='+rec.id+'&uid='+$scope.userData.id;
    dataService.get(url, function(r) { getAllMySymptoms($scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
  };
  
  
  
  $scope.recordedSymptoms = [];
  $scope.recordedRemedies = {};
  //show symptom from repertory
  function successMySymptoms(response)
  {
    $scope.recordedSymptoms = [];
    $scope.recordedRemedies = {};
    var snapshot = response.data.data;
    //console.log('snapshot: ', snapshot);
    angular.forEach(snapshot, function(value, key) {
      var intensity = parseInt(value.intensity);
      if (value.remedies) {
        var tmp = {};
        //console.log('remedies: ', value.remedies);
        angular.forEach(value.remedies, function(remedyDetails) {
          var keyDetails = btoa(remedyDetails.remedy);
          tmp[keyDetails] = remedyDetails;
          //console.log('sl ', keyDetails, ', ', remedyDetails, ', ', remedyDetails.remedy, ', ', remedyDetails.points);
          if (!$scope.recordedRemedies[keyDetails]) {
            $scope.recordedRemedies[keyDetails] = {};
            $scope.recordedRemedies[keyDetails].remedy = remedyDetails.remedy;
            $scope.recordedRemedies[keyDetails].points = 0;
            $scope.recordedRemedies[keyDetails].id = keyDetails;
          }
          var points = (parseFloat(remedyDetails.points) * intensity);
          tmp[keyDetails].points = points;
          $scope.recordedRemedies[keyDetails].points = $scope.recordedRemedies[keyDetails].points + points;
          //$scope.recordedRemedies[keyDetails].points = $scope.recordedRemedies[keyDetails].points + parseInt(remedyDetails.points);
          //console.log('det: ', keyDetails, ', remedydetails: ', $scope.recordedRemedies[keyDetails]);
        });
        value.remedies = tmp;
      }
      $scope.recordedSymptoms.push(value);
    });
    console.log('sym: ', $scope.recordedSymptoms);
    console.log('rem: ', $scope.recordedRemedies);
  }
  
  
  function getAllMySymptoms(uid, cacheTime, cache) {
    
    var url = '/php2/repertory/complete.php?action=complete_repertory_getAll&uid='+uid+'&cacheTime='+cacheTime;
    dataService.get(url, successMySymptoms, function(r) {console.log('err getAllMySymptoms: ', r);}, cache);
  }
  
  //get data
  if ($scope.userData) {
    getAllMySymptoms($scope.userData.id, 30, true);
  }*/
}])
;