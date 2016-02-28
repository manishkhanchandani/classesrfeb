'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  }).when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateLessonsCtrl'
  }).when('/lessons/create/:id', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateLessonsCtrl'
  }).when('/lessons/create/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesLessonsCtrl'
  }).when('/lessons/create/imageurls/:id', {
    templateUrl: 'modules/lessons/imageurls.html',
    controller: 'ViewImagesUrlsLessonsCtrl'
  }).when('/lessons/create/youtube/:id', {
    templateUrl: 'modules/lessons/youtube.html',
    controller: 'ViewYoutubeLessonsCtrl'
  }).when('/lessons/create/links/:id', {
    templateUrl: 'modules/lessons/links.html',
    controller: 'ViewLinksLessonsCtrl'
  }).when('/lessons/my', {
    templateUrl: 'modules/lessons/my.html',
    controller: 'ViewMyLessonsCtrl'
  });
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewCreateLessonsCtrl', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {
    $scope.frmAdd = {};
    
    //location starts
    $scope.mapOptions = {
      types: 'geocode'
    };

    $scope.details = {};
    //location ends
    
    $scope.createError = null;
    
    function addSuccess(response) {
      console.log('success: ', response);
      $location.path('/lessons/create/images/'+response.data.data.id);
      
    }
    
    function addFailure(response) {
      console.log('failure: ', response);
    }
  
    $scope.mainDetails = function() {
      console.log($scope.frmAdd);
      console.log($scope.loggedInUsersData);
      var submitData = '';
      submitData = submitData + '&title='+encodeURIComponent($scope.frmAdd.title);
      //xtra data
      submitData = submitData + '&description='+encodeURIComponent($scope.frmAdd.description);
      //location
      submitData = submitData + '&location[latitude]='+encodeURIComponent($scope.details.components.lat);
      submitData = submitData + '&location[longitude]='+encodeURIComponent($scope.details.components.lng);
      submitData = submitData + '&location[country]='+encodeURIComponent($scope.details.components.country);
      submitData = submitData + '&location[state]='+encodeURIComponent($scope.details.components.state);
      submitData = submitData + '&location[city]='+encodeURIComponent($scope.details.components.city);
      submitData = submitData + '&location[zip]='+($scope.details.components.zip ? encodeURIComponent($scope.details.components.zip) : '');
      submitData = submitData + '&location[place_id]='+encodeURIComponent($scope.details.place_id);
      submitData = submitData + '&location[county]='+encodeURIComponent($scope.details.components.county);
      submitData = submitData + '&location[formatted_addr]='+encodeURIComponent($scope.details.formatted_address);
      
      //tags
      submitData = submitData + '&tags='+($scope.frmAdd.tags ? encodeURIComponent($scope.frmAdd.tags) : '');
      //url
      var access_token = $scope.loggedInUsersData.token;
      var path = '/manish/lessons';
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+access_token+'&path='+path;
      dataService.post(url, submitData, addSuccess, addFailure);
    };
}])
.controller('ViewImagesLessonsCtrl', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  console.log($routeParams);
  $scope.frmAdd = {
    id: $routeParams.id  
  };
  
  console.log($scope.frmAdd);
}])
.controller('ViewImagesUrlsLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewYoutubeLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewLinksLessonsCtrl', ['$scope', function($scope) {
  
}])
.controller('ViewMyLessonsCtrl', ['$scope', function($scope) {
  
}]);