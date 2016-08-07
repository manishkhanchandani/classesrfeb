<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title>Remedy Finder</title>
  <base href="<?php echo $dir; ?>">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">
<script src="js/angular.min.js"></script>
<script src="js/angular-route.js"></script>
<!-- Firebase -->
<script src="js/firebase.js"></script>
<!-- AngularFire -->
<script src="js/angularfire.min.js"></script>
<!-- jquery -->
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery-migrate-1.2.1.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="js/bootstrap.min.js"></script>

<script>
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'firebase'
])
.controller('mainController', ['$scope', function($scope) {
  //var myFirebaseRef = new Firebase("https://mkgxy.firebaseio.com/projects/remedyFinder");
  //myFirebaseRef.child(name).set($scope.completeFrm); 
}]);
</script>
</head>

<body ng-controller="mainController">

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">

      
      <?php echo $contentForTemplate; ?>

    </div><!-- /.container -->

</body>
</html>
