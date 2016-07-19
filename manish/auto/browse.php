<?php
/*urls
http://core.mkgalaxy.com/projects/classesrfeb/manish/auto/browse?module_id=34&keyword=torts
*/
$auto = new Models_Auto($connMainAdodb);
if (empty($_GET['module_id'])) {
  throw new Exception('Incorrect Module');
}

$radius = 30;
if (!empty($_GET['radius'])) {
  $radius = $_GET['radius'];  
}

$latitude = '';
$longitude = '';
if (!empty($_GET['lat']) && !empty($_GET['lng'])) {
  $latitude = $_GET['lat'];
  $longitude = $_GET['lng'];
}
$pageNum_rsView = 0;
if (isset($_GET['pageNum_rsView'])) {
  $pageNum_rsView = $_GET['pageNum_rsView'];
}

$data = $auto->browse($_GET['module_id'], $pageNum_rsView, $_GET, $latitude, $longitude, $radius, $my=false, $uid='');
$result['data'] = $data['result'];
$result['meta'] = $data;
?>