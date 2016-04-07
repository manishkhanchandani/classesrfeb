'use strict';

angular.module('myApp.lessons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	
	.when('/lessons', {
    templateUrl: 'modules/lessons/lessons.html',
    controller: 'ViewLessonsCtrl'
  })
	.when('/lessons/create', {
    templateUrl: 'modules/lessons/create.html',
    controller: 'ViewCreateCtrl'
  })
	.when('/lessons/images/:id', {
    templateUrl: 'modules/lessons/images.html',
    controller: 'ViewImagesCtrl'
  })
	;
}])

.controller('ViewLessonsCtrl', ['$scope', function($scope) {
	
}])
.controller('ViewCreateCtrl', ['$scope', '$location', 'dataService',function($scope, $location, dataService) {
	$scope.mapOptions = {
		types: 'geocode'
	};
	$scope.details = {};	
	$scope.submitCreateForm = function() {
		//Call the api to submit the form form here
		
		
		if($scope.frm) {
			console.log($scope.frm);
		}
		console.log($scope.details);
		if ($scope.$parent.loggedInUsersData) {
			var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token=' + $scope.loggedInUsersData.token + '&path=/raghu/lesson' + '&tid=1';
			console.log(url);
			
		/*
&title=This+is+titlelocation[latitude]=37.7974273&location[longitude]=-121.21605260000001&location[country]=United+States&location[state]=CA&location[city]=Manteca&location[zip]=&location[place_id]=ChIJCUWMJENAkIARjMxOe6Wp4p0&location[county]=San+Joaquin+County&location[formatted_addr]=Manteca,+CA,+United+States&tags=a,b,c&description=some+description

&data[gender]=Male
&data[profession]=engineer
&data[education]=masters
		*/
		
		var postData = '';
		postData = postData + '&title=' + encodeURIComponent($scope.frm.title);
		postData = postData + '&location[latitude]=' + encodeURIComponent($scope.details.components.lat);
		postData = postData + '&location[longitude]=' + encodeURIComponent($scope.details.components.lng);
		postData = postData + '&location[country]=' + encodeURIComponent($scope.details.components.country);
		postData = postData + '&location[state]=' + encodeURIComponent($scope.details.components.state);
		postData = postData + '&location[city]=' + encodeURIComponent($scope.details.components.city);
		postData = postData + '&location[zip]=' + encodeURIComponent($scope.details.components.postal_code);
		postData = postData + '&location[place_id]=' + encodeURIComponent($scope.details.place_id);
		postData = postData + '&location[county]=' + encodeURIComponent($scope.details.components.county);
		postData = postData + '&location[formatted_addr]=' + encodeURIComponent($scope.details.components.formatted_address);
		postData = postData + '&description=' + encodeURIComponent($scope.frm.description);

		if($scope.frm.tags) {
			postData = postData + '&tags=' + encodeURIComponent($scope.frm.tags);
		}
		if($scope.frm.gender) {
			postData = postData + '&data[gender]=' + encodeURIComponent($scope.frm.gender);
		}
	
		console.log(postData);
		
		
		function createAdSuccess(response) {
			console.log('success');
			console.log(response.data.data.id);
			$scope.frm = {};   //Why are we not doing $scope.frm = null
			$location.path('/lessons/images/' + response.data.data.id);
		}
		function createAdFailure(response) {
			console.log('Create lesson add: Post data failure: ', response);
		}
		
		dataService.post(url, postData, createAdSuccess, createAdFailure);
		}
	};
	$scope.details = {};	
}])
.controller('ViewImagesCtrl', ['$scope', function($scope) {
	
}])
;