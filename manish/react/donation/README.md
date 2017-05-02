npm install redux redux-logger react-redux redux-thunk redux-promise-middleware react-google-autocomplete firebase react-router-dom --save

<link rel='stylesheet' href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

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
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw&libraries=places"></script>