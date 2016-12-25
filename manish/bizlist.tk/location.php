<?php 
log_log(__FILE__.' on line number '.__LINE__);

$type = 1; 

$Biz = new Biz();

$keyword = '';
if (!empty($_GET['kw'])) {
 $keyword = $_GET['kw'];
}
$lat = '';
if (!empty($_GET['q']['lat'])) {
 $lat = $_GET['q']['lat'];
 $_GET['lat'] = $lat;
} else if (!empty($_GET['lat'])) {
 $lat = $_GET['lat'];
}
$lng = '';
if (!empty($_GET['q']['lng'])) {
 $lng = $_GET['q']['lng'];
 $_GET['lng'] = $lng;
} else if (!empty($_GET['lng'])) {
 $lng = $_GET['lng'];
 
 updateLocation($lat, $lng);//update location
 
}


if (!empty($_GET['q']['city'])) {
  $_GET['location'] = $_GET['q']['city'];
}

if (empty($_GET['location'])) {
  $lat = '';
  $lng = '';
  if (!empty($_SESSION['location']['nearby'][0])) {// && $_SERVER['REQUEST_URI'] === '/'
    $lat = $_SESSION['location']['nearby'][0]['latitude'];
    $lng = $_SESSION['location']['nearby'][0]['longitude'];
    $_GET['lat'] = $lat;
    $_GET['lng'] = $lng;
    $_GET['location'] = $_SESSION['location']['nearby'][0]['name'];
  }
}

$paramsType = array();
if (!empty($_GET['params'])) {
 $paramsType = $_GET['params'];
 $paramsType = array_filter($paramsType);
}

$uid = null;
if (!empty($_GET['myPost']) && !empty($_SESSION['user']['id'])) {
  $uid = $_SESSION['user']['id'];
}

$max = !empty($_GET['max']) ? $_GET['max'] : 25;
$radius = !empty($_GET['radius']) ? $_GET['radius'] : 100;

$cacheTime = 0;

//Group
$pageNum_rsView = !empty($_GET['pageNum_rsView']) ? $_GET['pageNum_rsView'] : 0;
$totalRows_rsView = !empty($_GET['totalRows_rsView']) ? $_GET['totalRows_rsView'] : 0;
    

//fetch from google
$googleUrl = '';

if (empty($_GET['kw']) && empty($_GET['category'])) {
  $googleUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$_GET['lat'].','.$_GET['lng'].'&radius=50000&key='.PLACESAPIKEY;
} else if (!empty($_GET['kw'])) {
  $googleUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='.$_GET['lat'].','.$_GET['lng'].'&keyword='.urlencode($_GET['kw']).'&rankby=distance&key='.PLACESAPIKEY;
}

if (!empty($googleUrl)) {
  $eurl = md5($googleUrl);
  $res = curlget($googleUrl);
  //cache the data
  $sdir = substr($eurl, 0, 2);
  if (!is_dir('cacheFiles/'.$sdir)) {
    mkdir('cacheFiles/'.$sdir, 0777);
    chmod('cacheFiles/'.$sdir, 0777);
  }
  
  if (!is_file('cacheFiles/'.$sdir.'/'.$eurl.'.txt')) {
    file_put_contents('cacheFiles/'.$sdir.'/'.$eurl.'.txt', $res);
    //cache ends
    $results = json_decode($res, true);
    //pr($results);
    $Biz->saveDataResults($results['results']);
  }
}
//fetch from google


$return = $Biz->getList($max, $pageNum_rsView, $totalRows_rsView, $keyword, $lat, $lng, $radius, $paramsType, $uid, 0, $cacheTime);

$totalPages_rsView = $return['totalPages'];
$totalRows_rsView = $return['totalRows'];

