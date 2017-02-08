<?php
$jsVersion = '1.1';
?>
<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title>Administration Panel</title>
<link rel="stylesheet" href="../../css/bootstrap.min.css">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/font-awesome.min.css">
<!-- jquery -->
<script src="../../js/jquery-1.11.3.min.js"></script>
<script src="../../js/jquery-migrate-1.2.1.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="../../js/bootstrap.min.js"></script>

<script src="../../js/angular.min.js?<?php echo $jsVersion; ?>"></script>
<script src="../../js/angular-route.js?<?php echo $jsVersion; ?>"></script>
<!-- Firebase -->
<script src="../../js/firebase.js?<?php echo $jsVersion; ?>"></script>
<!-- AngularFire -->
<script src="../../js/angularfire.min.js?<?php echo $jsVersion; ?>"></script>
<script>

  // Initialize the Firebase SDK
  var config = {
    apiKey: 'AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU',
    authDomain: 'mkgxy-3d7ce.firebaseapp.com',
    databaseURL: 'https://mkgxy-3d7ce.firebaseio.com/',
    storageBucket: 'mkgxy-3d7ce.appspot.com'
  };
  firebase.initializeApp(config);
  //end firebase  
</script>

<script>
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'firebase'
])

.constant('configs', {
    firebaseDirectory: '/g'
})

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/users', {
    templateUrl: 'templates/users.html',
    controller: 'UsersCtrl'
  })
  .otherwise({redirectTo: '/'});
  //$locationProvider.html5Mode(true);
}])

.controller('mainController', ['$scope', 'configs', '$routeParams', function($scope, configs, $routeParams) {
                               
  console.log('configs: ', configs);
  console.log('route: ', $routeParams);
  $scope.mainRef = firebase.database().ref(configs.firebaseDirectory);
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])

.controller('UsersCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
  $scope.usersData = [];
  var usersRef = $scope.mainRef.child('users');
  usersRef.orderByChild('created_dt').limitToLast(500).on("value", function(snapshot) {
    $scope.usersData = [];
    angular.forEach(snapshot.val(), function (value, key) {
      $scope.usersData.push(value);
    });
    if(!$scope.$$phase) $scope.$apply();
    console.log('data: ', $scope.usersData);
  });
  
  //var syncObject = $firebaseObject(usersRef);
  // three way data binding
  //syncObject.$bindTo($scope, 'usersData');
}])

;
</script>
</head>

<body ng-controller="mainController">


    <!-- Static navbar -->
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Admin Panel</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#/users">Users</a></li>
                <li><a href="#/messages">Messages</a></li>
                <li><a href="#/online">Online Users</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="active"><a href="./">Static top <span class="sr-only">(current)</span></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>


    <div class="container">
      <div ng-view></div>
    </div>
</body>
</html>