(function() {
  var moduleName = 'findmyremedyModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('findMyRemedy', ['dataService', '$rootScope', '$routeParams', findMyRemedy]);
    

  function findMyRemedy(dataService, $rootScope, $routeParams) {
    return {
          scope: {
            userData:'=',
            chapters:'='
          },
          templateUrl: 'directives/findmyremedy/findmyremedy.html',
          link: function(scope, elem, attrs) {
            return;
            scope.frm = {};
            scope.frm.step1 = true;
            scope.frm.input = {};
            scope.frm.input[1] = true;
            scope.frm.input[41] = true;
            scope.frm.input[42] = true;
            
            //broadcast
            $rootScope.$on("getAllMySymptoms", function(event, args){
                getAllMySymptoms(args.uid, args.cacheTime, args.cache)
            });
            
            scope.submitStep1 = function() {
              console.log(scope.frm.input);
            };
            
          }//end link
    };//end return
  }//end function mysymptoms()

}());