<?php
include('../init.php');
$action = !empty($_GET['action']) ? $_GET['action'] : '';
$record = array('success' => 1);
try {
  
  $query = 'select * from consultl_homeopathy.complete_repertory where chapter = 0 and parent is not null';
  $results = $Models_General->fetchAll($query, array(), 0);
  foreach ($results as $k => $v) {
    
    $tmp = explode(';', $v['path']);
    $chapter = $tmp[0];
    $query = 'select * from consultl_homeopathy.complete_repertory where path = ?';
    $chapterResults = $Models_General->fetchRow($query, array($chapter), 3000);
    $data['chapter'] = $chapterResults['id'];
    echo $q = 'update consultl_homeopathy.complete_repertory set chapter = '.$chapterResults['id'].' where id = '.$v['id'];
    echo "\n\n<br><br>";
    mysql_query($q);
  }
    

} catch (Exception $e) {
  $record = array('success' => 0, 'error' => $e->getMessage());  
}

echo json_encode($record);
?>