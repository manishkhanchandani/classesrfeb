<?php
include('../init.php');
$action = !empty($_GET['action']) ? $_GET['action'] : '';
$record = array('success' => 1);
try {
switch ($action) {
  case 'kent_repertory_chapters':
    //http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_chapters
    $record['data'] = array_values($chapters);
    break;
  case 'kent_repertory_getAll':
    //http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_getAll&chapter=38&start=0&maxData=100&cacheTime=0
    if (empty($_GET['chapter'])) {
      throw new Exception('empty chapter');
    }
    $kent = new repertory_Kent();
    $max = !empty($_GET['max']) ? $_GET['max'] : 100;
    $start = !empty($_GET['start']) ? $_GET['start'] : 0;
    $cacheTime = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : TIMESMALL;
    $data = $kent->getAll($Models_General, $_GET['chapter'], $max, $start, $cacheTime);
    $record['data'] = $data;
    break;  
  case 'kent_repertory_update':
    //http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_update&id=1
    if (empty($_GET['id'])) {
      throw new Exception('missing id');  
    }
    
    $json = file_get_contents('php://input');
    $content = json_decode($json, 1);
    $record['data'] = $content;
    $where = sprintf('id=%s', GetSQLValueString($_GET['id'], 'int'));
    $record['where'] = $where;
    $res = $Models_General->updateDetails('hom_kent_repertory', $content, $where);
    $record['res'] = $res;
    break;
  case 'kent_repertory_delete':
    //http://homeopathyrx.tk/php2/repertory/record.php?action=kent_repertory_delete&id=5199
    if (empty($_GET['id'])) {
      throw new Exception('missing id');  
    }
    
    $kent = new repertory_Kent();
    $kent->deleteRecord($Models_General, $_GET['id']);
    $record['res'] = true;
    break;
  default:
    break;
}

} catch (Exception $e) {
  $record = array('success' => 0, 'error' => $e->getMessage());  
}

echo json_encode($record);
?>