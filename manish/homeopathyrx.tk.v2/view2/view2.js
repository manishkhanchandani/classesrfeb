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
  ;
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
  function rFindSymptom(key) {
    $scope.ref.child('repertory').child('symptoms').child(key).once("value", function(snapshot) {
      var res = snapshot.val();
      res.id = snapshot.key();
      $scope.chain.push(res);
      if (res.parent == 0) {
        $scope.chain.reverse();
        $scope.addFrm.chapter = $scope.chain[0].symptom;
        $scope.addFrmEdit.chapter = $scope.chain[0].symptom;
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
    reference.remedies = obj;
    console.log(obj);
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
    console.log($scope.repertory);
    if(!$scope.$$phase) $scope.$apply();
  });
  
  //add new symptom
  $scope.addSymptom = function()
  {
    console.log($scope.addFrm);
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
    
    $scope.addFrm.raw = '';
    $scope.ref.child('repertory').child('symptoms').push($scope.addFrm);
    
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
    $scope.addFrmEdit.raw = '';
    $scope.ref.child('repertory').child('symptoms').child(id).update($scope.addFrmEdit);
    
  }//end addSymptom
  
  
  
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