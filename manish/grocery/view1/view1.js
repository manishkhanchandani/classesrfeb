'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/profile', {
    templateUrl: 'view1/profile.html',
    controller: 'ProfileCtrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View2Ctrl'
  })
  .when('/examples/create', {
    templateUrl: 'view1/examples/create.html',
    controller: 'ExamplesCreate'
  })
  .when('/examples/list/:lat/:lng/:radius/:loc/:q/:page', {
    templateUrl: 'view1/examples/list.html',
    controller: 'ExamplesList'
  })
  .when('/examples/list/:page', {
    templateUrl: 'view1/examples/list.html',
    controller: 'ExamplesList'
  })
  .when('/examples/list', {
    templateUrl: 'view1/examples/list.html',
    controller: 'ExamplesList'
  })
  
  ;
}])

.controller('View1Ctrl', ['$scope', '$location', '$firebaseObject', function($scope, $location, $firebaseObject) {

  console.log($scope.userData);
  if (!($scope.userData)) {
    alert('please login first');
    return false;
  }
  var ref = firebase.database().ref().child('grocery').child($scope.userData.uid);
  
  $scope.removeData = function(key) {
    var a = confirm('do you really want to delete this?');
    if (!a) {
      return;
    }
    ref.child('saved').child(key).remove();
  };
  
  $scope.loadData = function(key) {
    clear();
    ref.child('saved').child(key).once('value').then(function(snapshot) {
      var result = snapshot.val();
      if (result.products) {
        angular.forEach(result.products, function(value, key) {
          ref.child('products').child(value.key).update({total: value.total, quantity: value.quantity, key: value.key, price: value.price, product: value.product});
        });
      }
      ref.child('tax').set(result.tax);
      ref.child('total').set(result.total);
    });
  }
  
  function clear() {
    if ($scope.data.products) {
      angular.forEach($scope.data.products, function(value, key) {
        ref.child('products').child(value.key).update({total: 0, quantity: 0});
      });
    }
    
    ref.child('total').set(0);
    ref.child('tax').set(0);
  }
  
  $scope.clearAll = function() {
    var a = confirm('do you really want to clear all records?');
    if (!a) {
      return;
    }
    
    clear();
  };
  
  $scope.save = function() {
    console.log('store name: ', $scope.store);
    console.log('datetime: ', $scope.datetime);
    console.log('data: ', $scope.data);
    
    var details = {};
    details.store = $scope.store;
    details.datetime = $scope.datetime;
    details.products = {};
    if ($scope.data.products) {
      angular.forEach($scope.data.products, function(value, key) {
        details.products[key] = {key: value.key, price: value.price, product: value.product, quantity: value.quantity, total: value.total};
      });
    }
    details.tax = $scope.data.tax;
    details.total = $scope.data.total;
    console.log(details);
    ref.child('saved').push(details);
  }
  $scope.removeProduct = function(rec) {
    var a = confirm('do you really want to delete this record?');
    if (!a) {
      return;
    }
    
    ref.child('products').child(rec.key).remove();
  };
  
  $scope.addProduct = function() {
    console.log($scope);
    var rec = {};
    rec[btoa($scope.product)] = {product: $scope.product, price: $scope.price, key: btoa($scope.product), quantity: 1, total: $scope.price};
    ref.child('products').update(rec);
    $scope.product = '';
    $scope.price = '';
  };
  
  
  $scope.updatePrice = function(data) {
    var total = 0;
    angular.forEach(data, function(value, key) {
      total = total + value.price * value.quantity;
      ref.child('products').child(value.key).update({total: value.price * value.quantity});
    });
    total = total + parseFloat($scope.data.tax);
    ref.child('total').set(total);
  };
  
  
  var obj = $firebaseObject(ref);
  // to take an action after the data loads, use the $loaded() promise
  obj.$loaded().then(function() {
    //console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

   // To iterate the key/value pairs of the object, use angular.forEach()
    var total = 0;
   angular.forEach(obj.products, function(value, key) {
      //console.log(key, value);
      total = total + value.price * value.quantity;
   });
    ref.child('total').set(total);
  });

  // To make the data available in the DOM, assign it to $scope
  $scope.data = obj;

  // For three-way data bindings, bind it to the scope instead
  obj.$bindTo($scope, "data");
  
  var obj2 = $firebaseObject(ref.child('saved'));
  $scope.savedList = obj2;
  // For three-way data bindings, bind it to the scope instead
  obj2.$bindTo($scope, "savedList");

}])
.controller('View2Ctrl', ['$scope', 'dataService', function($scope, dataService) {
  
  
  function failurelocation(error) {
		console.log('err: ', error);
	}
  
  if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var latLng = new google.maps.LatLng(latitude,longitude);
			var geocoder;
			geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        console.log(results);
        console.log(results[0]);
        console.log(results[0].formatted_address);
			});
		}, failurelocation, {maximumAge:600000});
  }
}])
.controller('ProfileCtrl', ['$scope', function($scope) {
  console.log($scope);
}])

