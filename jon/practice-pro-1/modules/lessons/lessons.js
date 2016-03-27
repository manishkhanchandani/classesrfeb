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
        .when('/lessons/create/images/:id', {
            templateUrl: 'modules/lessons/images.html',
            controller: 'ViewImagesCtrl'
        })
        ;
}])

    .controller('ViewLessonsCtrl', ['$scope', function($scope) {

    }])

    .controller('ViewCreateCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {
        //location starts
        $scope.mapOptions = {
            types: 'geocode'
        };
        console.log($scope);
        $scope.details = {};
        //location ends


        function addSuccess(response) {
            console.log('success: ', response);
            console.log('id is : ', response.data.data.id);
            $scope.frm = {};
            $location.path('/lessons/create/images/'+response.data.data.id);
        }

        function addFailure(response) {
            console.log('failure: ', response);
        }

        $scope.submitCreateForm = function(){
            //call api service to submit the form
            console.log($scope.loggedInUserData);
            console.log($scope.frm);
            console.log($scope.details);

            var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+$scope.loggedInUsersData.token+'&path=/jon/lessons&tid=1';

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
            //$location.path('/lessons/create/images/1');
        };

    }])

    .controller('ViewImagesCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
        console.log('routeParams contains:', $routeParams);
        $scope.id           = $routeParams.id;
        $scope.frm          = {};

        //get Data part
        $scope.images       = null;

        function successGetData(response) {
            console.log('success getData: ', response);
            //get images from the server
            $scope.images = response.data.data.detailsFull.images;
        }

        function failureGetData(response) {
            console.log('failed getData: ', response);
        }

        $scope.getData = function() {
            var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getOne&noCache=1&id='+$routeParams.id;
            dataService.get(url, successGetData, failureGetData, false);
        };

        //call the getdata function
        $scope.getData();


        // add images in the database
        function addImageSuccess(response) {
            console.log('success addImage: ', response);
            $scope.frm = {};
            $scope.getData();
        }

        function addImageFailure(response) {
            console.log('failed addImage: ', response);
        }

        $scope.addImage     = function(){
            console.log($scope.frm);
            var url             = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=updateSingle&access_token='+$scope.loggedInUsersData.token+'&key=images&id='+$routeParams.id;
            var postData        = '';
            postData            = postData + '&param='+encodeURIComponent($scope.frm.image);

            console.log('url is: ', url);
            console.log('post data containts: ', postData);
            dataService.post(url, postData, addImageSuccess, addImageFailure);
        };

    }])
    ;


