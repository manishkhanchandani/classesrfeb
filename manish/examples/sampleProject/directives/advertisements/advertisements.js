(function() {
  var moduleName = 'advertisementModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('advertisments', advertisements);
    

  function advertisements() {
    return {
          scope: {
          },
          templateUrl: 'directives/advertisements/advertisements.html',
          link: function(scope, elem, attrs) {
            
            //location starts
            scope.mapAdOptions = {
              types: 'geocode'
            };
        
            scope.adDetails = {};
            //location ends
            //show add form
            scope.addNew = false;
            scope.addNewForm = function() {
              if (scope.addNew) {
                scope.addNew = false;
              } else {
                scope.addNew = true;
              }
            };
            //show add form ends
            
            
          }//end link
    };//end return
  }//end function pagination()

}());