.controller('ExamplesCreate', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
  if (!$scope.userData) {
    console.log('user is not logged in so cannot post');
    $location.path('/');
    return;
  }
  
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };
  
  //initializing
  $scope.frm = {};
  $scope.details = {};
  $scope.createStatus = null;
  $scope.frm.images = [];
  $scope.frm.youtube = [];
  
  $scope.addImage = function() {
    $scope.frm.images.push($scope.imagetxt);
    $scope.imagetxt = '';
  };
  
  $scope.addYoutube = function() {
      $scope.frm.youtube.push($scope.videotxt);
      $scope.videotxt = '';
  };
  
  
  $scope.submitCreateForm = function() {
    console.log('frm: ', $scope.frm);
    console.log('details: ', $scope.details);
    $scope.createStatus = '';
    var obj = {};
    obj.node_data = {};
    angular.copy($scope.frm, obj.node_data);
    obj.node_lat = $scope.details.components.lat;
    obj.node_lng = $scope.details.components.lng;
    obj.node_title = $scope.frm.title;
    obj.node_group_id = 1;
    var myDate = new Date();
    var curDate = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' +  myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
    obj.node_created = curDate;
    obj.node_updated = curDate;
    obj.node_deleted = 0;
    obj.uid = $scope.userData.uid;
    obj.parent_id = null;
    obj.node_data.components = $scope.details.components;
    
    console.log('obj: ', obj);
    //save to firebase
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
    obj.node_id = newPostKey;
    console.log('new key is ', newPostKey);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = obj;
    firebase.database().ref().update(updates);
    
    var myDate = new Date();
    var curDate = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    
    //save to dabase
    var url = 'https://4157ff7b.servage-customer.net/nodesApi.php?action=Add&date='+curDate;
    console.log(url);
    dataService.postJson(url, obj, function(r) {console.log('success', r); $scope.frm = {}; $scope.frm.location = obj.location; $scope.createStatus = 'Record Added Successfully';}, function(err) {console.log('error: ', err);});
    
  }
  
}])



.controller('ExamplesList', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
  console.log($routeParams);
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.frm = {radius: 10000, page: 0};
  $scope.details = {};
  $scope.details.components = {};
  //location ends
  
  $scope.loading = false;
  $scope.defaultImage = 'images/noimage.jpg';
  
  
  //https://4157ff7b.servage-customer.net/nodesApi.php?action=Search&lat=37.6624312&lon=-121.8746789&q=my+title
  $scope.constructURL = function() {
    console.log($scope.frm);
    console.log($scope.details);
    var url = '/examples/list';
    url += '/' + ($scope.details.components.lat || 'undefined');
    url += '/' + ($scope.details.components.lng || 'undefined');
    url += '/' + (encodeURIComponent($scope.frm.radius)|| 'undefined');
    url += '/' + (encodeURIComponent($scope.frm.location) || 'undefined');
    url += '/' + (encodeURIComponent($scope.frm.keyword) || 'undefined');
    url += '/' + (encodeURIComponent($scope.frm.page) || 'undefined');
    console.log(url);
    $location.path(url);
    return;
  };
  
  $scope.processData = function(data) {
    console.log('data to process is ', data);
    $scope.completedData = data;
    $scope.loading = false;
    if(!$scope.$$phase) $scope.$apply();
  }//end
  
  $scope.callApi = function() {
    $scope.loading = true;
    var myDate = new Date();
    var curDate = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    var min = myDate.getMinutes();
    var hour = myDate.getHours();
    
    var path = '/'+ curDate + '/hour_' + hour + '/minute_0';
    
    $scope.page = 0;
    
    $scope.frm.urlPrefix = '#/examples/list';
    $scope.frm.urlSufix = '';
    
    var url = 'https://4157ff7b.servage-customer.net/nodesApi.php?';
    //action=Search&lat=37.6624312&lon=-121.8746789&q=my+title
    //action=Search&lat=37.6624312&lon=-121.8746789&q=my+title
    var queryParam = 'action=Search';
    
    if ($routeParams.lat) {
      $scope.frm.urlPrefix += '/' + $routeParams.lat;
      if ($routeParams.lat !== 'undefined') {
        queryParam = queryParam + '&lat='+$routeParams.lat;
        $scope.details.components.lat = $routeParams.lat;
      }
    }
    if ($routeParams.lng) {
      $scope.frm.urlPrefix += '/' + $routeParams.lng;
      if ($routeParams.lng !== 'undefined') {
        queryParam = queryParam + '&lon='+$routeParams.lng;
        $scope.details.components.lng = $routeParams.lng;
      }
    }
    if ($routeParams.radius) {
      $scope.frm.urlPrefix += '/' + $routeParams.radius;
      if ($routeParams.radius !== 'undefined') {
        queryParam = queryParam + '&radius='+$routeParams.radius;
        $scope.frm.radius = $routeParams.radius;
      }
    }
    if ($routeParams.loc) {
      $scope.frm.urlPrefix += '/' + $routeParams.loc;
      if ($routeParams.loc !== 'undefined') {
        $scope.frm.location = decodeURIComponent($routeParams.loc);
      }
    }
    if ($routeParams.q) {
      $scope.frm.urlPrefix += '/' + $routeParams.q;
      if ($routeParams.q !== 'undefined') {
        queryParam = queryParam + '&q='+encodeURIComponent($routeParams.q);
        $scope.frm.keyword = $routeParams.q;
      }
    }
    if ($routeParams.page && $routeParams.page !== 'undefined') {
      queryParam = queryParam + '&page='+encodeURIComponent($routeParams.page);
      $scope.page = $routeParams.page;
    } else {
      queryParam = queryParam + '&page=' + $scope.page;
    }
    
    
    var key = md5(queryParam);
    queryParam += '&hour='+hour + '&min=' + min + '&date=' + curDate;
    
    console.log(url + queryParam);
    console.log('key: ', key);
    //contact firebase
    firebase.database().ref('/nodes' + '/' + curDate + '/' + key).once('value').then(function(snapshot) {
      var a = snapshot.exists();
      if (!a) {
        console.log('from api');
        dataService.get(url + queryParam, function(r) {console.log('success from api', r); $scope.processData(r.data.data); }, function(err) {$scope.loading = false; console.log('error: ', err);});
      } else {
        console.log('from firebase');
        console.log(snapshot.val());
        $scope.processData(snapshot.val());
      }
    });
  };
  
  $scope.callApi();
  
}])
;