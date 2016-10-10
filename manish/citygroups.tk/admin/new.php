<?php 
log_log(__FILE__.' on line number '.__LINE__);
is_login();

$pageTitle = 'New Profile';

function postNewProfile($data) {
  global $modelGeneral;
  if (empty($data['name'])) {
      throw new Exception('missing name');
  }
  if (empty($data['location'])) {
      throw new Exception('missing address');
  }
  $ins = $modelGeneral->addDetails('massage', $data);
  header("Location: ".HTTPPATH.'admin/newConfirm');
  exit;
}


function postUpdateProfile($data) {
  global $modelGeneral, $massageTypes;
  if (empty($data['name'])) {
      throw new Exception('missing name');
  }
  if (empty($data['location'])) {
      throw new Exception('missing address');
  }
  foreach ($massageTypes as $massage=> $types) {
    if (!isset($data[$massage])) {
      $data[$massage] = 0;
    }
  }//end foreach
  
  unset($data['uid']);
  $where = sprintf('id = %s', $modelGeneral->qstr($data['id']));
  $modelGeneral->updateDetails('massage', $data, $where);
  header("Location: ".HTTPPATH.'admin/updateConfirm?id='.$data['id']);
  exit;
}

if (!empty($_POST)) {
  try {

    $images = isset($_POST['images']) ? array_filter($_POST['images']) : array();
    $videos = isset($_POST['videos']) ? array_filter($_POST['videos']) : array();
    $urls = isset($_POST['urls']) ? array_filter($_POST['urls']) : array();
    $data = $_POST;
    $data['address'] = stripslashes($data['address']);
    $data['images'] = json_encode(array_filter($_POST['images']));
    $data['videos'] = json_encode(array_filter($_POST['videos']));
    $data['urls'] = json_encode(array_filter($_POST['urls']));
    $data['uid'] = $_SESSION['user']['id'];
    $data['created_on'] = date('Y-m-d H:i:s');
    if (empty($_POST['id'])) {
      $data['id'] = guid();
      postNewProfile($data);
    } else {
      postUpdateProfile($data);
    }
  } catch (Exception $e) {
    $error = $e->getMessage();
  }
}


if (!empty($_GET['id'])) {
  $id = $_GET['id'];
  $query = "select * from massage WHERE id = ?";
  $currentData = $modelGeneral->fetchRow($query, array($id), 0);
  $check = (!empty($_SESSION['user']['is_admin']) || ($_SESSION['user']['id'] === $currentData['uid']));
  if (!$check) {
    header("Location: /");
    exit;  
  }
  $_POST = $currentData;
}

