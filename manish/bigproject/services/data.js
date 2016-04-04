angular.module('myApp').service('dataService', ['$http', 'configs', '$location', function($http, configs, $location) {
  
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
  
}]);

