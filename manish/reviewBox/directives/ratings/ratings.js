(function() {
  var moduleName = 'ratingsModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('starRating', starRating);
    

  function starRating() {
    return {
          scope: {
            ratingValue : '=',
            max : '=',
            onRatingSelected : '&'
          },
          templateUrl: 'directives/ratings/ratings.html',
          link: function(scope, elem, attrs) {
            var updateStars = function() {
              scope.stars = [];
              for ( var i = 0; i < scope.max; i++) {
               scope.stars.push({
                filled : i < scope.ratingValue
               });
              }
             };
             
             scope.toggle = function(index) {
              scope.ratingValue = index + 1;
              scope.onRatingSelected({
               rating : index + 1
              });
             };
             
             scope.$watch('ratingValue',
              function(oldVal, newVal) {
               if (newVal) {
                updateStars();
               }
              }
             );
            
          }//end link
    };//end return
  }//end function pagination()

}());