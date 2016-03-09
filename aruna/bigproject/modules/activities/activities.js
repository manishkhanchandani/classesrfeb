'use strict';

angular.module('myApp.activities', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activities', {
    templateUrl: 'modules/activities/activities.html',
    controller: 'ViewAtivitiesCtrl'
  })
  .when('/activities/create', {
    templateUrl: 'modules/activities/create.html',
    controller: 'ViewActivitiesCreateCtrl'
  })
  .when('/activities/create/images/:id', {
    templateUrl: 'modules/activities/images.html',
    controller: 'ViewActivitiesImagesCtrl'
  })
        ;
}])

.controller('ViewActivitiesCtrl', ['$scope',function($scope) {

}])

.controller('ViewActivitiesCreateCtrl', ['$scope','$location','dataService',function($scope,$location,dataService) {
//location starts
  $scope.mapOptions = {
    types: 'geocode'
  };

  $scope.details = {};
  //location ends
  
  function addSuccess(response) {
    console.log('success: ', response);
    console.log('id is : ', response.data.data.id);
    $scope.frm = {};
    $location.path('/activities/create/images/'+response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
  
   $scope.submitActivitiesCreateForm = function() {
     //call api service to submit the form
      var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/aruna/activities&tid=1';
     
     console.log(url);
     
    
    var postData = '';
    postData = postData + '&title='+encodeURIComponent($scope.frm.title);
    postData = postData + '&description='+encodeURIComponent($scope.frm.description);
    
    postData = postData + '&location[latitude]='+encodeURIComponent($scope.details.components.lat);
    postData = postData + '&location[longitude]='+encodeURIComponent($scope.details.components.lng);
    postData = postData + '&location[country]='+encodeURIComponent($scope.details.components.country);
    postData = postData + '&location[state]='+encodeURIComponent($scope.details.components.state);
    postData = postData + '&location[city]='+encodeURIComponent($scope.details.components.city);
    postData = postData + '&location[zip]='+encodeURIComponent($scope.details.components.postal_code);
    postData = postData + '&location[place_id]='+encodeURIComponent($scope.details.place_id);
    postData = postData + '&location[county]='+encodeURIComponent($scope.details.components.county);
    postData = postData + '&location[formatted_addr]='+encodeURIComponent($scope.details.formatted_address);
    
    postData = postData + '&tags='+encodeURIComponent($scope.frm.tags);
    
    postData = postData + '&data[gender]='+encodeURIComponent($scope.frm.gender);
    
    console.log(postData);
    dataService.post(url, postData, addSuccess, addFailure);
 
   
  };
}])

.controller('ViewActivitiesImagesCtrl', ['$scope',function($scope) {

}]);