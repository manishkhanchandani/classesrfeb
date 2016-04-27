<?php
include_once('php/init.php');
$jsVersion = '1.1';

?>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $title; ?></title>
  <base href="/">
<meta property="og:type" content="website" />
<meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST']; ?><?php echo $_SERVER['REQUEST_URI']; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="og:image" content="<?php echo $img; ?>" />
<meta property="og:title" content="<?php echo $title; ?>" />
<meta name="description" content="<?php echo $description; ?>">
<!--<meta property="fb:app_id" content="1234567890" />-->
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css?v=<?php echo $jsVersion; ?>">
  <link href="css/font-awesome.min.css?v=<?php echo $jsVersion; ?>" rel="stylesheet" type="text/css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
  <link rel="stylesheet" href="app.css?v=<?php echo $jsVersion; ?>">

<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs"></script>
<script src="js/angular.min.js?v=<?php echo $jsVersion; ?>"></script>
<script src="js/angular-route.js?v=<?php echo $jsVersion; ?>"></script>
<!-- Firebase -->
<script src="js/firebase.js?v=<?php echo $jsVersion; ?>"></script>
<!-- AngularFire -->
<script src="js/angularfire.min.js?v=<?php echo $jsVersion; ?>"></script>

<!-- jquery -->
<script src="js/jquery-1.11.3.min.js?v=<?php echo $jsVersion; ?>"></script>
<script src="js/jquery-migrate-1.2.1.min.js?v=<?php echo $jsVersion; ?>"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="js/bootstrap.min.js?v=<?php echo $jsVersion; ?>"></script>
<script type="text/javascript" src="js/ngAutocomplete.js?v=<?php echo $jsVersion; ?>"></script>

<script src="js/pagination/dirPagination.js?v=<?php echo $jsVersion; ?>"></script>

<script type="text/javascript" src="js/script.js?v=<?php echo $jsVersion; ?>"></script>


<!-- pagination module -->
<script type="text/javascript" src="directives/pagination/pagination.js"></script>
<!-- pagination module ends -->
<!-- advertisements module -->
<script type="text/javascript" src="directives/advertisements/advertisements.js?v=<?php echo $jsVersion; ?>"></script>
<!-- advertisements module ends -->

<!-- Include YT library and youtube directive (https://github.com/brandly/angular-youtube-embed)-->
<script src="https://www.youtube.com/iframe_api"></script>
<script src="js/angular-youtube-embed.js?v=<?php echo $jsVersion; ?>"></script>
<!-- Include YT library and this directive -->

  <script src="app.js?v=<?php echo $jsVersion; ?>"></script>
  <script src="services/data.js?v=<?php echo $jsVersion; ?>"></script>
  
<!-- login module -->
<script type="text/javascript" src="directives/login/login.js?v=<?php echo $jsVersion; ?>"></script>
<!-- login module ends -->


<!-- messages module -->
<script type="text/javascript" src="directives/messages/messages.js?v=<?php echo $jsVersion; ?>"></script>
<!-- messages module ends -->

<!-- File Upload -->
<script src="js/angularFileUpload/angular-file-upload.js?v=<?php echo $jsVersion; ?>"></script>
<script src="js/angularFileUpload/directives.js?v=<?php echo $jsVersion; ?>"></script>
<!-- File Upload -->

  <script src="modules/messages/messages.js?v=<?php echo $jsVersion; ?>"></script>
  <script src="modulesFB/lessons/lessons.js?v=<?php echo $jsVersion; ?>"></script>
  <script src="modulesFB/students/students.js?v=<?php echo $jsVersion; ?>"></script>
  <script src="modulesFB/manager/manager.js?v=<?php echo $jsVersion; ?>"></script>
  <script src="modulesFB/massage/massage.js?v=<?php echo $jsVersion; ?>"></script>
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
</head>
<body ng-controller="mainController">
<ng-include src="templateUrl"></ng-include>

  <div ng-view id="mkPrj"><?php echo $content; ?></div>


<ng-include src="footerUrl"></ng-include>
</body>
</html>
