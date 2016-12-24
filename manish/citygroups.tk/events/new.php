<?php 
log_log(__FILE__.' on line number '.__LINE__);
is_login();

$pageTitle = 'New Event';

include('groups/logic.php');

if (!empty($_POST)) {
  try {
    $images = isset($_POST['images']) ? array_filter($_POST['images']) : array();
    $videos = isset($_POST['videos']) ? array_filter($_POST['videos']) : array();
    $urls = isset($_POST['urls']) ? array_filter($_POST['urls']) : array();
    $data = $_POST;
    if (empty($_POST['event_id'])) {
      $Groups->postNewEvent($data, $_SESSION['user']['id']);
    } else {
      $Groups->postUpdateEvent($data);
    }
  } catch (Exception $e) {
    $error = $e->getMessage();
  }
}


if (!empty($_GET['event_id'])) {
  $event_id = $_GET['event_id'];
  $query = "select * from city_events WHERE event_id = ?";
  $currentData = $modelGeneral->fetchRow($query, array($event_id), 0);
  $check = (!empty($_SESSION['user']['is_admin']) || ($_SESSION['user']['id'] === $currentData['uid']));
  if (!$check) {
    header("Location: /");
    exit;  
  }
  $_POST = $currentData;
}

?>
<?php
ob_start();
?>
<div>
  <div class="row">
        <div class="col-md-12">
            <h3>Create New Event</h3>
            <?php if (!empty($error)) { ?>
            <div class="alert alert-warning" role="alert">
              <?php echo $error; ?>
            </div>
            <?php } ?>
            <form method="post" name="form1" id="form1" action="">
                  <div class="form-group">
                    <label for="location">Where do we meet? (Event Location)</label>
                    <input type="text" class="form-control addressBox" id="location" name="event_location" placeholder="Enter Location" value="<?php echo isset($_POST['event_location']) ? $_POST['event_location'] : ''; ?>" required>
                  </div>
                <div class="form-group">
                    <label for="event_title">What should we do? (Event Title)</label>
                    <input type="text" class="form-control" id="event_title" name="event_title" placeholder="Enter Event Title" value="<?php echo isset($_POST['event_title']) ? $_POST['event_title'] : ''; ?>" required>
                </div>
                <div class="form-group">
                    <label for="event_title">When do we meet? (Event Date)</label>
                    <div>
                    <label for="from">From</label>
                    <input type="text" id="from" name="event_from_date" value="<?php echo !empty($_POST['event_from_date']) ? $_POST['event_from_date'] : date('Y-m-d H:i:s'); ?>">
                    <label for="to">to</label>
                    <input type="text" id="to" name="event_end_date" value="<?php echo !empty($_POST['event_end_date']) ? $_POST['event_end_date'] : date('Y-m-d H:i:s', strtotime("+ 3 hour")); ?>">
                    </div>
                </div>
                 <div class="checkbox">
                    <label>
                        <input type="checkbox" name="is_event_online" value="1" <?php if (!empty($_POST['is_event_online'])) { echo 'checked'; } ?>>Is Event Online
                    </label>
                </div>
                <div class="form-group">
                    <label for="event_description">More details: (Event Description)</label>
                    <textarea rows="5" class="form-control" id="event_description" name="event_description" placeholder="Enter description"><?php echo isset($_POST['event_description']) ? htmlspecialchars($_POST['event_description']) : ''; ?></textarea>
                </div>
                <div class="form-group" id="imgs">
                    <strong>Event Images</strong><br />
                    <?php if (!empty($images)) { ?>
                      <?php foreach ($images as $image) { ?>
                      <input type="text" name="event_images[]" class="form-control" value="<?php echo $image; ?>" placeholder="Enter Image URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="event_images[]" class="form-control" value="" placeholder="Enter Image URL"/>
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="images_img_add" id="images_img_add" onClick="addimage()" value="Add More Image URL" />
                </div>
                <div id="tmpImgs" style="display:none;"><input type="text" name="event_images[]" class="form-control" value="" placeholder="Enter Image URL" /></div>
                
                
                <div class="form-group" id="videos">
                    <strong>Event Youtube URLS</strong><br />
                    <?php if (!empty($videos)) { ?>
                      <?php foreach ($videos as $video) { ?>
                      <input type="text" name="event_videos[]" class="form-control" value="<?php echo $video; ?>" placeholder="Enter Youtube or Vimeo Video URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="event_videos[]" class="form-control" value="" placeholder="Enter Youtube or Vimeo Video URL" />
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="videos_video_add" id="videos_video_add" onClick="addvideo()" value="Add More Youtube or Vimeo Video URL" />
                </div>
                <div id="tmpVideo" style="display:none;"><input type="text" name="event_videos[]" class="form-control" placeholder="Enter Youtube or Vimeo Video URL" value="" /></div>
                
                
                <div class="form-group" id="urls">
                    <strong>Event Web URLS or Links</strong> <br />
                    <?php if (!empty($urls)) { ?>
                      <?php foreach ($urls as $url) { ?>
                      <input type="text" name="event_urls[]" class="form-control" value="<?php echo $url; ?>" placeholder="Enter Web URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="event_urls[]" class="form-control" value="" placeholder="Enter Web URL" />
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="urls_url_add" id="urls_url_add" onClick="addurl()" value="Add More Web URL" />
                </div>
                <div id="tmpURLS" style="display:none;"><input type="text" name="event_urls[]" class="form-control" placeholder="Enter Web URL" value="" /></div>
                
                <input type="hidden" class="field" id="street_number">
                <input type="hidden" class="field" id="route">
                <input type="hidden" class="field" id="administrative_area_level_1">
                <input type="hidden" class="field" id="administrative_area_level_2">
                <input type="hidden" class="field" id="postal_code">
                <input type="hidden" class="field" id="country">
                <input type="hidden" class="field" id="lat" name="event_lat" value="<?php echo isset($_POST['	event_lat']) ? $_POST['	event_lat'] : ''; ?>">
                <input type="hidden" class="field" id="lng" name="event_lng" value="<?php echo isset($_POST['	event_lng']) ? $_POST['	event_lng'] : ''; ?>">
                <input type="hidden" class="field" id="group_id" name="group_id" value="<?php echo $gid; ?>">
                <input type="hidden" class="field" id="address" name="event_address" value="<?php echo isset($_POST['event_address']) ? htmlspecialchars($_POST['event_address']) : ''; ?>">
                <input type="hidden" class="field" id="event_id" name="event_id" value="<?php echo isset($_POST['event_id']) ? $_POST['event_id'] : ''; ?>">
                <input type="submit" class="btn btn-default" value="Submit">
            </form>
        </div>
    </div>
</div>
<?php
$content_for_group = ob_get_clean();
include('groups/capsule.php');
?>
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
  resultPlace.formatted_address = place.formatted_address;
  resultPlace.name = place.name;
  resultPlace.place_id = place.place_id;
  resultPlace.lat = place.geometry.location.lat();
  resultPlace.lng = place.geometry.location.lng();
  resultPlace.adr_address = place.adr_address;
  resultPlace.url = place.url;
  resultPlace.sn = {};
  resultPlace.ln = {};
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    var val1 = place.address_components[i]['short_name'];
    var val2 = place.address_components[i]['long_name'];
    if (addressType === 'administrative_area_level_1') addressType = 'state';
    if (addressType === 'administrative_area_level_2') addressType = 'county';
    if (addressType === 'locality') addressType = 'city';
    resultPlace.sn[addressType] = val1;
    resultPlace.ln[addressType] = val2;
  }
  console.log(resultPlace);
  
  document.getElementById('address').value = JSON.stringify(resultPlace);
  document.getElementById('lat').value = resultPlace.lat;
  document.getElementById('lng').value = resultPlace.lng;
  
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
  
  
}
initAutocomplete();
</script>
<script language="javascript">
  function addimage()
  {
    $('#imgs').append($('#tmpImgs').html());
  }
  function addvideo()
  {
    $('#videos').append($('#tmpVideo').html());
  }
  function addurl()
  {
    $('#urls').append($('#tmpURLS').html());
  }
</script>