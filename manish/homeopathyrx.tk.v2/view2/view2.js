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
  .when('/addRepertory2/:chapter/:start/:end', {
    templateUrl: 'view2/repertory2.html',
    controller: 'ViewRepertory2Ctrl'
  })
  .when('/addRepertory2/:chapter/', {
    templateUrl: 'view2/repertory2.html',
    controller: 'ViewRepertory2Ctrl'
  })
  .when('/addRepertory2', {
    templateUrl: 'view2/repertory2.html',
    controller: 'ViewRepertory2Ctrl'
  })
  
  
  .when('/repertory/:chapter/:start', {
    templateUrl: 'view2/view3.html',
    controller: 'RepertoryNewCtrl'
  })
  .when('/repertory/:chapter', {
    templateUrl: 'view2/view3.html',
    controller: 'RepertoryNewCtrl'
  })
  .when('/repertory', {
    templateUrl: 'view2/view3.html',
    controller: 'RepertoryNewCtrl'
  })
  
  .when('/repertoryOld/:chapter/:parent', {
    templateUrl: 'view2/view2.html',
    controller: 'RepertoryCtrl'
  })
  .when('/repertoryOld', {
    templateUrl: 'view2/view2.html',
    controller: 'RepertoryCtrl'
  })
  /*.when('/eg', {
    templateUrl: 'view2/eg.html',
    controller: 'BasicExampleCtrl'
  })*/
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
    if (!snapshot.exists()) return;
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
      if(!$scope.$$phase) $scope.$apply();
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
  $scope.loading = false;
  if ($routeParams.chapter && $routeParams.parent) {
    //$scope.records = JSON.parse(localStorage.getItem($routeParams.chapter));
  
    $scope.loading = true;
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
                  
                  angular.forEach(returnRec[$routeParams.parent][key].child[k2].child[k3].child, function(v4, k4) {
                    if (returnRec[v4.$id]) {
                      returnRec[$routeParams.parent][key].child[k2].child[k3].child[k4].child = returnRec[v4.$id];
                    }
                  });
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
      
      $scope.loading = false;
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
  
}])


