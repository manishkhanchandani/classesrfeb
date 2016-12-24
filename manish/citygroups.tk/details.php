<?php 
log_log(__FILE__.' on line number '.__LINE__);
if (empty($_GET['id'])) {
  header("Location: /");
  exit;  
}

include('groups/logic.php');
$pageTitle = 'Group '.$groupData['name'];
$activeMenu = 'home';

$page = 0;
if (!empty($_GET['page'])) {
  $page = $_GET['page'];
}
$totalRows = 0;
if (!empty($_GET['totalRows'])) {
  $totalRows = $_GET['totalRows'];
}

$eventList = $Groups->getEventList(5, $page, $totalRows, $id);
?>
<?php
ob_start();
?>
<div>
  <h3>Welcome!</h3>
  <p>+ <a href="/<?php echo $groupData['url']; ?>/events/new">Schedule a new event</a></p>
  <p>Upcoming | Past | Calendar</p>
  <hr>
  <?php pr($eventList); ?>
</div>
<?php
$content_for_group = ob_get_clean();
include('groups/capsule.php');
?>
<?php
pr($_GET);
pr($groupData);
?>
