'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  .when('/addRep/kent/:chapter/:start/:maxData', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter/:start', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent/:chapter', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  .when('/addRep/kent', {
    templateUrl: 'view3/repertory2.html',
    controller: 'AddRepKentCtrl'
  })
  
  
  .when('/rep/kent/:chapter/:start/:end', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter/:start', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent/:chapter', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  .when('/rep/kent', {
    templateUrl: 'view3/view3.html',
    controller: 'RepKentCtrl'
  })
  
  ;
}])


.controller('AddRepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', function($scope, dataService, $filter, $routeParams) {
  console.log('routeparams: ', $routeParams);
  document.body.scrollTop;
  $scope.start = 0;
  if ($routeParams.start) $scope.start = parseInt($routeParams.start);
  $scope.maxData = 100;
  if ($routeParams.maxData) $scope.maxData = parseInt($routeParams.maxData);

  //show chapters
  function successChapter(response) {
    $scope.chapters = response.data.data;
    if ($routeParams.chapter) {
      angular.forEach($scope.chapters, function(value) {
        if ($scope.chapter) return;
        if (parseInt($routeParams.chapter) === parseInt(value.id)) {
          $scope.chapter = value; 
          $scope.refreshData($scope.chapter.id, $scope.start, $scope.maxData, true); 
        }
      });
    }
  }
  
  dataService.getChapters(successChapter, function(r) {console.log('err: ', r);});
  //show chapters ends
  
  //show symptoms & pagination
  $scope.frm = {};
  $scope.frm.sym = {};
  
  $scope.repertory = null;
  $scope.data = null;
  function successSymptoms(response) {
    $scope.data = response.data.data;
    $scope.repertory = $scope.data.results;
    $scope.data.minRows = $scope.data.totalRows;
    if (($scope.data.start + $scope.data.max) < $scope.data.totalRows) {
      $scope.data.minRows = ($scope.data.start + $scope.data.max);
    }
    
    $scope.data.prevPage = $scope.data.start - $scope.data.max;
    if (($scope.data.start - $scope.data.max) < 0) {
      $scope.data.prevPage = 0;
    }
    
    $scope.data.nextPage = $scope.data.start + $scope.data.max;
    if ($scope.data.totalRows < ($scope.data.start + $scope.data.max)) {
      $scope.data.nextPage = $scope.data.totalRows;
    }
    console.log($scope.data);
  }
  
  $scope.refreshData = function(chapter, start, maxData, cache) {
    var url = '/php2/repertory/record.php?action=kent_repertory_getAll&chapter='+chapter+'&start='+start+'&maxData='+maxData+'&cacheTime=0';
    dataService.get(url, successSymptoms, function(r) {console.log('err: ', r);}, cache);
  }
  
  //update symptom
  
  $scope.updateSymptom = function(it) {
    dataService.postJson('/php2/repertory/record.php?action=kent_repertory_update&id='+it.id, $scope.frm.sym[it.id], function(r) {console.log('success: ', r);}, function(r) {console.log('err: ', r);});
  };
  
  $scope.deleteSymptom = function(id)
  {
    dataService.get('/php2/repertory/record.php?action=kent_repertory_delete&id='+id, function(r) {$scope.refreshData($scope.chapter.id, $scope.start, $scope.maxData, false)}, function(r){}, false); 
  };
}])


