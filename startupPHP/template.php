<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title><?php echo $pageTitle; ?></title>
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
<!-- Fixed navbar -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="main">Classical Homeopathic Treatment</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Patients <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Add New Case</a></li>
                <li><a href="#">All My Cases</a></li>
                <li><a href="#">My Account Info</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Doctors <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Update Profile</a></li>
                <li><a href="#">My Patients</a></li>
                <li><a href="#">My Account</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <?php if (!empty($_SESSION['user'])) { ?>
              <li><a href="users/login"><?php echo $_SESSION['user']['name']; ?></a></li>
              <li <?php if ($p === 'users/login') { ?>class="active"<?php } ?>><a href="users/login?logout=1">Logout</a></li>
            <?php } else { ?>
            <li <?php if ($p === 'users/login') { ?>class="active"<?php } ?>><a href="users/login">Login</a></li>
            <?php } ?>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="container">

      
      <?php echo $contentForTemplate; ?>

    </div><!-- /.container -->

</body>
</html>
