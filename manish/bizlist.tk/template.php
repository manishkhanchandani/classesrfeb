<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title><?php echo $pageTitle; ?></title>

<meta property="og:title" content="<?php echo $pageTitle; ?>"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>"/>
<meta property="og:image" content="http://bizlist.tk/images/businesses.jpg"/>
<meta property="og:site_name" content="BizList"/>
<meta property="og:description" content="Local Businesses, latest nearby deals, reviews and ratings of each business"/>
<meta property="fb:app_id" content="356978964008"/>

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
<!-- google place and autocomplete-->
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo PLACESAPIKEY2; ?>&libraries=places"></script>
<script>
  
$(document).on("keypress", 'form', function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        var str = e.target.className;
        var n = str.indexOf("addressBox");
        if (n === -1) {
          return true;
        } else {
          return false;
        }
        return true;
    }
});
  </script>
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
          <a class="navbar-brand" href="/"><?php echo $projectTitle; ?></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          
          <ul class="nav navbar-nav">
            
          </ul>
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Nearby <span class="caret"></span></a>
              <ul class="dropdown-menu">
                  <li><a href="http://maps.google.com/maps?q=loc:<?php echo $_SESSION['location']['ipDetails']['lat']; ?>,<?php echo $_SESSION['location']['ipDetails']['lng']; ?>" target="_blank"><?php echo $_SESSION['location']['ipDetails']['lat']; ?>, <?php echo $_SESSION['location']['ipDetails']['lng']; ?></a></li>
                  <li class="dropdown-header"><?php echo $_SESSION['location']['ipDetails']['city']; ?><span>, <?php echo $_SESSION['location']['ipDetails']['region']; ?></span><span>, <?php echo $_SESSION['location']['ipDetails']['postal']; ?></span><span>, <?php echo $_SESSION['location']['ipDetails']['country']; ?></span></li>
                  <li class="dropdown-header"><?php echo $_SESSION['location']['ipDetails']['ip']; ?></li>
                  <li role="separator" class="divider"></li>
                  <?php foreach ($_SESSION['location']['nearby'] as $nearby) { ?>
                  <li><a href="location\<?php echo $nearby['name']; ?>\<?php echo $nearby['latitude']; ?>\<?php echo $nearby['longitude']; ?>"><?php echo $nearby['name']; ?> (<?php echo $nearby['distance']; ?> miles)</a></li>
                  <?php } ?>
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
<?php include('analyticstracking.php'); ?>
</body>
</html>
