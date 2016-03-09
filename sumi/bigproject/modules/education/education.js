'use strict';

angular.module('myApp.education', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/education', {
    templateUrl: 'modules/education/education.html',
    controller: 'ViewEducationCtrl'
  })
    .when('/education/create', {
    templateUrl: 'modules/education/create.html',
    controller: 'ViewEducationCreateCtrl'
  })
    .when('/education/create/images/:id', {
    templateUrl: 'modules/education/images.html',
    controller: 'ViewEducationImagesCtrl'
  })
        
        ;
}])

.controller('ViewEducationCtrl',['$scope',function($scope) {
       
}])
.controller('ViewEducationCreateCtrl',['$scope','$location','dataService',function($scope,$location,dataService) {
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
        $location.path('/education/create/images/'+response.data.data.id);
      }

      function addFailure(response) {
        console.log('failure: ', response);
      }
        $scope.submitCreateForm=function(){
           //call to api           
           //$location.path('/education/create/images/1');
           var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/sumi/lessons&tid=1';
     
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
.controller('ViewEducationImagesCtrl',['$scope',function($scope) {
       
}])

;