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
  
  this.config = function()
  {
    var config = {
      firebaseUrl: 'https://mkgxy.firebaseio.com/projects/homeopathyClassical'
    };
    return config;
  };//end config
  
  this.getChapters = function(callback, callbackFailed)
  {
    this.get('http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_chapters', callback, callbackFailed, true); 
  };
  
}]);

