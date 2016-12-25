<?php 
log_log(__FILE__.' on line number '.__LINE__);

pr($_GET);
include('groups/logic.php');
?>
<?php
ob_start();
?>
<div class="container">
<div class="row">
<div class="col-md-12">
  <h3>Details</h3>
  
</div></div></div>

<?php
$content_for_group = ob_get_clean();
include('groups/capsule.php');
?>