<?php
log_log(__FILE__.' on line number '.__LINE__);
$pageTitle = 'Doctor : Update Profile';

?>
<div class="row">
  <div class="col-md-12">
    <h1>Update My Doctor's Profile</h1>
    <form>
      <div class="form-group">
          <label for="paypal_email_address">Paypal Email address</label>
          <input type="email" class="form-control" id="paypal_email_address" name="paypal_email_address" placeholder="Enter paypal email" required>
      </div>
      <div class="form-group">
          <label for="name">Name of Doctor</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" required>
      </div>
      <div class="form-group">
          <label for="gender">Gender: </label>
          <input type="radio" id="gender_m" name="gender" value="Male"> Male 
          <input type="radio" id="gender_f" name="gender" value="Female"> Female
      </div>
      <div class="checkbox">
          <label>
              <input type="checkbox" name="terms" id="terms" value="1">I agree to accept terms and conditions provided by the website.
          </label>
      </div>
      <div class="checkbox">
          <label>
              <input type="checkbox" name="terms_classicalhom" id="terms_classicalhom" value="1">I agree to practice classical homeopathy with single remedy and single dose at one time.
          </label>
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
    
  </div>
</div>