.controller('ViewRepertory2Ctrl', ['$scope', '$firebaseArray', '$filter', '$routeParams', function($scope, $firebaseArray, $filter, $routeParams) {
  console.log('routeparams: ', $routeParams);
  $scope.frm = {};
  $scope.frm.sym = {parent: {}, symptom: {}, img: {}, ref: {}, refId: {}};
  
  $scope.start = 1;
  $scope.end = 100;
  if ($routeParams.start) $scope.start = parseInt($routeParams.start);
  if ($routeParams.end) $scope.end = parseInt($routeParams.end);
  
  //adding new chapter if not exists
  $scope.chapterPriority = 1;
  $scope.chapter = null;
  if ($routeParams.chapter) {
    $scope.chapter = decodeURIComponent($routeParams.chapter);
    $scope.chapter = $scope.chapter.toLowerCase().trim();
    $scope.ref.child('repertory2').child('kent').child('chapters').child(btoa($scope.chapter)).once("value", function(snapshot) {
      console.log('chapter: ', snapshot.val());
      if (!snapshot.exists()) {
        console.log('adding chapter');
        var arr = {chapter: $scope.chapter, timestamp: Firebase.ServerValue.TIMESTAMP, priority: 0};
        $scope.ref.child('repertory2').child('kent').child('chapters').child(btoa($scope.chapter)).set(arr);
      }
    });
  }
  
  $scope.addChapter = function()
  {
     if (!$scope.frm.chapterName) return;
     $scope.frm.chapterName = $scope.frm.chapterName.toLowerCase().trim();
     var arr = {chapter: $scope.frm.chapterName, timestamp: Firebase.ServerValue.TIMESTAMP, priority: $scope.chapterPriority};
     console.log('chapter: ', arr);
     $scope.ref.child('repertory2').child('kent').child('chapters').child(btoa($scope.frm.chapterName)).set(arr);
     $scope.frm.chapterName = '';
  };
  //end adding new chapter if not exists
  
  //chain
  //get the chain
  $scope.chain = null;
  $scope.mainChain = [];
  function saveChain(id, parent, key) {
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(key).once("value", function(snapshot) {
      var res = snapshot.val();
      res.id = snapshot.key();
      $scope.chain.push(res);
      if (res.parent == 0) {
        $scope.chain.reverse();
        //adding chain for page
        if ($scope.chain) {
          angular.forEach($scope.chain, function(value, key) {
            var chain = {id: value.id, parent: value.parent, symptom: value.symptom};
            $scope.mainChain.push(chain);
          });
          console.log('mainChain: ', id, ', ', $scope.mainChain);
          $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(id).update({chain: $scope.mainChain, parent: parent});
        }
    
        if(!$scope.$$phase) $scope.$apply();
        return;
      } else {
        saveChain(id, parent, res.parent);
      }
    });
  }
  //chain
  
  //getting all chapters
  $scope.chapters = [];
  $scope.ref.child('repertory2').child('kent').child('chapters').on('value', function(snapshot) {
    console.log(snapshot.val());
    var c = 0;
    $scope.chapters = [];
    angular.forEach(snapshot.val(), function(value, key) {
      value.id = key;
      $scope.chapters.push(value);
      c++;
    });
    $scope.chapterPriority = c + 1;
    console.log('len: ', $scope.chapterPriority);
    console.log('chapters: ', $scope.chapters);
  });
  
  
  //end getting all chapters

  $scope.repertory = null;
  $scope.parent = ($routeParams.parent) ? $routeParams.parent : 0;
  $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).orderByChild('priority').startAt($scope.start).endAt($scope.end).on("value", function(snapshot) {
    $scope.repertory = [];
    angular.forEach(snapshot.val(), function(item, key) {
      item.id = key;
      $scope.repertory.push(item);
      $scope.frm.sym.parent[key] = item.parent;
      $scope.frm.sym.symptom[key] = item.symptom;
      $scope.frm.sym.img[key] = item.img;
      $scope.frm.sym.ref[key] = item.ref;
      $scope.frm.sym.refId[key] = item.refId;
    });
    $scope.priority = $scope.repertory.length + 1;
    console.log('repertory: ', $scope.repertory);
    console.log('priority: ', $scope.priority);
    if(!$scope.$$phase) $scope.$apply();
  });
  //end
  
  $scope.updateRecord = function(it) {
    console.log('it: ', it);
    console.log('id: ', it.id);
    console.log('parent: ', $scope.frm.sym.parent[it.id]);
    $scope.chain = [];
    $scope.mainChain = [];
    saveChain(it.id, $scope.frm.sym.parent[it.id], $scope.frm.sym.parent[it.id]);
  };
  
  $scope.updateSymptom = function(it) {
    console.log('it: ', it);
    console.log('symptom: ', $scope.frm.sym.symptom[it.id]);
    var data = {symptom: $scope.frm.sym.symptom[it.id], img: ($scope.frm.sym.img[it.id] ? $scope.frm.sym.img[it.id] : ''), ref: ($scope.frm.sym.ref[it.id] ? $scope.frm.sym.ref[it.id] : ''), refId: ($scope.frm.sym.refId[it.id] ? $scope.frm.sym.refId[it.id] : '')};
    console.log('data: ', data);
    if ($scope.frm.sym.symptom[it.id]) {
      $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(it.id).update(data);
    }
  };
  
  //adding symptoms
  //analyse remedy
  function analyseThis(reference)
  {
    
    var obj = {};
    var arr = reference.split(/,/g);
    var regexp;
    angular.forEach(arr, function(value, key) {
      value = value.toLowerCase().trim();
      regexp = new RegExp(/<i><font color=\"#0000ff\">(.*)</, 'g');
      var matchRec2 = regexp.exec(value);
      
      regexp = new RegExp(/<font color=\"#0000ff\">(.*)<\/font>/, 'g');
      var matchRec2a = regexp.exec(value);
      
      regexp = new RegExp(/<b><font color="#ff0000">(.*)</, 'g');
      var matchRec3 = regexp.exec(value);
      
      regexp = new RegExp(/<b><font color="#ff0000">(.*)<\/b>/, 'g');
      var matchRec4 = regexp.exec(value);
      
      regexp = new RegExp(/<font color=\"#0000ff\">(.*)$/, 'g');
      var matchRec5 = regexp.exec(value);
      
      regexp = new RegExp(/<b><font color="#ff0000">(.*)$/, 'g');
      var matchRec6 = regexp.exec(value);
      
      var cleanText;
      if (matchRec2) {
        cleanText = matchRec2[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 2};
        console.log('inside matchRec2', obj[btoa(cleanText)]);
      } else if (matchRec3) {
        cleanText = matchRec3[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 3};
        console.log('inside matchRec3', obj[btoa(cleanText)]);
      } else if (matchRec2a) {
        cleanText = matchRec2a[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 2};
        console.log('inside matchRec2a', obj[btoa(cleanText)]);
      } else if (matchRec4) {
        cleanText = matchRec4[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 3};
        console.log('inside matchRec4', obj[btoa(cleanText)]);
      } else if (matchRec5) {
        cleanText = matchRec5[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 2};
        console.log('inside matchRec5', obj[btoa(cleanText)]);
      } else if (matchRec6) {
        cleanText = matchRec6[1].replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 3};
        console.log('inside matchRec6', obj[btoa(cleanText)]);
      } else {
        cleanText = value.replace(/<\/?[^>]+(>|$)/g, "");
        obj[btoa(cleanText)] = {remedy: cleanText, points: 1};
        console.log('inside raw', obj[btoa(cleanText)]);
      }
    });
    return obj;
  }
  
  $scope.parseSymptoms = function() {
    var text = $scope.frm.page;
    var counter = $scope.priority;
    console.log('counter starts from ', counter);
    var matchPattern;
    var matches = [];
    var regexp = new RegExp(/<p>(.*)<\/p>/, 'g');
    while (matchPattern = regexp.exec(text)) {
      if (matchPattern[1] === '----------') {
        continue;
      }
      if (matchPattern[1].substr(0, 7) === '<a HREF') {
        continue;  
      }
      if (matchPattern[1].substr(0, 9) === 'Copyright') {
        continue;  
      }
      if (matchPattern[1].substr(0, 10) === '----------') {
        continue;  
      }
      console.log('matchPattern: ', matchPattern);
      var data = {};
      //split on :
      var tmp = matchPattern[1].split(':');
      console.log('Length: ', tmp.length);
      if (tmp.length == 2) {
        console.log(tmp);
        data.symptom = tmp[0];
        var remedy = analyseThis(tmp[1]);
        console.log('remedies: ', remedy);
        data.remedies = remedy;
      } else {
        data.symptom = matchPattern[1];
        data.remedies = -1;
      }
      
      data.symptom = data.symptom.replace(/<\/?[^>]+(>|$)/g, "");
      data.symptom = data.symptom.toLowerCase().trim();
      data.parent = 0;
      data.priority = counter;
      data.chain = -1;
      console.log('data: ', data);
      $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).push(data);
      counter++;
      matches.push(matchPattern);
    }//end while
    $scope.frm.page = '';
  };
  
  $scope.deleteAll = function()
  {
    var a = confirm('do you want to delete all records in this chapter?');
    if (!a) return;
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).remove();
  }
  //deleting
  function recDelete(id) {
    //delete id
    console.log('deleting id: ', id);
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(id).remove();
    
    //delete ends
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).orderByChild('parent').equalTo(id).once('value', function(snapshot) {
      console.log('delete child: ', snapshot.exists());
      if (!snapshot.exists()) {
         return;
      }
      angular.forEach(snapshot.val(), function(value, key) {
        console.log('delete keys: ', key, ', ', value);
        recDelete(key);
      });
    });
  }
  
  $scope.deleteSymptom = function(id)
  {
    //var a = confirm('do you really want to delete this symptom, all symptoms under it will also get removed?');
    //if (!a) return;
    recDelete(id);
  };
  
  //reset priority
  $scope.resetPriority = function()
  {
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).orderByChild('priority').once('value', function(snapshot) {
      if (!snapshot.exists()) {
         return;
      }
      console.log('reset data: ', snapshot.val());
      var counter = 1;
      angular.forEach(snapshot.val(), function(value, key) {
        console.log('reset keys: ', key, ', ', value);
        $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(key).child('priority').set(counter);
        counter++;
      });
    });
  };
  
  
  $scope.resetPrioritySpecific = function(id, priority)
  {
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).orderByChild('priority').startAt(id).once('value', function(snapshot) {
      console.log(snapshot.val());
      if (!snapshot.exists()) {
         return;
      }
      var counter = priority + 1
      console.log(counter);
      return;
      angular.forEach(snapshot.val(), function(value, key) {
        console.log('reset keys: ', key, ', ', value);
        $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).child(key).child('priority').set(counter);
        counter++;
      });
    });
  };
  
}])