.controller('RepKentCtrl', ['$scope', 'dataService', '$filter', '$routeParams', '$location', function($scope, dataService, $filter, $routeParams, $location) {
  console.log('routeparams: ', $routeParams);
  document.body.scrollTop;
  $scope.start = 0;
  if ($routeParams.start) $scope.start = parseInt($routeParams.start);
  $scope.maxData = 100;
  if ($routeParams.maxData) $scope.maxData = parseInt($routeParams.maxData);

  //show chapters
  function successChapter(response) {
    $scope.chapters = response.data.data;
      angular.forEach($scope.chapters, function(value, key) {
        $scope.chapters[key].chapter = $filter('capitalize')(value.chapter, true);
        if ($routeParams.chapter) {
          if ($scope.chapter) return;
          if (parseInt($routeParams.chapter) === parseInt(value.id)) {
            $scope.chapter = value;
          }
        }
      });
  }
  
  dataService.getChapters(successChapter, function(r) {console.log('err: ', r);});
  $scope.updateChapter = function()
  {
    $location.path('rep/kent/'+$scope.chapter.id);
  }
  
  //show repertory & pagination & localstorage
  var returnRec = {};
  $scope.repertory = null;
  $scope.data = null;
  
  function calculate(r)
  {
    angular.forEach(r, function(value, key) {
        if (!returnRec[value.parent_id]) {
          returnRec[value.parent_id] = [];  
        }
        returnRec[value.parent_id].push(value);  
      });
    //console.log('step 1, isolating: ', returnRec);
    
    var rootParent = 0;
    if (!returnRec[rootParent]) {
      $scope.loading = false;
      return;
    }
    angular.forEach(returnRec[rootParent], function(value, key) {
      if (returnRec[value.id]) {
        returnRec[rootParent][key].child = returnRec[value.id];
        angular.forEach(returnRec[rootParent][key].child, function(v2, k2) {
          if (returnRec[v2.id]) {
            returnRec[rootParent][key].child[k2].child = returnRec[v2.id];
            
            angular.forEach(returnRec[rootParent][key].child[k2].child, function(v3, k3) {
              if (returnRec[v3.id]) {
                returnRec[rootParent][key].child[k2].child[k3].child = returnRec[v3.id];
                
                angular.forEach(returnRec[rootParent][key].child[k2].child[k3].child, function(v4, k4) {
                  if (returnRec[v4.id]) {
                    returnRec[rootParent][key].child[k2].child[k3].child[k4].child = returnRec[v4.id];
                  }//end if returnRec[v4.id]
                });//end foreach returnRec[rootParent][key].child[k2].child[k3].child
              }//end if returnRec[v3.id]
            });//end foreach returnRec[rootParent][key].child[k2].child
            
            
          }//end if returnRec[v2.id]
        });//end foreach returnRec[rootParent][key].child
      }//end if returnRec[value.id]
    });//end foreach returnRec[0]
    //end
    $scope.records = returnRec[rootParent];
    //console.log('step2: processed Data, ', $scope.records);
    $scope.loading = false;
  }
  
  
  function successSymptoms(response) {
    $scope.data = response.data.data;
    $scope.repertory = $scope.data.results;
    $scope.data.minRows = $scope.data.totalRows;
    if (($scope.data.start + $scope.data.max) < $scope.data.totalRows) {
      $scope.data.minRows = ($scope.data.start + $scope.data.max);
    }
    
    $scope.data.prevPage = $scope.data.start - $scope.data.max;
    if (($scope.data.start - $scope.data.max) < 0) {
      $scope.data.prevPage = 0;
    }
    if ($scope.data.nextPage < 0) $scope.data.prevPage = 0;
    
    $scope.data.nextPage = $scope.data.start + $scope.data.max - 50;
    if ($scope.data.totalRows < ($scope.data.start + $scope.data.max)) {
      $scope.data.nextPage = $scope.data.totalRows - $scope.data.max;
    }
    if ($scope.data.nextPage < 0) $scope.data.nextPage = 0;
    
    $scope.data.lastPage = $scope.data.totalRows - $scope.data.max - 50;
    if ($scope.data.lastPage < 0) $scope.data.nextPage = 0;
    console.log($scope.data);
    //console.log($scope.repertory);
    
    calculate($scope.repertory);
  }
  
  $scope.refreshData = function(chapter, start, maxData) {
    $scope.loading = true;
    var url = '/php2/repertory/record.php?action=kent_repertory_getAll&chapter='+chapter+'&start='+start+'&max='+(maxData + 50)+'&cacheTime=200';
    dataService.get(url, successSymptoms, function(r) {console.log('err: ', r);}, true);
  }
  if ($routeParams.chapter) {
    $scope.refreshData(parseInt($routeParams.chapter), $scope.start, $scope.maxData);
  }
  
  
  //add symptom to repertory
  
  //show symptom from repertory
}])
;

