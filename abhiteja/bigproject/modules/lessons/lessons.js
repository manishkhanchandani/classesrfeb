'use strict';

angular.module('myApp.lessons', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/lessons', {
            templateUrl: 'modules/lessons/lessons.html',
            controller: 'ViewLessonsCtrl'
        })
        .when('/lessons/create', {
            templateUrl: 'modules/lessons/create.html',
            controller: 'ViewCreateLessonCtrl'
        })
        .when('/lessons/create/images/:id', {
            templateUrl: 'modules/lessons/images.html',
            controller: 'ViewImagesLessonCtrl'
        });
    }])

    .controller('ViewLessonsCtrl', ['$scope', function($scope) {

    }])
    .controller('ViewCreateLessonCtrl', ['$scope','$location','dataService', function($scope,$location,dataService) {
            //location start
            $scope.mapOptions= {
                types: 'geocode'
            };
            $scope.details = {};
            //location end
            
            function addSuccess(response){
                console.log("success: ",response);
                console.log("id is: ",response.data.data.id);
                $scope.frm={};
                $location.path('/lessons/create/images/'+response.data.data.id);
                
            }
            
            function addFailure(response){
                console.log("Error: ",response);
            }
            
            $scope.submitCreateLessonsForm = function(){
                //$location.path('/lessons/create/images/1');
                
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='
                        +$scope.loggedInUserData.token+'&path=/abhi/lessons&tid=1';
                var postData = "";
                postData = postData + '&title='+encodeURIComponent($scope.frm.title);
                postData = postData + '&description='+encodeURIComponent($scope.frm.description);
                
                postData = postData + '&path=/abhiteja/lessons'; 
                postData = postData + '&tid=1';
                
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
                
                dataService.post(url,postData,addSuccess,addFailure);
                
            };
            
    }])
    .controller('ViewImagesLessonCtrl', ['$scope', function($scope) {
            
                    
            //add image in database
            function addImageSuccess(response){
                console.log('success: ', response);
                $scope.frm = {};
            }
            
            function addImageFailure(response){
                console.log('failed: ', response);
            }
            
            $scope.addImage = function(){
                console.log($scope.frm);
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.loggedInUsersData.token+'&key=images&id='+$routeParams.id;
                var postData = '';
                postData = postData + '&param='+encodeURIComponent($scope.frm.image);

                console.log(url);
                console.log(postData);  

                dataService.post(url, postData, addImageSuccess, addImageFailure);
            };
    }]);