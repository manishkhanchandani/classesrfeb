angular.module('myApp').service('dataService', ['$http', function($http) {
  
  this.get = function(url, callback, callbackFailed, cache) {
      $http({
        method: 'GET',
        url: url,
        cache: cache
      }).then(callback, callbackFailed);
  };
  
  this.post = function(url, data, callback, callbackFailed, cache) {
      $http({
        method: 'POST',
        url: url,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        cache: cache
        //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //data: 'email='+encodeURIComponent($scope.frm.email)+'&question='+encodeURIComponent($scope.frm.question)+'&name='+encodeURIComponent($scope.frm.name)
      }).then(callback, callbackFailed);
  };
}]);

