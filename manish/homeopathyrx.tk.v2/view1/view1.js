'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/rx', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })
  /*.when('/rx/:disease_id/:rid', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })
  .when('/rx/:disease_id', {
    templateUrl: 'view1/rx.html',
    controller: 'ViewRxCtrl'
  })*/
  .when('/paypal/:id', {
    templateUrl: 'view1/paypal.html',
    controller: 'ViewPaypalCtrl'
  })
  .when('/paypal/confirm/:id', {
    templateUrl: 'view1/paypal.html',
    controller: 'ViewPaypalConfirmCtrl'
  })
  .when('/paypal/cancel/:id', {
    templateUrl: 'view1/paypal.html',
    controller: 'ViewPaypalCancelCtrl'
  })
  .when('/cases/my', {
    templateUrl: 'view1/my.html',
    controller: 'ViewMyCasesCtrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('ViewMyCasesCtrl', ['$scope', '$firebaseArray', '$location', function($scope, $firebaseArray, $location) {
  if (!$scope.userData) {
    alert('Please login first');
    $location.path('/');
    return;
  }//end if
  $scope.records = $firebaseArray($scope.ref.child('cases').child($scope.userData.uid));
  
  
  $scope.deleteRecord = function(record) {
    $scope.ref.child('cases').child($scope.userData.uid).child(record.$id).child('deleted').set(true);
  };
  $scope.undo = function(record) {
    $scope.ref.child('cases').child($scope.userData.uid).child(record.$id).child('deleted').set(false);
  };
  
  $scope.deletePermanantly = function(record) {
    var a = confirm('are you sure you want to delete this record, you cannot undo this');
    if (!a) {
      return false;  
    }
    
    $scope.ref.child('cases').child($scope.userData.uid).child(record.$id).remove();
    
  };
}])

.controller('ViewPaypalCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
  if (!$scope.userData) {
    alert('Please login first');
    $location.path('/'); 
    return;
  }
  $scope.id = $routeParams.id;
  $scope.paypal = 1;
  $scope.current = {};
  $scope.current.custom = {uid: $scope.userData.uid, id: $routeParams.id, domain: 'homeopathyrx.tk', module: 'cases'};
  $scope.current.confirmURL = 'http://homeopathyrx.tk/paypal/confirm/' + $routeParams.id;
  $scope.current.cancelURL = 'http://homeopathyrx.tk/paypal/cancel/' + $routeParams.id;
  $scope.current.notifyURL = 'http://homeopathyrx.tk/ipn/ipnNotify.php';
  
}])
.controller('ViewPaypalConfirmCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  console.log($routeParams);
  $scope.paypal = 2;
}])
.controller('ViewPaypalCancelCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  console.log($routeParams);
  $scope.paypal = 3;
}])

.controller('ViewRxCtrl', ['$scope', '$firebaseArray', '$routeParams', '$location', function($scope, $firebaseArray, $routeParams, $location) {
  if (!$scope.userData) {
    alert('Please login first');
    $location.path('/');
    return;
  }//end if
  
  $scope.refHom = new Firebase('https://mkgxy.firebaseio.com/projects/homeopathy');
  $scope.frm = {};
  
  $scope.getCurrentDiseases = function(results) {
    if (!$routeParams.disease_id) {
      return;
    }
    var details = {};
    angular.forEach(results[$routeParams.disease_id].details, function(value, key) {
      if (!value) {
        return;
      }
      details[key] = value;
    });
    $scope.frm.disease = results[$routeParams.disease_id];
    $scope.frm.disease.details = details;
    
    if ($routeParams.rid) {
      $scope.frm.tongue = $scope.frm.disease.details[$routeParams.rid];
    }
  };
  
  var diseases = localStorage.getItem('diseases');
  if (!diseases) {
    diseases = {};
    $scope.results = $firebaseArray($scope.refHom.child('diseases'));
    $scope.results.$loaded().then(function (arrR) {
      angular.forEach(arrR, function(value, key) {
        diseases[value.$id] = value;
      });
      $scope.getCurrentDiseases(diseases);
      $scope.results = diseases;
      localStorage.setItem('diseases', JSON.stringify(diseases));
    });
  } else {
    diseases = JSON.parse(diseases);
    $scope.getCurrentDiseases(diseases);
    $scope.results = diseases;
  }
  
  
  $scope.updateDisease = function() {
    if (!$scope.frm.disease) return;
    //$location.path('/rx/did_'+$scope.frm.disease.disease_id);
  };
  
  $scope.updateRemedy = function() {
    if (!$scope.frm.disease) return;
    if (!$scope.frm.tongue) return;
    //$location.path('/rx/did_'+$scope.frm.disease.disease_id+'/rid_'+$scope.frm.tongue.id);
  };
  $scope.status = null;
  $scope.submitForm = function() {
    if (!$scope.frm.disease) {
      console.log('choose disease');
      $scope.status = 'Choose Disease';
      return;  
    }
    if (!$scope.frm.tongue) {
      console.log('choose tongue');
      $scope.status = 'Choose Tongue';
      return;  
    }
    if (!$scope.frm.name) {
      console.log('choose name');
      $scope.status = 'Enter Name';
      return;  
    }
    if (!$scope.frm.email) {
      console.log('choose email');
      $scope.status = 'Enter Email';
      return;  
    }
    if (!$scope.frm.age) {
      console.log('choose age');
      $scope.status = 'Enter Age';
      return;  
    }
    var data = $scope.frm;
    data.details = {};
    data.details.id = $scope.frm.tongue.id;
    data.details.disease_id = $scope.frm.tongue.disease_id;
    data.details.disease = $scope.frm.disease.disease;
    data.details.pulse = $scope.frm.tongue.pulse;
    data.details.pulse_id = $scope.frm.tongue.pulse_id;
    data.details.tcd = $scope.frm.tongue.tcd;
    data.details.tcd_id = $scope.frm.tongue.tcd_id;
    data.details.title = $scope.frm.tongue.title;
    data.details.tongue = $scope.frm.tongue.tongue;
    data.details.tongue_id = $scope.frm.tongue.tongue_id;
    data.details.tcd_id = $scope.frm.tongue.tcd_id;
    data.parent_id = ($scope.frm.parent_id) ? $scope.frm.parent_id : 0;
    data.timestamp = Firebase.ServerValue.TIMESTAMP;
    delete data.tongue;
    delete data.disease;
    var newPostRef = $scope.ref.child('cases').child($scope.userData.uid).push(data);
    var postID = newPostRef.key();
    $location.path('/paypal/' + postID);
  };
}])
;