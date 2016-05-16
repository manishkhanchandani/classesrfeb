'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  
  .when('/addRepertory/:parent', {
    templateUrl: 'view2/repertory.html',
    controller: 'ViewRepertoryCtrl'
  })
  .when('/addRepertory', {
    templateUrl: 'view2/repertory.html',
    controller: 'ViewRepertoryCtrl'
  })
  
  
  .when('/repertory/:chapter/:parent', {
    templateUrl: 'view2/view2.html',
    controller: 'RepertoryCtrl'
  })
  .when('/repertory', {
    templateUrl: 'view2/view2.html',
    controller: 'RepertoryCtrl'
  })
  ;
}])


.controller('RepertoryCtrl', ['$scope', '$firebaseArray', '$filter', '$routeParams', '$location', function($scope, $firebaseArray, $filter, $routeParams, $location) {
  //console.log($routeParams);
  
  
  //chapters
  var chapterId = 0;
  $scope.chapters = $firebaseArray($scope.ref.child('repertory').child('symptoms').orderByChild('parent').equalTo(chapterId));
  
  $scope.frm = {};
  $scope.chapters.$loaded().then(function (arrR) {
    if ($routeParams.chapter && $routeParams.parent) {
      angular.forEach(arrR, function(value, key) {
        if ($scope.frm.chapter) return;
        if (value.$id === $routeParams.parent) {
          $scope.frm.chapter = value;
        }
      });
    }
  });
  
  $scope.updateChapter = function()
  {
    $location.path('repertory/'+encodeURIComponent($scope.frm.chapter.symptom)+'/'+$scope.frm.chapter.$id);
  }
  
  //end chapters
  
  //record symptoms
  
  //get the chain
  $scope.recordedSymptoms = null;
  
  /*function rFindSymptom(key, reference) {
    $scope.ref.child('repertory').child('symptoms').child(key).once("value", function(snapshot) {
      var res = snapshot.val();
      res.id = snapshot.key();
      $scope.recordedSymptoms[reference].chain.push(res);
      if (res.parent == 0) {
        $scope.recordedSymptoms[reference].chain.reverse();
        return;
      } else {
        rFindSymptom(res.parent, reference);
      }
    });
  }*/
  
  //$scope.recordedSymptoms = $firebaseArray($scope.ref.child('repertory').child('tempCase').child($scope.userData.uid));
  
  $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).on('value', function(snapshot) {
    //console.log(snapshot.val());
    $scope.recordedSymptoms = [];
    $scope.recordedRemedies = {};
    if (!snapshot.val()) return;
    angular.forEach(snapshot.val(), function(value, key) {
      if (value.remedies) {
        angular.forEach(value.remedies, function(remedyDetails, keyDetails) {
          if (!$scope.recordedRemedies[keyDetails]) {
            $scope.recordedRemedies[keyDetails] = {};
            $scope.recordedRemedies[keyDetails].remedy = remedyDetails.remedy;
            $scope.recordedRemedies[keyDetails].points = 0;
            $scope.recordedRemedies[keyDetails].id = keyDetails;
          }
          $scope.recordedRemedies[keyDetails].points = $scope.recordedRemedies[keyDetails].points + parseInt(remedyDetails.points);
        });
      }
      $scope.recordedSymptoms.push(value);
    });
  });
  /*
  $scope.recordedSymptoms.$loaded().then(function (arrR) {
    angular.forEach(arrR, function(value, key) {
      $scope.recordedSymptoms[key] = value;
      $scope.recordedSymptoms[key].chain = [];
      rFindSymptom(value.parent, key);
    });
    console.log($scope.recordedSymptoms);
    if(!$scope.$$phase) $scope.$apply();
  });*/
  
  
  $scope.addsym = function(rec)
  {
    if (!$scope.userData) return;
    var id = rec.$id;
    var data = {symptom: rec.symptom, parent: rec.parent, id: rec.$id, chain: rec.chain};
    
    //saving remedies
    data.remedies = {};
    if (rec.remedies) {
      angular.forEach(rec.remedies, function (v, k) {
        data.remedies[k] = {remedy: v.remedy, points: v.points};
      });
    }//get remedy
    
    $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).child(id).set(data);
  };
  
  $scope.delSym = function(id) {
    if (!$scope.userData) return;
    //console.log(id);
    $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).child(id).remove();
    if(!$scope.$$phase) $scope.$apply();
  };
  //record ends
  
  //showing repertory
  $scope.records = null;
  if ($routeParams.chapter && $routeParams.parent) {
    //$scope.records = JSON.parse(localStorage.getItem($routeParams.chapter));
  

    var records = $firebaseArray($scope.ref.child('repertory').child('symptoms').orderByChild('chapter').equalTo($routeParams.chapter));
    var returnRec = {};
    records.$loaded().then(function (arrR) {
      angular.forEach(arrR, function(value) {
        if (!returnRec[value.parent]) {
          returnRec[value.parent] = [];  
        }
        returnRec[value.parent].push(value);  
      });
      
      angular.forEach(returnRec[$routeParams.parent], function(value, key) {
        if (returnRec[value.$id]) {
          returnRec[$routeParams.parent][key].child = returnRec[value.$id];
          angular.forEach(returnRec[$routeParams.parent][key].child, function(v2, k2) {
            if (returnRec[v2.$id]) {
              returnRec[$routeParams.parent][key].child[k2].child = returnRec[v2.$id];
              
              angular.forEach(returnRec[$routeParams.parent][key].child[k2].child, function(v3, k3) {
                if (returnRec[v3.$id]) {
                  returnRec[$routeParams.parent][key].child[k2].child[k3].child = returnRec[v3.$id];
                }
              });
              
              
            }
          });
        }
      });
      
      $scope.records = returnRec[$routeParams.parent];
      //console.log('records: ', $scope.records);

      //use this after repertory is complete
      if ($routeParams.chapter) {
        //localStorage.setItem($routeParams.chapter, JSON.stringify($scope.records));
        //console.log(JSON.parse(localStorage.getItem($routeParams.chapter)));
      }
    });
  }//end if
  //end showing repertory
  
}])

