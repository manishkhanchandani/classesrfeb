angular.module('myApp').service('dataService', ['$http', 'configs', '$location', '$firebaseArray', function($http, configs, $location, $firebaseArray) {
  
  this.get = function(url, callback, callbackFailed, cache) {
      $http({
        method: 'GET',
        url: url,
        cache: cache
      }).then(callback, callbackFailed);
  };
  
  //data: 'email='+encodeURIComponent($scope.frm.email)+'&question='+encodeURIComponent($scope.frm.question)+'&name='+encodeURIComponent($scope.frm.name)
  this.post = function(url, data, callback, callbackFailed) {
      $http({
        method: 'POST',
        url: url,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(callback, callbackFailed);
  };
  
  //data: {key: value, key: value}
  this.postJson = function(url, data, callback, callbackFailed) {
      $http({
        method: 'POST',
        url: url,
        data: data
      }).then(callback, callbackFailed);
  };
  
  this.tid = function() {
    var host = $location.host();
    host = host.replace("www.", "");
    var tid = configs[host].tid;
    return tid;
  };
  
  
  this.config = function() {
    var host = $location.host();
    host = host.replace("www.", "");
    var config = configs[host];
    return config;
  };
  
  this.distance = function(lat1, lon1, lat2, lon2, unit)
	{
      var radlat1 = Math.PI * lat1/180
      var radlat2 = Math.PI * lat2/180
      var radlon1 = Math.PI * lon1/180
      var radlon2 = Math.PI * lon2/180
      var theta = lon1-lon2
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
  };
  
  this.ip = function(callback) {
    var url = 'http://api.mkgalaxy.com/ip.php';
    $http({
      method: 'GET',
      url: url
    }).then(function successCallback(response) {
        callback(response);
      }, function errorCallback(response) {
        console.log('error call back for ip');
        console.log(response);
      });
  };
  
  this.setFirebase = function(type, ref) {
    var obj = {};
    var theme = '';
    switch (type) {
      case 'food':
        theme = 'food';
        obj.owsRecord = ref.child(theme).child('records');
        obj.owsLocation = ref.child(theme).child('location');
        obj.owsTags = ref.child(theme).child('tags');
        obj.owsOnlyTags = ref.child(theme).child('onlyTags');
        obj.owsMy = ref.child(theme).child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          title: '24hr-Market',
          titleHeading: '24hr-Market',
          redirectUrl: 'mkt'
        };
      case 'mkt':
        theme = 'mkt';
        obj.owsRecord = ref.child(theme).child('records');
        obj.owsLocation = ref.child(theme).child('location');
        obj.owsTags = ref.child(theme).child('tags');
        obj.owsOnlyTags = ref.child(theme).child('onlyTags');
        obj.owsMy = ref.child(theme).child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          title: '24hr-Market',
          titleHeading: '24hr-Market',
          redirectUrl: 'mkt'
        };
        break;
      case 'tutors':
        theme = 'tutors';
        obj.owsRecord = ref.child(theme).child('records');
        obj.owsLocation = ref.child(theme).child('location');
        obj.owsTags = ref.child(theme).child('tags');
        obj.owsOnlyTags = ref.child(theme).child('onlyTags');
        obj.owsMy = ref.child(theme).child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          showCharges: true,
          showChargesExplanation: true,
          title: 'Lessons',
          titleHeading: 'Tutor',
          redirectUrl: 'lessons',
          beginClass: false,
          availability: false,
          preferred_location: false,
          tutoring_goal: false,
          lesson_frequency: false,
          grade_level: false
        };
        break;
      case 'students':
        theme = 'students';
        obj.owsRecord = ref.child(theme).child('records');
        obj.owsLocation = ref.child(theme).child('location');
        obj.owsTags = ref.child(theme).child('tags');
        obj.owsOnlyTags = ref.child(theme).child('onlyTags');
        obj.owsMy = ref.child(theme).child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          showCharges: false,
          showChargesExplanation: false,
          title: 'Students',
          titleHeading: 'Student',
          redirectUrl: 'students',
          beginClass: true,
          availability: true,
          preferred_location: true,
          tutoring_goal: true,
          lesson_frequency: true,
          grade_level: true
        };
        
        break;  
      case 'massage':
        theme = 'massage';
        obj.owsRecord = ref.child(theme).child('records');
        obj.owsLocation = ref.child(theme).child('location');
        obj.owsTags = ref.child(theme).child('tags');
        obj.owsOnlyTags = ref.child(theme).child('onlyTags');
        obj.owsMy = ref.child(theme).child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        
        theme = 'massageTmp';
        obj.owsRecordTmp = ref.child(theme).child('records');
        obj.owsLocationTmp = ref.child(theme).child('location');
        obj.owsTagsTmp = ref.child(theme).child('tags');
        obj.owsOnlyTagsTmp = ref.child(theme).child('onlyTags');
        obj.owsMyTmp = ref.child(theme).child('my');
        obj.owsArrTmp = $firebaseArray(obj.owsRecordTmp);
        
        theme = 'massageCancelled';
        obj.owsRecordCan = ref.child(theme).child('records');
        obj.owsLocationCan  = ref.child(theme).child('location');
        obj.owsTagsCan  = ref.child(theme).child('tags');
        obj.owsOnlyTagsCan  = ref.child(theme).child('onlyTags');
        obj.owsMyCan  = ref.child(theme).child('my');
        obj.owsArrCan  = $firebaseArray(obj.owsRecordCan);
        
        theme = 'massageDeleted';
        obj.owsRecordDel = ref.child(theme).child('records');
        obj.owsArrDel  = $firebaseArray(obj.owsRecordDel);
        
        obj.meta = {
          redirectUrl: 'massage',
          titleHeading: 'Contact Person',
          amountSharing: {
            admin: 20,
            owner: 40,
            ref1_level1: 10,
            ref1_level2: 5,
            ref1_level3: 3,
            ref1_level4: 2,
            ref2_level1: 5,
            ref2_level2: 5,
            ref2_level3: 5,
            ref2_level4: 5,
          }
        };
        
        break;  
    }
    return obj;
  };
  
  
  this.tutorSetFirebase = function(ref) {
    return this.setFirebase('tutors', ref);
  };
  this.studentSetFirebase = function(ref) {
    return this.setFirebase('students', ref);
  };
  this.massageSetFirebase = function(ref) {
    return this.setFirebase('massage', ref);
  };
  this.mktSetFirebase = function(ref) {
    return this.setFirebase('mkt', ref);
  };
  this.foodSetFirebase = function(ref) {
    return this.setFirebase('food', ref);
  };
  
  this.refChainList = [];
  this.refDefaultUser = 'google:112913147917981568678';
  
  this.refChain = function(ref, uid, callback) {
    var chain = [];
    var referrer = null;
    var s = null;
    var defaultUser = this.refDefaultUser;
    //first link
    ref.child('users').child(uid).once("value", function(snapshot) {
      s = snapshot.val();
      referrer = s.refBy || defaultUser;
      if (referrer) {
        chain[0] = referrer;
        //console.log('level 1: ', referrer);
        //second link
        ref.child('users').child(referrer).once("value", function(snapshot) {
          s = snapshot.val();
          referrer = s.refBy || defaultUser;
          if (referrer) {
            chain[1] = referrer;
            //console.log('level 2: ', referrer);
            //third link
            ref.child('users').child(referrer).once("value", function(snapshot) {
              s = snapshot.val();
              referrer = s.refBy || defaultUser;
              if (referrer) {
                chain[2] = referrer;
                //console.log('level 3: ', referrer);
                //fourth link
                ref.child('users').child(referrer).once("value", function(snapshot) {
                  s = snapshot.val();
                  referrer = s.refBy || defaultUser;
                  if (referrer) {
                    chain[3] = referrer;
                    //console.log('level 4: ', referrer);
                    callback(chain, uid);
                  }
                });
                //fourth link ends
              }
            });
            //third link ends
          }
        });
        //second link ends
      }//end if referrer
    });
    //first link ends
  };

}]);

