<?php
/*urls
http://core.mkgalaxy.com/projects/classesrfeb/manish/auto/detail?module_id=34&id=DE7DEE17-DEA8-F03D-5F8B-139C34903718
*/
$auto = new Models_Auto($connMainAdodb);
if (empty($_GET['module_id'])) {
  throw new Exception('Incorrect Module');
}

if (empty($_GET['id'])) {
  throw new Exception('Incorrect ID');
}

$data = $auto->details($_GET['module_id'], $_GET['id']);
$result['data'] = $data['rowResult'];
$result['meta'] = $data;
?>