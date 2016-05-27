(function() {

  var moduleName = 'rawModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('rawAdd', ['dataService', 'configs', rawAdd])
    .directive('rawEdit', ['dataService', 'configs', rawEdit])
    .directive('rawDelete', ['dataService', 'configs', rawDelete])
    .directive('rawList', ['dataService', 'configs', rawList])
    .directive('rawDetail', ['dataService', 'configs', rawDetail])
    ;
    
  
  function rawAdd(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/add.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawEdit(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/edit.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawDelete(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/delete.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawList(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/list.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawDetail(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/detail.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }

}());