'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'modules/view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/add', {
    templateUrl: 'modules/view1/add.html',
    controller: 'AddCtrl'
  })
  .when('/edit/:id', {
    templateUrl: 'modules/view1/edit.html',
    controller: 'EditCtrl'
  })
  
  
  .when('/search/p_:page/r_:cat_id/k_:keyword/c_:chapter/b_:book', {
    templateUrl: 'modules/view1/list.html',
    controller: 'ListCtrl'
  })
  
  .when('/search/p_:page', {
    templateUrl: 'modules/view1/list.html',
    controller: 'ListCtrl'
  })
  
  .when('/search', {
    templateUrl: 'modules/view1/list.html',
    controller: 'ListCtrl'
  })
  
  
  .when('/detail/:id', {
    templateUrl: 'modules/view1/detail.html',
    controller: 'DetailCtrl'
  })
  .when('/delete/:id', {
    templateUrl: 'modules/view1/delete.html',
    controller: 'DeleteCtrl'
  })
  ;
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])
.controller('AddCtrl', ['$scope', function($scope) {
}])
.controller('EditCtrl', ['$scope', function($scope) {
}])
.controller('ListCtrl', ['$scope', function($scope) {
}])
.controller('DetailCtrl', ['$scope', function($scope) {
}])
.controller('DeleteCtrl', ['$scope', function($scope) {
}]);