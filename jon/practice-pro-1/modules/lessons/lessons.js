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
        .when('/lessons/search', {
            templateUrl: 'modules/lessons/search.html',
            controller: 'ViewSearchCtrl'
        })
        ;
}])


    .controller('ViewSearchCtrl', ['$scope', '$location', 'dataService', '$routeParams', function($scope, $location, dataService, $routeParams) {
        //location starts
        $scope.mapOptions = {
            types: 'geocode'
        };

        $scope.details = {};
        $scope.details.components = {};
        //location ends
        $scope.frm = {};

        $scope.frm.urlPrefix = '#/lessons/search';
        $scope.frm.urlSufix = '';

        //initialize the value of page, i.e. default value
        $scope.frm.page = 0;

        //page from url, if something coming from url, i will use that
        if ($routeParams.page) {
            $scope.frm.page = $routeParams.page;
        }
        //page

        //default keyword
        $scope.frm.keyword = '';

        //check if url has keyword
        if ($routeParams.keyword) {
            $scope.frm.keyword = decodeURIComponent($routeParams.keyword);
            $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.keyword;
        }

        $scope.frm.radius = 30;

        if ($routeParams.lat) {
            $scope.details.components.lat = $routeParams.lat;
            $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lat;
        }

        if ($routeParams.lng) {
            $scope.details.components.lng = $routeParams.lng;
            $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.lng;
        }

        if ($routeParams.radius) {
            $scope.frm.radius = $routeParams.radius;
            $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.radius;
        }

        if ($routeParams.location) {
            $scope.location = decodeURIComponent($routeParams.location);

            $scope.frm.urlSufix = $scope.frm.urlSufix + '/' + $routeParams.location;
        }

        $scope.results = null;


        function successGetData(response) {
            console.log('success getData: ', response);
            $scope.results = response.data.data.results;

            //create the mainImage
            angular.forEach($scope.results, function(value, key) {
                var images = value.detailsFull.images;
                if (images) {
                    angular.forEach(images, function(value1, key1) {
                        if (!$scope.results[key].mainImage) {
                            $scope.results[key].mainImage = value1;
                        }//end if
                    });//end foreach
                }//end if

                if (!$scope.results[key].mainImage) {
                    $scope.results[key].mainImage = 'images/noimage.jpg';
                }//end if
            });//end foreach
            //image ends

            $scope.data = response.data.data;
        }

        function failureGetData(response) {
            console.log('failed getData: ', response);
        }

        $scope.getData = function() {
            console.log($scope.frm);
            console.log($scope.details);

            var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=getAll&showLocation=1&path=/jon/lessons&max=4';
            //check the keyword
            if ($scope.frm.keyword) {
                url = url + '&q=' + encodeURIComponent($scope.frm.keyword);
            }
            //check the location
            if ($scope.location) {
                url = url + '&lat='+$scope.details.components.lat+'&lon='+$scope.details.components.lng+'&r='+encodeURIComponent($scope.frm.radius);
            }

            url = url + '&page=' + $scope.frm.page;
            console.log(url);
            dataService.get(url, successGetData, failureGetData, true);
        };//get data ends

        $scope.getData();//get data on page load

        /*Purpose of search data is to create the url and pass the user to that url, it does not do any backend work. it just do client side redirection. url is contructed based on the route which we created.*/
        $scope.constructURL = function() {
            var url = '/lessons/search/0';
            if ($scope.frm.keyword) {
                url = url + '/' + encodeURIComponent($scope.frm.keyword);
            }
            if ($scope.location) {
                if (!$scope.frm.radius) {
                    $scope.frm.radius = 30;
                }
                url = url + '/' + $scope.details.components.lat + '/' + $scope.details.components.lng + '/' + encodeURIComponent($scope.frm.radius) + '/' + encodeURIComponent($scope.location);
            }
            $location.path(url);
        };
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


