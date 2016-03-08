'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateCtrl'
  }).when('/lessons/create/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesCtrl'
  })
  ;
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
  
}])

.controller('ViewCreateCtrl', ['$scope', '$location', function($scope, $location) {
  //location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
  $scope.submitCreateForm = function() {
     //call api service to submit the form
     
     //$location.path('/lessons/create/images/1');
     console.log($scope.loggedInUsersData);
     console.log($scope.frm);
     console.log($scope.details);
     
     
     var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token;
     
     console.log(url);
     
     /*&title=This+is+title&path=/test&tid=1&location[latitude]=37.7974273&location[longitude]=-121.21605260000001&location[country]=United+States&location[state]=CA&location[city]=Manteca&location[zip]=&location[place_id]=ChIJCUWMJENAkIARjMxOe6Wp4p0&location[county]=San+Joaquin+County&location[formatted_addr]=Manteca,+CA,+United+States&tags=a,b,c&description=some+description

&data[gender]=Male
*/
    var postData = '';
    postData = postData + '&title='+encodeURIComponent($scope.frm.title);
    
    console.log(postData);
     
  };
}])

.controller('ViewImagesCtrl', ['$scope', function($scope) {
  
}])


;