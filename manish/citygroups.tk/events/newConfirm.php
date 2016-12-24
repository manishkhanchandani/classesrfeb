<?php 
log_log(__FILE__.' on line number '.__LINE__);

include('groups/logic.php');
?>
<?php
ob_start();
?>
<div class="container">
<div class="row">
<div class="col-md-12">
  <h3>Confirmation</h3>
  <p class="lead">Event created successfully.</p>
</div></div></div>

<?php
$content_for_group = ob_get_clean();
include('groups/capsule.php');
?>