.controller('ViewRepertoryCtrl', ['$scope', '$firebaseArray', '$filter', '$routeParams', function($scope, $firebaseArray, $filter, $routeParams) {
  
  $scope.addFrm = {};
  $scope.addFrmEdit = {};
  
  //get the parent from url
  $scope.addFrm.parent = 0;
  if ($routeParams.parent) {
    $scope.id = $routeParams.parent;
    $scope.addFrm.parent = $routeParams.parent;
    if ($scope.addFrm.parent == 0) {
      $scope.addFrm.parent = parseInt($scope.addFrm.parent);  
    } else {
      $scope.ref.child('repertory').child('symptoms').child($routeParams.parent).once("value", function(snapshot) {
        $scope.addFrmEdit = snapshot.val();
      });
    }
    
  }
  
  //get the chain
  $scope.chain = null;
  $scope.addFrm.chain = [];
  function rFindSymptom(key) {
    $scope.ref.child('repertory').child('symptoms').child(key).once("value", function(snapshot) {
      var res = snapshot.val();
      res.id = snapshot.key();
      $scope.chain.push(res);
      if (res.parent == 0) {
        $scope.chain.reverse();
        //adding chain for page
        if ($scope.chain) {
          angular.forEach($scope.chain, function(value, key) {
            var chain = {id: value.id, parent: value.parent, symptom: value.symptom, priority: value.priority};
            $scope.addFrm.chain.push(chain);
          });
        }
    
    
        $scope.addFrm.chapter = $scope.chain[0].symptom;
        $scope.addFrmEdit.chapter = $scope.chain[0].symptom;
        if(!$scope.$$phase) $scope.$apply();
        return;
      } else {
        rFindSymptom(res.parent);
      }
    });
  }
  
  if ($scope.addFrm.parent != 0) {
    $scope.chain = [];
    rFindSymptom($scope.addFrm.parent);
  }
  
  //analyse remedy
  function analyseThis(reference)
  {
    
    var obj = {};
    var arr = reference.raw.split(/,/g);
    angular.forEach(arr, function(value, key) {
      value = value.toLowerCase().trim();
      var regexp = new RegExp(/<i><font color=\"#0000ff\">(.*)</, 'g');
      var matchRec2 = regexp.exec(value);
      var regexp = new RegExp(/<font color=\"#0000ff\">(.*)<\/font>/, 'g');
      var matchRec2a = regexp.exec(value);
      
      var regexp = new RegExp(/<b><font color="#ff0000">(.*)</, 'g');
      var matchRec3 = regexp.exec(value);
      var cleanText;
      if (matchRec2) {
        cleanText = matchRec2[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 2};
      } else if (matchRec3) {
        cleanText = matchRec3[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 3};
      } else if (matchRec2a) {
        cleanText = matchRec2a[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 2};
      } else {
        cleanText = value.replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 1};
      }
    });
    reference.remedies = obj;
    return obj;
  }
  
  $scope.analyse = function(reference) {
    if (reference === 'add') {
      analyseThis($scope.addFrm);
    } else {
      analyseThis($scope.addFrmEdit);
    }
    return;
    /*
    var obj = {};
    var arr = $scope.addFrmEdit.raw.split(/,/g);
    angular.forEach(arr, function(value, key) {
      value = value.toLowerCase().trim();
      //console.log(value);
      var regexp = new RegExp(/<i><font color=\"#0000ff\">(.*)</, 'g');
      var matchRec2 = regexp.exec(value);
      
      var regexp = new RegExp(/<b><font color="#ff0000">(.*)</, 'g');
      var matchRec3 = regexp.exec(value);
      if (matchRec2) {
        obj[btoa(matchRec2[1])] = {remedy: matchRec2[1], points: 2};
      } else if (matchRec3) {
        obj[btoa(matchRec3[1])] = {remedy: matchRec3[1], points: 3};
      } else {
        var cleanText = value.replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 1};
      }
    });
    $scope.addFrmEdit.remedies = obj;
    console.log(obj);
    */
  };
  
  
  
  //list all the symptoms
  $scope.repertory = null;
  $scope.ref.child('repertory').child('symptoms').orderByChild('parent').equalTo($scope.addFrm.parent).on("value", function(snapshot) {
    $scope.repertory = [];
    angular.forEach(snapshot.val(), function(item, key) {
      item.id = key;
      $scope.repertory.push(item);
    });
    $scope.addFrm.priority = $scope.repertory.length + 1;
    //console.log($scope.repertory);
    if(!$scope.$$phase) $scope.$apply();
  });
  
  //add new symptom
  $scope.addSymptom = function()
  {
    if (!$scope.addFrm.symptom) return;
    if (!$scope.addFrm.priority) $scope.addFrm.priority = 0;
    $scope.addFrm.priority = parseInt($scope.addFrm.priority);
    if (!$scope.addFrm.parent) {
      $scope.addFrm.parent = 0;
    }
    if ($scope.addFrm.parent == 0) {
      $scope.addFrm.parent = parseInt($scope.addFrm.parent);
    }
    
    if ($scope.addFrm.parent != 0) {
      $scope.addFrm.symptom = $scope.addFrm.symptom.toLowerCase().trim();
    }
    
    $scope.addFrm.chain = [];
    if ($scope.chain) {
      angular.forEach($scope.chain, function(value, key) {
        var chain = {id: value.id, parent: value.parent, symptom: value.symptom, priority: value.priority};
        $scope.addFrm.chain.push(chain);
      });
    }
    
    delete $scope.addFrm.raw;
    $scope.ref.child('repertory').child('symptoms').push($scope.addFrm);
    $scope.addFrm.remedies = '';
    $scope.addFrm.symptom = '';
    
  }//end addSymptom
  
  
  //add new symptom
  $scope.editSymptom = function(id)
  {
    if (!$scope.addFrmEdit.symptom) return;
    if (!$scope.addFrmEdit.priority) $scope.addFrmEdit.priority = 0;
    $scope.addFrmEdit.priority = parseInt($scope.addFrmEdit.priority);
    if (!$scope.addFrmEdit.parent) {
      $scope.addFrmEdit.parent = 0;
    }
    if ($scope.addFrmEdit.parent == 0) {
      $scope.addFrmEdit.parent = parseInt($scope.addFrmEdit.parent);
    }
    
    if ($scope.addFrmEdit.parent != 0) {
      $scope.addFrmEdit.symptom = $scope.addFrmEdit.symptom.toLowerCase().trim();
    }
    
    delete $scope.addFrmEdit.raw;
    $scope.ref.child('repertory').child('symptoms').child(id).update($scope.addFrmEdit);
    
  }//end addSymptom
  
  
  $scope.mainSymptoms = function()
  {
    return;
    var text = $scope.frm.page;
    //console.log(text);
    //type 1
    /*
    <p><a NAME="VERTIGO">VERTIGO</b> </a>: remedies</p>
    */
    var counter = 1;
    var matchPattern;
    var matches = [];
    var regexp = new RegExp(/<p>(.*)<\/b>(.*): (.*)<\/p>/, 'g');
    while (matchPattern = regexp.exec(text)) {
      var data = {};
      data.symptom = matchPattern[1] + matchPattern[2];
      data.symptom = data.symptom.replace(/<\/?[^>]+(>|$)/g, "");
      data.symptom = data.symptom.toLowerCase().trim();
      data.raw = matchPattern[3];
      data.remedies = analyseThis(data);
      data.parent = $routeParams.parent;
      data.priority = counter;
      data.chapter = $scope.addFrm.chapter;
      delete data.raw;
      console.log(data);
      $scope.ref.child('repertory').child('symptoms').push(data);
      
      counter++;
      matches.push(matchPattern);
    }
    console.log(matches);
  };
  
  function recDelete(id) {
    //delete id
    console.log('deleting id: ', id);
    $scope.ref.child('repertory').child('symptoms').child(id).remove();
    
    //delete ends
    $scope.ref.child('repertory').child('symptoms').orderByChild('parent').equalTo(id).once('value', function(snapshot) {
      if (!snapshot.exists()) {
         return;
      }
      angular.forEach(snapshot.val(), function(value, key) {
        console.log(key, ', ', value);
        recDelete(key);
      });
    });
  }
  
  $scope.deleteSymptom = function(id)
  {
    var a = confirm('do you really want to delete this symptom, all symptoms under it will also get removed?');
    if (!a) return;
    recDelete(id);
    //$scope.ref.child('repertory').child('symptoms').child(id).remove();
  };
  
  $scope.subSymptoms = function()
  {
    var text = $scope.frm.page;
    //console.log(text);
    //type 1
    /*
    <p><a NAME="VERTIGO">VERTIGO</b> </a>: remedies</p>
    */
    var counter = $scope.addFrm.priority;
    console.log('counter starts from ', counter);
    var matchPattern;
    var matches = [];
    var regexp = new RegExp(/<p>(.*): (.*)<\/p>/, 'g');
    while (matchPattern = regexp.exec(text)) {
      //console.log(matchPattern);
      var data = {};
      data.symptom = matchPattern[1];
      data.symptom = data.symptom.replace(/<\/?[^>]+(>|$)/g, "");
      data.symptom = data.symptom.toLowerCase().trim();
      data.raw = matchPattern[2];
      data.remedies = analyseThis(data);
      data.parent = $routeParams.parent;
      data.priority = counter;
      data.chapter = $scope.addFrm.chapter;
      data.chain = $scope.addFrm.chain;
      delete data.raw;
      console.log(data);
      $scope.ref.child('repertory').child('symptoms').push(data);
      
      counter++;
      matches.push(matchPattern);
    }
    console.log(matches);
    $scope.frm.page = '';
  };
  
  
  $scope.parsePage = function()
  {
    var text = $scope.frm.page;
    console.log(text);
    
    var matchPattern;
    var matches = [];
    var regexp = new RegExp(/<p>(.*)<\/b>(.*)\:/, 'g');
    while (matchPattern = regexp.exec(text)) {
      console.log('matchPattern: ', matchPattern);
      matches.push(matchPattern);
    }
    console.log(matches);
  };
  
}]);