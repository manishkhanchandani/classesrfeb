<?php


$keyword = '';
if (!empty($_GET['kw'])) {
 $keyword = $_GET['kw'];
}
$homeLat = '';
if (!empty($_GET['q']['lat'])) {
 $homeLat = $_GET['q']['lat'];
 $_GET['lat'] = $homeLat;
} else if (!empty($_GET['lat'])) {
 $homeLat = $_GET['lat'];
}
$homeLng = '';
if (!empty($_GET['q']['lng'])) {
 $homeLng = $_GET['q']['lng'];
 $_GET['lng'] = $homeLng;
} else if (!empty($_GET['lng'])) {
 $homeLng = $_GET['lng'];
}
$homeCity = '';

if (!empty($_GET['location'])) {
  $homeCity = $_GET['location'];
} else if (!empty($_GET['q']['city'])) {
  $homeCity = $_GET['location'] = $_GET['q']['city'];
}

?>


<div class="row">
  <div class="col-md-3">
    <h3>Search</h3>
    <form action="g/home" method="get" name="form1" id="form1">
        <div class="form-group">
            <label for="keyword">Keyword</label>
            <input type="keyword" class="form-control" id="kw" name="kw" placeholder="Enter keyword" value="<?php echo isset($_GET['kw']) ? $_GET['kw'] : ''; ?>">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control addressBox" id="location" name="location" placeholder="Enter Location" value="<?php echo isset($_GET['location']) ? $_GET['location'] : ''; ?>">
        </div>
        <input type="hidden" class="field" id="lat" name="lat" value="<?php echo isset($_GET['lat']) ? $_GET['lat'] : ''; ?>">
        <input type="hidden" class="field" id="lng" name="lng" value="<?php echo isset($_GET['lng']) ? $_GET['lng'] : ''; ?>">
        <input type="hidden" class="form-control" id="radius" name="radius" value="10000">
        <button type="submit" class="btn btn-default">Search</button>
    </form>
  </div>
  <div class="col-md-6">
    coming soon...
  </div>
</div>

<script>
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  administrative_area_level_2: 'long_name',
  country: 'long_name',
  postal_code: 'short_name'
};
var resultPlace = {};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('location')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(place);
  resultPlace.lat = place.geometry.location.lat();
  resultPlace.lng = place.geometry.location.lng();
  
  document.getElementById('lat').value = resultPlace.lat;
  document.getElementById('lng').value = resultPlace.lng;
  
  
  //$('#form1').attr('action', 'location/Modesto/37.6656/-120.992');
}
initAutocomplete();
</script>