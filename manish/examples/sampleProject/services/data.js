angular.module('myApp').service('dataService', ['$http', function($http) {
  
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
  
  this.getDataSingle = function(id, cache, localCache, getSuccess, getFailure) {
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&id='+id;
      if (!cache) {
        url = url + '&noCache=1';
      }
      this.get(url, getSuccess, getFailure, localCache);
    };
  
  this.getDataAll = function(path, cache, localCache, getSuccess, getFailure, params) {
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll';
      if (!cache) {
        url = url + '&noCache=1';
      }
      url = url + '&path='+path;
      this.get(url, getSuccess, getFailure, localCache);
    };
}]);

