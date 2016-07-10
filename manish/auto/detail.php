<?php
$auto = new Models_Auto($connMainAdodb);
if (empty($_GET['module_id'])) {
  throw new Exception('Incorrect Module');
}

if (empty($_GET['id'])) {
  throw new Exception('Incorrect ID');
}

$data = $auto->details($_GET['module_id'], $_GET['id']);
$result['data'] = $data['rowResult'];
$result['meta'] = $data
?>