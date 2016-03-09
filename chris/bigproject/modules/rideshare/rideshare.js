'use strict';
// this is a sub module
angular.module('myApp.rideshare', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/rideshare', {
    templateUrl: 'modules/rideshare/rideshare.html',
    controller: 'ViewRideshareCtrl'
  }).when('/rideshare/create', {
    templateUrl: 'modules/rideshare/create.html',
    controller: 'ViewRideshareCreateCtrl'
  }).when('/rideshare/create/images/:id', {  //need id from page1
    templateUrl: 'modules/rideshare/images.html',
    controller: 'ViewRideshareImagesCtrl'
  });
}])

.controller('ViewRideshareCtrl', ['$scope', function($scope) {

}]).controller('ViewRideshareCreateCtrl', ['$scope', '$location', 'dataService', function($scope,$location, dataService) {
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
    $location.path('/rideshare/create/images/'+response.data.data.id);
  }
  
  function addFailure(response) {
    console.log('failure: ', response);
  }
    $scope.submitCreateForm = function() {
        //url
        var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/chris/rideshare&tid=1';
        console.log(url);
        //postdata
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
        //call api service to submit the form
        dataService.post(url, postData, addSuccess, addFailure);
    };
}]).controller('ViewRideshareImagesCtrl', ['$scope', function($scope) {

}]);