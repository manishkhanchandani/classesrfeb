<?php

//pr($_GET);
$pageTitle = $siteConfig['PROJECT_TITLE'].' Users';
$g = new G();

$params = array();
$params['mia'] = '';
if (!empty($_GET['mia']) && $_GET['mia'] < 18) {
  echo 'bad age';
  exit;
} else if (!empty($_GET['mia'])) {
  $params['mia'] = $_GET['mia'];
}

$params['maa'] = '';
if (!empty($_GET['maa'])) {
  $params['maa'] = $_GET['maa'];
}

$params['n'] = array();
if (!empty($_GET['n'])) {
  $params['n'] = $_GET['n'];
}

$params['h'] = array();
if (!empty($_GET['h'])) {
  $params['h'] = $_GET['h'];
}

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

if (empty($homeLat) && empty($homeLng) && !empty($_COOKIE['ipDetails'])) {
  $tmp = json_decode($_COOKIE['ipDetails'], true);
  $homeLat = $tmp['lat'];
  $homeLng = $tmp['lng'];
  $homeCity = $tmp['city'].', '.$tmp['region'];
}


$max = !empty($_GET['max']) ? $_GET['max'] : 25;
$radius = !empty($_GET['radius']) ? $_GET['radius'] : 10000;

//Group
$pageNum_rsView = !empty($_GET['pageNum_rsView']) ? $_GET['pageNum_rsView'] : 0;
$totalRows_rsView = !empty($_GET['totalRows_rsView']) ? $_GET['totalRows_rsView'] : 0;

$list = $g->getList($siteConfig['tableName'], $max, $pageNum_rsView, $totalRows_rsView, $keyword, $params, $homeLat, $homeLng, $radius, '', 1, 0, 1, 0);


$totalPages_rsView = $list['totalPages'];
$totalRows_rsView = $list['totalRows'];

//generating queryString
$queryString = '';
if (!empty($_GET)) {
  $get = $_GET;
  if (isset($get['pageNum_rsView'])) unset($get['pageNum_rsView']);
  if (isset($get['totalRows_rsView'])) unset($get['totalRows_rsView']);
  if (isset($get['p'])) unset($get['p']);
  if (!empty($get)) {
    $queryString = http_build_query($get);
  }
}
$queryString = sprintf("&totalRows_rsView=%d&%s", $totalRows_rsView, $queryString);

//generating queryString

$type = 1;
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
        <div class="form-group">
            <label for="nature">Who is?: </label><br>
            <input type="checkbox" name="n[]" value="1" <?php echo (isset($_GET['n']) && in_array('1', $_GET['n'])) ? 'checked' : ''; ?>> Top
            <input type="checkbox" name="n[]" value="2" <?php echo (isset($_GET['n']) && in_array('2', $_GET['n'])) ? 'checked' : ''; ?>> Bottom
            <input type="checkbox" name="n[]" value="3" <?php echo (isset($_GET['n']) && in_array('3', $_GET['n'])) ? 'checked' : ''; ?>> Versatile
        </div>
        
        <div class="form-group">
           <div class="row">
             <div class="col-md-6">
              <label for="mia">Min Age</label>
              <input type="number" min="18" class="form-control" name="mia" value="<?php echo isset($_GET['mia']) ? $_GET['mia'] : ''; ?>">
             </div>
             <div class="col-md-6">
              <label for="maa">Max Age</label>
              <input type="number" class="form-control" name="maa" value="<?php echo isset($_GET['maa']) ? $_GET['maa'] : ''; ?>">
             </div>
           </div>
        </div>
        
        
        <div class="form-group">
            <label for="hosting">Hosting?: </label><br>
            <input type="checkbox" name="h[]" value="1" <?php echo (isset($_GET['h']) && in_array('1', $_GET['h'])) ? 'checked' : ''; ?>> Can Host
            <input type="checkbox" name="h[]" value="2" <?php echo (isset($_GET['h']) && in_array('2', $_GET['h'])) ? 'checked' : ''; ?>> Can Not Host
        </div>
        <input type="hidden" class="field" id="lat" name="lat" value="<?php echo isset($_GET['lat']) ? $_GET['lat'] : ''; ?>">
        <input type="hidden" class="field" id="lng" name="lng" value="<?php echo isset($_GET['lng']) ? $_GET['lng'] : ''; ?>">
        <button type="submit" class="btn btn-primary form-control">Search</button>
    </form>
  </div>
  <div class="col-md-9">
    <p><strong>Users <?php if (!empty($homeCity)) { echo ' near '.$homeCity; }?></strong></p>
      
      <?php if ($list['totalRows'] == 0) { ?>
        <div class="alert alert-warning" role="alert">
          No User Found.
        </div>
      <?php } ?>
      <?php if ($list['totalRows'] > 0 && !empty($list['data'])) { ?>
      <div class="row">
        <?php foreach ($list['data'] as $k => $v) { ?>
        <?php 
          $address = json_decode($v['address'], true);
          $images = json_decode($v['images'], true); $mainImage = !empty($images[0]) ? $images[0] : DEFAULT_IMAGE; ?>
          <?php
            switch ($type) {
              case 2:
                //include('view2.php');
                //break;
              case 1:
              default:
                include('view1.php');
                break;
            }
          ?>
        <?php } ?>
      </div>
      
      <?php
      $pagination_start = $list['start'];
      $pagination_totalRows = $list['totalRows'];
      $pagination_max = $list['max'];
      $pagination_pageNum = $pageNum_rsView;
      $pagination_pageNumKey = 'pageNum_rsView';
      $pagination_queryString = $queryString;
      $pagination_totalPages = $totalPages_rsView;
      include(ROOTDIR.'/includes/pagination.php');
      ?>
      <?php } ?>
      
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
      {types: ['(cities)']});

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