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
        })
        .when('/lessons/search', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchLessonCtrl'
        })
        .when('/lessons/search/:page/:keyword/:lat/:lng/:radius', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchLessonCtrl'
        })
        .when('/lessons/search/:page/:lat/:lng/:radius', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchLessonCtrl'
        })
        .when('/lessons/search/:page/:keyword', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchLessonCtrl'
        })
        .when('/lessons/search/:page', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchLessonCtrl'
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
            
            $scope.submitCreateLessonsForm = function() {
                //call api service to submit the form
                console.log($scope.loggedInUserData.token);
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUserData.token+'&path=/abhi/lessons&tid=1';
                

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
    .controller('ViewImagesLessonCtrl', ['$scope','$routeParams','dataService', function($scope,$routeParams,dataService) {
            
             $scope.images = null;
             function successGetData(response){
                //console.log('success: ', response.data.data.detailsFull.images);
                $scope.images = response.data.data.detailsFull.images;
            }
            
            function failureGetData(response){
                console.log('failed: ', response);
            }
            
            $scope.getData = function(){
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
                dataService.get(url, successGetData, failureGetData, false);
            };
            $scope.getData();
            
            //add image in database
            function addImageSuccess(response){
                console.log('success: ', response);
                $scope.frm = {};
                $scope.getData();
            }
            
            function addImageFailure(response){
                console.log('failed: ', response);
            }
            
            
            $scope.addImage = function(){
                console.log($scope.frm);
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.loggedInUserData.token+'&key=images&id='+$routeParams.id;
                var postData = '';
                postData = postData + '&param='+encodeURIComponent($scope.frm.image);

                console.log(url);
                console.log(postData);  

                dataService.post(url, postData, addImageSuccess, addImageFailure);
            };
            
    }])

    .controller('ViewSearchLessonCtrl', ['$scope','dataService','$location','$routeParams', function($scope,dataService,$location,$routeParams) {
            
            //console.log($routeParams);
            $scope.frm={};
            $scope.frm.radius = 30;
            //location starts
            $scope.mapOptions = {
              types: 'geocode'
            };

            $scope.details = {};
            //update $scope.frm from $routeParams
            if($routeParams.keyword){
                $scope.frm.keyword = $routeParams.keyword;
            }
            
            $scope.results = {};
            function successGetData(response){
                console.log('success: ', response.data.data.results);
                $scope.results = response.data.data.results;
            }
            
            function failureGetData(response){
                console.log('failed: ', response);
            }
            
            $scope.getData = function(){
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/abhi/lessons';
                if($scope.frm.keyword){
                    url = url + '&q=' + encodeURIComponent($scope.frm.keyword);
                }
                if($scope.location){
                    url = url + '&lat' + $scope.details.components.lat + '&lng=' +$scope.details.components.lng + '&r=' + encodeURIComponent($scope.frm.radius);
                }
                dataService.get(url, successGetData, failureGetData,true);
            };
            $scope.getData();
            
            $scope.constructURL = function(){
                var url = '/lessons/search/0';
    
                if ($scope.frm.keyword) {
                  url = url + '/' + encodeURIComponent($scope.frm.keyword);
                }

                if ($scope.location) {
                  if (!$scope.frm.radius) {
                    $scope.frm.radius = 30;
                  }

                  url = url + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng + '/' + encodeURIComponent($scope.frm.radius);
                }
                 //console.log(url);
                $location.path(url);
            };
    }]);