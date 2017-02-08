(function() {

  var moduleName = 'favoriteModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, ['firebase', 'ngCookies']);
  }
  
  module
    .directive('saveToFav', ['$cookies', 'configs', saveToFav])
    .directive('getFromFav', ['$cookies', 'configs', getFromFav])
    .directive('showFav', ['$cookies', 'configs', showFav])
    .service('favoriteService', ['$cookies', 'configs', favoriteService])
    ;
  
  function showFav($cookies, configs) {
    return {
          scope: {
            userData: '=',
            uid: '@'
          },
          templateUrl: 'directives/favorite/showFavorite.html',
          link: function(scope, elem, attrs) {
            console.log('sc: ', scope);
            
            scope.addToFav = function(u) {
              console.log('U: ', u);
            };
          }
    }
  }

  function saveToFav($cookies, configs) {
    
  }

  function getFromFav($cookies, configs) {
    
  }
  
  function favoriteService($cookies, configs) {
    
  }
}());