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
    var tid = configs[host].tid;
    return tid;
  };
  
  
  this.config = function() {
    var host = $location.host();
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
  
  this.setFirebase = function(type, ref) {
    var obj = {}
    switch (type) {
      case 'tutors':
        obj.owsRecord = ref.child('tutors').child('records');
        obj.owsLocation = ref.child('tutors').child('location');
        obj.owsTags = ref.child('tutors').child('tags');
        obj.owsOnlyTags = ref.child('tutors').child('onlyTags');
        obj.owsMy = ref.child('tutors').child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          showCharges: true,
          showChargesExplanation: true,
          title: 'Lessons',
          titleHeading: 'Tutor',
          redirectUrl: 'lessons'
        };
        break;
      case 'students':
        obj.owsRecord = ref.child('students').child('records');
        obj.owsLocation = ref.child('students').child('location');
        obj.owsTags = ref.child('students').child('tags');
        obj.owsOnlyTags = ref.child('students').child('onlyTags');
        obj.owsMy = ref.child('students').child('my');
        obj.owsArr = $firebaseArray(obj.owsRecord);
        obj.meta = {
          showCharges: false,
          showChargesExplanation: false,
          title: 'Students',
          titleHeading: 'Student',
          redirectUrl: 'students'
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

}]);