?>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h3>Create Massage Profile</h3>
            <?php if (!empty($error)) { ?>
            <div class="alert alert-warning" role="alert">
              <?php echo $error; ?>
            </div>
            <?php } ?>
            <form method="post" name="form1" id="form1" action="admin/new">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" value="<?php echo isset($_POST['name']) ? $_POST['name'] : ''; ?>" required>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <label for="location">Location</label>
                    <input type="text" class="form-control addressBox" id="location" name="location" placeholder="Enter Location" value="<?php echo isset($_POST['location']) ? $_POST['location'] : ''; ?>" required>
                  </div>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea rows="5" class="form-control" id="description" name="description" placeholder="Enter description"><?php echo isset($_POST['description']) ? $_POST['description'] : ''; ?></textarea>
                </div>
                <div class="form-group" id="imgs">
                    <strong>Images</strong><br />
                    <?php if (!empty($images)) { ?>
                      <?php foreach ($images as $image) { ?>
                      <input type="text" name="images[]" class="form-control" value="<?php echo $image; ?>" placeholder="Enter Image URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="images[]" class="form-control" value="" placeholder="Enter Image URL"/>
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="images_img_add" id="images_img_add" onClick="addimage()" value="Add More Image URL" />
                </div>
                <div id="tmpImgs" style="display:none;"><input type="text" name="images[]" class="form-control" value="" placeholder="Enter Image URL" /></div>
                
                
                <div class="form-group" id="videos">
                    <strong>Youtube URLS</strong><br />
                    <?php if (!empty($videos)) { ?>
                      <?php foreach ($videos as $video) { ?>
                      <input type="text" name="videos[]" class="form-control" value="<?php echo $video; ?>" placeholder="Enter Youtube or Vimeo Video URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="videos[]" class="form-control" value="" placeholder="Enter Youtube or Vimeo Video URL" />
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="videos_video_add" id="videos_video_add" onClick="addvideo()" value="Add More Youtube or Vimeo Video URL" />
                </div>
                <div id="tmpVideo" style="display:none;"><input type="text" name="videos[]" class="form-control" placeholder="Enter Youtube or Vimeo Video URL" value="" /></div>
                
                
                <div class="form-group" id="urls">
                    <strong>Web URLS or Links</strong> <br />
                    <?php if (!empty($urls)) { ?>
                      <?php foreach ($urls as $url) { ?>
                      <input type="text" name="urls[]" class="form-control" value="<?php echo $url; ?>" placeholder="Enter Web URL" />
                      <?php } ?>
                    <?php } else { ?>
                    <input type="text" name="urls[]" class="form-control" value="" placeholder="Enter Web URL" />
                    <?php } ?>
                </div>
                <div class="form-group">
                  <input type="button" name="urls_url_add" id="urls_url_add" onClick="addurl()" value="Add More Web URL" />
                </div>
                <div id="tmpURLS" style="display:none;"><input type="text" name="urls[]" class="form-control" placeholder="Enter Web URL" value="" /></div>
                
                <div class="form-group">
                    <label for="min30_charges">Charges For 30 min Massage</label>
                    <input type="text" class="form-control" id="min30_charges" name="min30_charges" placeholder="Enter 30 min charge" value="<?php echo isset($_POST['min30_charges']) ? $_POST['min30_charges'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="min60_charges">Charges For 60 min Massage</label>
                    <input type="text" class="form-control" id="min60_charges" name="min60_charges" placeholder="Enter 60 min charge" value="<?php echo isset($_POST['min60_charges']) ? $_POST['min60_charges'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="min90_charges">Charges For 90 min Massage</label>
                    <input type="text" class="form-control" id="min90_charges" name="min90_charges" placeholder="Enter 90 min charge" value="<?php echo isset($_POST['min90_charges']) ? $_POST['min90_charges'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="min90_charges">Charges For 120 min Massage</label>
                    <input type="text" class="form-control" id="min120_charges" name="min120_charges" placeholder="Enter 120 min charge" value="<?php echo isset($_POST['min120_charges']) ? $_POST['min120_charges'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="charges_explanation">Comment on Charges</label>
                    <input type="text" class="form-control" id="charges_explanation" name="charges_explanation" placeholder="Enter Comment on Charges" value="<?php echo isset($_POST['charges_explanation']) ? $_POST['charges_explanation'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="	discount_perc">Discount in percentage</label>
                    <input type="text" class="form-control" id="	discount_perc" name="discount_perc" placeholder="Enter Discount provided to customer" value="<?php echo isset($_POST['discount_perc']) ? $_POST['discount_perc'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="	admin_fees_perc">Admin Fee in percentage</label>
                    <input type="text" class="form-control" id="admin_fees_perc" name="admin_fees_perc" placeholder="Enter Admin Fees" value="<?php echo isset($_POST['admin_fees_perc']) ? $_POST['	admin_fees_perc'] : ''; ?>">
                </div>
                <div class="form-group">
                    <label for="	payment_email_id">Payment Email ID</label>
                    <input type="text" class="form-control" id="payment_email_id" name="payment_email_id" placeholder="Enter Payment Email ID" value="<?php echo isset($_POST['payment_email_id']) ? $_POST['payment_email_id'] : ''; ?>">
                </div>
                
                <div class="checkbox">
                    <label>
                        <input type="checkbox" required>I agree to terms and conditions
                    </label>
                </div>
                <div class="row">
                  <h3>Massage Types Offered</h3>
                  <?php foreach ($massageTypes as $massage=> $types) { ?>
                  <div class="col-md-6 col-sm-6 col-xs-6 col-lg-6">
                     
                          <input type="checkbox" name="<?php echo $massage; ?>" value="1" <?php echo !empty($_POST[$massage]) ? 'checked' : ''; ?>> <strong><?php echo $types['name']; ?> Massage</strong><br><small><?php echo $types['description']; ?></small>
                      
                  </div>
                  <?php } ?>
                </div>
                <input type="hidden" class="field" id="street_number">
                <input type="hidden" class="field" id="route">
                <input type="hidden" class="field" id="locality">
                <input type="hidden" class="field" id="administrative_area_level_1">
                <input type="hidden" class="field" id="administrative_area_level_2">
                <input type="hidden" class="field" id="postal_code">
                <input type="hidden" class="field" id="country">
                <input type="hidden" class="field" id="lat" name="lat" value="<?php echo isset($_POST['lat']) ? $_POST['lat'] : ''; ?>">
                <input type="hidden" class="field" id="lng" name="lng" value="<?php echo isset($_POST['lng']) ? $_POST['lng'] : ''; ?>">
                <input type="hidden" class="field" id="address" name="address" value="<?php echo isset($_POST['address']) ? htmlspecialchars($_POST['address']) : ''; ?>">
                <input type="hidden" class="field" id="id" name="id" value="<?php echo isset($_POST['id']) ? $_POST['id'] : ''; ?>">
                <input type="submit" class="btn btn-default" value="Submit">
            </form>
        </div>
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