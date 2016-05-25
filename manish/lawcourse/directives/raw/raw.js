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

}());