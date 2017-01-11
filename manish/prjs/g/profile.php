<?php
$pageTitle = "Create New Profile";
if (empty($_COOKIE['uid'])) {
  header("Location: home");
  exit;
}
pr($_COOKIE);

if (!empty($_POST)) {
  if (empty($_COOKIE['uid'])) {
    header("Location: home");
    exit;
  }
  pr($_POST);
}
?>
<script>
angular.module('myApp')

.controller('profileController', ['$scope', function($scope) {

}]);
</script>
<div ng-controller="profileController">
<h3>Create New Profile</h3>
<form method="post" action="" name="form1" id="form1">
    
    <fieldset><legend>Personal</legend>
    <div class="form-group">
      <label for="location">Choose City *</label>
      <input type="text" class="form-control addressBox" id="location" name="location" placeholder="Enter Location" value="<?php echo isset($_POST['location']) ? $_POST['location'] : ''; ?>" required>
    </div>
    <div class="form-group">
        <label for="title">Introduction Title *</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" required>
    </div>
    <div class="form-group">
        <label for="description">Description</label>
        <textarea rows="5" class="form-control" id="description" name="description" placeholder="Enter description"><?php echo isset($_POST['description']) ? $_POST['description'] : ''; ?></textarea>
    </div>
    <div class="form-group">
        <div class="row">
          <div class="col-md-4"><label for="birth_year">Birth Year *</label>
        <input type="number" class="form-control" id="birth_year" name="birth_year" placeholder="Enter Birth Year" required></div>
          <div class="col-md-4"><label for="birth_month">Birth Month</label>
        <input type="number" class="form-control" id="birth_month" name="birth_month" placeholder="Enter Birth Month" min="1" max="12"></div>
          <div class="col-md-4"><label for="birth_day">Birth Day</label>
        <input type="number" class="form-control" id="birth_day" name="birth_day" placeholder="Enter Birth Day"  min="1" max="31"></div>
        </div>
        
    </div>
    <div class="form-group">
        <label for="nature">I am *</label>
        <input type="radio" id="nature" name="nature" value="1"> Top
        <input type="radio" id="nature" name="nature" value="2"> Bottom
        <input type="radio" id="nature" name="nature" value="3"> Versatile
    </div>
    <div class="form-group">
        <label for="nature">Show / Hide My Profile</label>
        <input type="radio" id="status" name="status" value="1"> Show
        <input type="radio" id="status" name="status" value="0"> Hide
    </div>
    <div class="form-group">
        <div class="row">
          <div class="col-md-4"><label for="marital_status">Marital Status</label>
            <select name="marital_status" id="marital_status" class="form-control">
              <option value="">Select</option>
            </select>
          </div>
          <div class="col-md-4"><label for="profession">Profession</label>
            <select name="profession" id="profession" class="form-control">
              <option value="">Select</option>
            </select>
          </div>
          <div class="col-md-4"><label for="education">Education</label>
            <select name="education" id="education" class="form-control">
              <option value="">Select</option>
            </select>
          </div>
        </div>
        
    </div>
    </fieldset>
    <fieldset><legend>Media</legend>
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
    </fieldset>
    <div class="checkbox">
        <label>
            <input type="checkbox" required> I agree to terms & conditions and I agree that I am older than 18 years of age.
        </label>
    </div>
    
    <input type="hidden" class="field" id="street_number">
    <input type="hidden" class="field" id="route">
    <input type="hidden" class="field" id="locality">
    <input type="hidden" class="field" id="administrative_area_level_1">
    <input type="hidden" class="field" id="administrative_area_level_2">
    <input type="hidden" class="field" id="postal_code">
    <input type="hidden" class="field" id="country">
    <input type="hidden" class="field" id="lat" name="lat" value="<?php echo isset($_POST['	lat']) ? $_POST['lat'] : ''; ?>">
    <input type="hidden" class="field" id="lng" name="lng" value="<?php echo isset($_POST['	lng']) ? $_POST['	lng'] : ''; ?>">
    <input type="hidden" class="field" id="address" name="address" value="<?php echo isset($_POST['address']) ? htmlspecialchars($_POST['address']) : ''; ?>">
    <button type="submit" class="btn btn-default">Submit</button>
</form>

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
</div>