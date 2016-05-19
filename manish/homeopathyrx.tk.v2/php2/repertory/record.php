<?php
include('../init.php');
$action = !empty($_GET['action']) ? $_GET['action'] : '';
$record = array('success' => 1);
try {
switch ($action) {
  case 'kent_repertory_getAll':
    //http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_getAll&chapter=38&page=0&cacheTime=0
    if (empty($_GET['chapter'])) {
      throw new Exception('empty chapter');
    }
    $kent = new repertory_Kent();
    $max = !empty($_GET['max']) ? $_GET['max'] : 10;
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $cacheTime = !empty($_GET['cacheTime']) ? $_GET['cacheTime'] : TIMESMALL;
    $data = $kent->getAll($Models_General, $_GET['chapter'], $max, $page, $cacheTime);
    $record['data'] = $data;
    break;  
  default:
    break;
}

} catch (Exception $e) {
  $record = array('success' => 0, 'error' => $e->getMessage());  
}

echo json_encode($record);
?>