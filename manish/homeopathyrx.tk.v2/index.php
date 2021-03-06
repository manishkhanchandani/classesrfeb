<?php
include_once('init.php');
$jsVersion = '1.1';

$dir = '/projects/classesrfeb/manish/homeopathyrx.tk.v2/';
?>
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Homeopathy :: <?php echo $title; ?></title>
  <base href="<?php echo $dir; ?>">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/fontAwesome.css" rel="stylesheet" type="text/css">

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
<script src="js/FileSaver.js"></script>
<script src="js/clipboard.min.js"></script>


<script type="text/javascript" src="js/ngAutocomplete.js"></script>
<!-- pagination module -->
<script type="text/javascript" src="directives/pagination/pagination.js"></script>
<!-- pagination module ends -->

  <script src="app.js"></script>
  <script src="services/data.js"></script>
  
<!-- login module -->
<script type="text/javascript" src="directives/googleLogin/googleLogin.js?v=1.1"></script>
<!-- login module ends -->
<!-- mysymptoms module -->
<script type="text/javascript" src="directives/mysymptoms/mysymptoms.js?v=1.1"></script>
<!-- mysymptoms module ends -->
<!-- findmyremedyModule module -->
<script type="text/javascript" src="directives/findmyremedy/findmyremedy.js?v=1.1"></script>
<!-- findmyremedyModule module ends -->

  <script src="view1/view1.js"></script>
  <script src="view2/view2.js"></script>
  <script src="view3/view3.js"></script>
  <script src="modules/completeRep/completeRep.js"></script>
  <script src="modules/doctors/doctors.js"></script>
  <script src="modules/patients/patients.js"></script>
  <script src="modules/learn/learn.js"></script>
  <script src="modules/mm/mm.js"></script>
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
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="main">Homeopathy</a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="learn">Classical Homeopathy</a></li>
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Diseases <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="learn/diseaseAsthma">Asthma</a></li>
            <li><a href="learn/diseaseAvascularNecrosis">Avascular Necrosis</a></li>
            <li><a href="learn/diseaseMuscularDystrophy">Muscular Dystrophy</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Repertory <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="completeRep">Symptoms / Analysis</a></li>
            <li><a href="patients/case">Case Taking Form</a></li>
          </ul>
        </li>
        <!--<li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Doctors <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="doctors/register">Register as Practitioner</a></li>
          </ul>
        </li>-->
        <!--
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Homeopathy <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="">Coming Soon...</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Philosophy <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="">Coming Soon...</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Materia Medica <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="">Coming Soon...</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Treatment <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="rx">New Case</a></li>
            <li><a href="cases/my">My Cases</a></li>
          </ul>
        </li>
        -->
      </ul>
      <ul google-login user-data="userData" class="nav navbar-nav navbar-right"></ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>

  <div ng-view><?php echo $content; ?></div>
</body>
</html>