.controller('RepertoryNewCtrl', ['$scope', '$firebaseArray', '$filter', '$routeParams', '$location', function($scope, $firebaseArray, $filter, $routeParams, $location) {
  //console.log($routeParams);
  
  //adding new chapter if not exists
  $scope.chapter = null;
  if ($routeParams.chapter) {
    $scope.chapter = decodeURIComponent($routeParams.chapter);
    $scope.chapter = $scope.chapter.toLowerCase().trim();
  }
  
  //chapters
  var chapterId = 0;
  $scope.chapters = $firebaseArray($scope.ref.child('repertory2').child('kent').child('chapters').orderByChild('priority'));
  
  $scope.frm = {};
  $scope.showChapters = {};
  $scope.chapters.$loaded().then(function (arrR) {
      angular.forEach(arrR, function(value, key) {
        $scope.showChapters[key] = value;
        $scope.showChapters[key].chapter = $filter('capitalize')(value.chapter, true);
        if ($routeParams.chapter) {
          if ($scope.frm.chapter) return;
          if (value.chapter.toLowerCase().trim() === $scope.chapter) {
            $scope.frm.chapter = value;
            console.log('frm.chapter: ', $scope.frm.chapter);
          }
        }
      });
  });
  
  $scope.updateChapter = function()
  {
    $location.path('repertory/'+encodeURIComponent($scope.frm.chapter.chapter));
  }
  
  //end chapters
  
  //record symptoms
  
  //get the chain
  $scope.recordedSymptoms = null;
  
  $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).on('value', function(snapshot) {
    //console.log(snapshot.val());
    $scope.recordedSymptoms = [];
    $scope.recordedRemedies = {};
    if (!snapshot.exists()) return;
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
      if(!$scope.$$phase) $scope.$apply();
    });
  });
  
  $scope.addsym = function(rec)
  {
    if (!$scope.userData) return;
    var id = rec.id;
    var data = {symptom: rec.symptom, parent: rec.parent, id: rec.id, chain: rec.chain, chapter: $scope.chapter};
    
    //saving remedies
    data.remedies = {};
    if (rec.remedies) {
      angular.forEach(rec.remedies, function (v, k) {
        data.remedies[k] = {remedy: v.remedy, points: v.points};
      });
    }//get remedy
    $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).child(id).set(data);
    if(!$scope.$$phase) $scope.$apply();
  };
  
  $scope.delSym = function(id) {
    if (!$scope.userData) return;
    //console.log(id);
    $scope.ref.child('repertory').child('tempCase').child($scope.userData.uid).child(id).remove();
    if(!$scope.$$phase) $scope.$apply();
  };
  //record ends
  
  //showing repertory
  $scope.start = 1;
  if ($routeParams.start) {
    $scope.start = parseInt($routeParams.start);
  }
  $scope.end = $scope.start + 99;
  var bigCounter = 2;
  
  $scope.refreshData = function(startNum, endNum) {
    if (!$scope.chapter) return;
    $scope.loading = true;
    //console.log('st: ', startNum, ', en: ', endNum);
    var storageKey = 'repertory'+bigCounter+'_'+$scope.start+'_'+btoa($scope.chapter);
    //console.log('storage key: ', storageKey);
    //var profile = localStorage.getItem(storageKey);
    var profile = '';
    if (profile) {
      document.body.scrollTop;
      $scope.records = JSON.parse(profile);
      $scope.loading = false;
      if(!$scope.$$phase) $scope.$apply();
      return;
    }//end if profile
    
    var returnRec = {};
    $scope.ref.child('repertory2').child('kent').child('symptoms').child(btoa($scope.chapter)).orderByChild('priority').startAt(startNum).endAt(endNum).once("value", function(snapshot) {
      //console.log('1. snapshot: ', snapshot.val());
      angular.forEach(snapshot.val(), function(value, key) {
        value.id = key;
        if (!returnRec[value.parent]) {
          returnRec[value.parent] = [];  
        }
        returnRec[value.parent].push(value);  
      });
      //console.log('2. returnRec: ', returnRec);
      //start
      var rootParent = 0;
      if (!returnRec[rootParent]) {
        $scope.loading = false;
        if(!$scope.$$phase) $scope.$apply();
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
      //console.log('3. records: ', $scope.records);
      localStorage.setItem(storageKey, JSON.stringify($scope.records));
        
      $scope.loading = false;
      if(!$scope.$$phase) $scope.$apply();
    });
  };
  
  $scope.refreshData($scope.start, $scope.end);
  
}])

/*
.controller('BasicExampleCtrl', ['$scope', function ($scope) {
      $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
      };

      $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
      };

      $scope.data = [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          },
          {
            'id': 12,
            'title': 'node1.2',
            'nodes': []
          }
        ]
      }, {
        'id': 2,
        'title': 'node2',
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'nodes': [
          {
            'id': 21,
            'title': 'node2.1',
            'nodes': []
          },
          {
            'id': 22,
            'title': 'node2.2',
            'nodes': []
          }
        ]
      }, {
        'id': 3,
        'title': 'node3',
        'nodes': [
          {
            'id': 31,
            'title': 'node3.1',
            'nodes': []
          }
        ]
      }];
      
      //drop confirmation
      $scope.treeOptions = {
        beforeDrop : function (e) {
          console.log('source: ', e.source.nodeScope.$modelValue);
          console.log('destination: ', e.source.nodeScope.$modelValue);
          
          

        }//end beforedrop
      };//end treeOptions
    }])*/

;

