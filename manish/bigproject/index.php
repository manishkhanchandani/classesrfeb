<?php

?>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <base href="/">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
  <link rel="stylesheet" href="app.css">

<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.2/angular.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-route.js"></script>
<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js"></script>

<!-- jquery -->
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="js/ui-bootstrap-tpls.min.js"></script>

<script type="text/javascript" src="js/ngAutocomplete.js"></script>
<script type="text/javascript" src="js/script.js"></script>


<!-- pagination module -->
<script type="text/javascript" src="directives/pagination/pagination.js"></script>
<!-- pagination module ends -->

<!-- Include YT library and youtube directive (https://github.com/brandly/angular-youtube-embed)-->
<script src="https://www.youtube.com/iframe_api"></script>
<script src="js/angular-youtube-embed.js"></script>
<!-- Include YT library and this directive -->

  <script src="app.js"></script>
  <script src="services/data.js"></script>
  
<!-- googleLogin module -->
<script type="text/javascript" src="directives/googleLoginFB/googleLoginFB.js"></script>
<!-- googleLogin module ends -->


<!-- messages module -->
<script type="text/javascript" src="directives/messages/messages.js"></script>
<!-- messages module ends -->

<!-- File Upload -->
<script src="js/angularFileUpload/angular-file-upload.js"></script>
<script src="js/angularFileUpload/directives.js"></script>
<!-- File Upload -->

  <script src="modules/lessons/lessons.js"></script>
  <script src="modules/students/students.js"></script>
  <script src="modules/messages/messages.js"></script>
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

  <div ng-view id="mkPrj"></div>

<footer>
  <p>Copyright &copy; 2016 - <a href="terms">Terms</a> &middot; <a href="privacy">Privacy</a></p>
</footer>
</body>
</html>