//generating queryString
$queryString = "";
if (!empty($_SERVER['QUERY_STRING'])) {
  $params = explode("&", $_SERVER['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_rsView") == false && 
        stristr($param, "totalRows_rsView") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString = "&" . htmlentities(implode("&", $newParams));
  }
}
$queryString = sprintf("&totalRows_rsView=%d%s", $totalRows_rsView, $queryString);
//generating queryString




//Events
$pageNum_rsEvents = !empty($_GET['pageNum_rsEvents']) ? $_GET['pageNum_rsEvents'] : 0;
$totalRows_rsEvents = !empty($_GET['totalRows_rsEvents']) ? $_GET['totalRows_rsEvents'] : 0;

$featuredMax = 50;

$eventList = $Biz->getList($featuredMax, $pageNum_rsEvents, $totalRows_rsEvents, $keyword, $lat, $lng, $radius, $paramsType, $uid, 1, $cacheTime);
$totalPages_rsEvents = $eventList['totalPages'];
$totalRows_rsEvents = $eventList['totalRows'];

//generating queryString
$queryString_rsEvents = "";
if (!empty($_SERVER['QUERY_STRING'])) {
  $params = explode("&", $_SERVER['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_rsEvents") == false && 
        stristr($param, "totalRows_rsEvents") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString_rsEvents = "&" . htmlentities(implode("&", $newParams));
  }
}
$queryString_rsEvents = sprintf("&totalRows_rsEvents=%d%s", $totalRows_rsEvents, $queryString_rsEvents);
//generating queryString


define('DEFAULT_IMAGE', 'http://bento.cdn.pbs.org/hostedbento-prod/filer_public/_bento_media/img/no-image-available.jpg');
?>
<script>
function submitSearch()
{
  return false; 
}
</script>
  <div class="row">
    <div class="col-md-4">
      <h3>Search</h3>
      <form action="location" method="get" name="form1" id="form1">
          <div class="form-group">
              <label for="keyword">Keyword</label>
              <input type="keyword" class="form-control" id="kw" name="kw" placeholder="Enter keyword" value="<?php echo isset($_GET['kw']) ? $_GET['kw'] : ''; ?>">
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input type="text" class="form-control addressBox" id="location" name="location" placeholder="Enter Location" value="<?php echo isset($_GET['location']) ? $_GET['location'] : ''; ?>">
          </div>
          <div class="checkbox">
              <label>
                  <input type="checkbox" name="myPost" value="1" <?php if (!empty($_GET['myPost'])) { echo 'checked'; } ?>>Owned By Me
              </label>
          </div>
          <input type="hidden" class="field" id="lat" name="lat" value="<?php echo isset($_GET['lat']) ? $_GET['lat'] : ''; ?>">
          <input type="hidden" class="field" id="lng" name="lng" value="<?php echo isset($_GET['lng']) ? $_GET['lng'] : ''; ?>">
          <input type="hidden" class="form-control" id="radius" name="radius" placeholder="Enter Radius" value="<?php echo $radius; ?>">
          <button type="submit" class="btn btn-default">Search</button>
      </form>
    </div>
    <div class="col-md-4">
      <p><strong>Featured Listings</strong></p>
      
      <?php if ($eventList['totalRows'] == 0) { ?>
        <div class="alert alert-warning" role="alert">
          No Featured Listing Found.
        </div>
      <?php } ?>
      <?php if ($eventList['totalRows'] > 0 && !empty($eventList['data'])) { ?>
      <div class="row">
        <?php foreach ($eventList['data'] as $k => $v) { ?>
        <?php $mainImage = !empty($v['data']['icon']) ? $v['data']['icon'] : DEFAULT_IMAGE; ?>
          <?php
            switch ($type) {
              case 2:
                include('businesses/view2.php');
                break;
              case 1:
              default:
                include('businesses/view1.php');
                break;
            }
          ?>
        <?php } ?>
      </div>
      <?php
      $pagination_start = $eventList['start'];
      $pagination_totalRows = $eventList['totalRows'];
      $pagination_max = $eventList['max'];
      $pagination_pageNum = $pageNum_rsEvents;
      $pagination_pageNumKey = 'pageNum_rsEvents';
      $pagination_queryString = $queryString_rsEvents;
      $pagination_totalPages = $totalPages_rsEvents;
      include('includes/pagination.php');
      ?>
      <?php }//end if totalRows ?>
    </div>
    <div class="col-md-4">
      
      <p><strong>Listings</strong></p>
      
      <?php if ($return['totalRows'] == 0) { ?>
        <div class="alert alert-warning" role="alert">
          No Business Found.
        </div>
      <?php } ?>
      <?php if ($return['totalRows'] > 0 && !empty($return['data'])) { ?>
      <div class="row">
        <?php foreach ($return['data'] as $k => $v) { ?>
        <?php $mainImage = !empty($v['data']['icon']) ? $v['data']['icon'] : DEFAULT_IMAGE; ?>
          <?php
            switch ($type) {
              case 2:
                include('businesses/view2.php');
                break;
              case 1:
              default:
                include('businesses/view1.php');
                break;
            }
          ?>
        <?php } ?>
      </div>
        
      <?php
      $pagination_start = $return['start'];
      $pagination_totalRows = $return['totalRows'];
      $pagination_max = $return['max'];
      $pagination_pageNum = $pageNum_rsView;
      $pagination_pageNumKey = 'pageNum_rsView';
      $pagination_queryString = $queryString;
      $pagination_totalPages = $totalPages_rsView;
      include('includes/pagination.php');
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
      {types: ['geocode', 'establishment']});

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