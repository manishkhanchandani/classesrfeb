<?php
$jsVersion = 1.1;
?>
<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title><?php echo $pageTitle; ?></title>
<base href="<?php echo $dir; ?>">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/style.css">

<!-- jquery -->
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery-migrate-1.2.1.min.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="js/bootstrap.min.js"></script>
<!-- google place and autocomplete-->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs&libraries=places"></script>

<script src="js/angular.min.js?<?php echo $jsVersion; ?>"></script>
<script src="js/angular-route.js?<?php echo $jsVersion; ?>"></script>
<!-- Firebase -->
<script src="js/firebase.js?<?php echo $jsVersion; ?>"></script>
<!-- AngularFire -->
<script src="js/angularfire.min.js?<?php echo $jsVersion; ?>"></script>

<script src="js/angular-cookies.js"></script>
<script src="js/angular-sanitize.min.js"></script>


<script src="js/ngAutocomplete.js"></script>
<script src="services/data.js"></script>

<!-- login module -->
<script type="text/javascript" src="directives/googleLoginFB/googleLoginFB.js?<?php echo $jsVersion; ?>"></script>
<!-- login module ends -->


<!-- messages module -->
<script type="text/javascript" src="directives/messages/messages.js?v=<?php echo $jsVersion; ?>"></script>
<!-- messages module ends -->

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
  'firebase',
  'googleLoginFBModule',
  'messagesModule',
  'dataServiceFBModule'
])

.filter('customDate', function($filter) {
 return function(input) {
  if(input == null){ return ""; }
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
  return _date;
 };
})


.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
})


.filter('objectAsArray', function() {
  return function(items) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    return filtered;
  };
})


.filter('timeAgo', function() {
  return function(inputTime) {
    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    }; 
    var template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };
    var timer = function(time) {
        if (!time)
            return;
        time = new Date(time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
                ) + templates.suffix;
    };
    
    return timer(inputTime);
  };
})


.controller('mainController', ['$scope', function($scope) {
  // Initialize the Firebase SDK
  var config = {
    apiKey: 'AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU',
    authDomain: 'mkgxy-3d7ce.firebaseapp.com',
    databaseURL: 'https://mkgxy-3d7ce.firebaseio.com/',
    storageBucket: 'mkgxy-3d7ce.appspot.com'
  };
  firebase.initializeApp(config);
  //end firebase
  
  $scope.userData = null;
  //getting the details form localStorage
  var userProfile = localStorage.getItem('userData');
  if (userProfile) {
      $scope.userData = JSON.parse(userProfile);
  }
  
  $scope.userToken = null;
  var userToken = localStorage.getItem('userToken');
  if (userToken) {
      $scope.userToken = userToken;
  }
  
  
  
}]);
</script>
</head>

<body ng-controller="mainController">
<!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="g/home"><?php echo $projectTitle; ?></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          
          <ul class="nav navbar-nav">
             <li ng-if="userData.uid"><a href="g/profile">My Profile</a></li>
             <li ng-if="userData.uid"><a href="<?php echo $siteConfig['MESSAGE_URL']; ?>">Messages <span messages-counter user-data="userData"></span></a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Nearby <span class="caret"></span></a>
              <?php if (!empty($_SESSION['location'])) { ?>
              <ul class="dropdown-menu">
                   <?php $lat = !empty($_SESSION['location']['ipDetails']['lat']) ? $_SESSION['location']['ipDetails']['lat']: '';
                        $lng = !empty($_SESSION['location']['ipDetails']['lng']) ? $_SESSION['location']['ipDetails']['lng'] : '';?>
                  <li><a href="http://maps.google.com/maps?q=loc:<?php echo $lat; ?>,<?php echo $lng; ?>" target="_blank"><?php echo $lat; ?>, <?php echo $lng; ?></a></li>
                  <li class="dropdown-header"><?php echo $_SESSION['location']['ipDetails']['city']; ?><span>, <?php echo $_SESSION['location']['ipDetails']['region']; ?></span><span>, <?php echo $_SESSION['location']['ipDetails']['postal']; ?></span><span>, <?php echo $_SESSION['location']['ipDetails']['country']; ?></span></li>
                  <li class="dropdown-header"><?php echo $_SESSION['location']['ipDetails']['ip']; ?></li>
                  <li role="separator" class="divider"></li>
                  <?php foreach ($_SESSION['location']['nearby'] as $nearby) { ?>
                  <li><a href="g/location/<?php echo $nearby['name']; ?>/<?php echo $nearby['latitude']; ?>/<?php echo $nearby['longitude']; ?>"><?php echo $nearby['name']; ?> (<?php echo $nearby['distance']; ?> miles)</a></li>
                  <?php } ?>
              </ul>
              <?php } ?>
            </li>
          </ul>
          
          <ul google-loginfb user-data="userData" user-token="userToken" url="g/home" class="nav navbar-nav navbar-right"></ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="container">
      <div class="col-md-9">
      <?php echo $contentForTemplate; ?>
      </div>
      <div class="col-md-3">
       <?php
          $tlat = null;
          $tlng = null;
          $tcity = null;
          if (!empty($homeLat) && !empty($homeLng)) {
            $tlat = $homeLat;
            $tlng = $homeLng;
            $tcity = $homeCity;
          } else if (!empty($_COOKIE['ipDetails'])) {
            $l = json_decode($_COOKIE['ipDetails'], true);
            $tlat = $l['lat'];
            $tlng = $l['lng'];
            $tcity = $l['city'];
          }
        ?>
        <div google-login-user-list user-data="userData" url="<?php echo $siteConfig['MESSAGE_URL']; ?>" lat="<?php echo $tlat; ?>" lng="<?php echo $tlng; ?>" city="<?php echo $tcity; ?>"></div>
      </div>
    </div><!-- /.container -->

</body>
</html>
