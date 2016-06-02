<?php
include('../init.php');
$action = !empty($_GET['action']) ? $_GET['action'] : '';
$record = array('success' => 1);
try {
switch ($action) {
  case 'complete_search':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_search&keyword=skin&start=0&maxData=100
    if (empty($_GET['keyword'])) {
      throw new Exception('empty keyword');
    }
    $Complete = new repertory_Complete();
    $max = !empty($_GET['max']) ? $_GET['max'] : 100;
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $cacheTime = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : TIMESMALL;
    
    $keyword = $_GET['keyword'];
    $data = $Complete->getAllSearch($Models_General, $keyword, $max, $page, $cacheTime);
    $record['data'] = $data;
    break;  
  case 'complete_getAll':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_getAll&start=0&maxData=100&cacheTime=0
    $Complete = new repertory_Complete();
    $max = !empty($_GET['max']) ? $_GET['max'] : 100;
    $start = !empty($_GET['start']) ? $_GET['start'] : 0;
    $cacheTime = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : TIMESMALL;
    $data = $Complete->getAll($Models_General, $max, $start, $cacheTime);
    $record['data'] = $data;
    break;  
  //http://homeopathyrx.tk/php2/repertory/complete.php?action=add
  case 'add':
    $json = file_get_contents('php://input');
    $content = json_decode($json, 1);
    if (empty($content)) {
      throw new Exception('empty content'); 
    }
    //parse the content 
    $symptoms = $content['symptoms'];
    $remedies = $content['remedies'];
    $tmp = explode(';', $symptoms);
    
    $data = array();
    $data['symptom'] = $tmp[(count($tmp) - 1)];
    $data['path'] = trim(strtolower($symptoms));
    $data['path_md5'] = md5($data['path']);
    $data['parent'] = null;
    $data['parentMd5'] = null;
    
    $query = 'select * from complete_repertory where path_md5 = ?';
    $results = $Models_General->fetchRow($query, array($data['path_md5']), 0);
    if (!empty($results)) {
      throw new Exception('symptom already present');  
    }
    
    if (!empty($tmp)) {
      $tmp2 = array();
      //finding parent
      $max = count($tmp) - 2;
      foreach ($tmp as $k => $v) {
        if ($k > $max) break;
        array_push($tmp2, $v);
      }
      if (!empty($tmp2)) {
        $data['parent'] = trim(strtolower(implode(';', $tmp2)));
      }
      if (!empty($data['parent'])) {
        $data['parentMd5'] = md5($data['parent']);
      }
    }
    
    $data['remedies'] = null;
    $rem = array();
    if (!empty($remedies)) {
      $tmp = explode(' ', $remedies);
      if (!empty($tmp)) {
        foreach ($tmp as $k => $v) {
          if (empty($v)) continue;
          
          $regexp = '^(.*)\((.*)\)$';
          $matches = regexp($v, $regexp);  
          if (empty($matches[0])) {
            $rem[] = array('remedy' => trim(strtolower($v)), 'points' => 1);
          } else {
            $rem[] = array('remedy' => trim(strtolower($matches[0][1])), 'points' => (int) $matches[0][2]);
          }
        }
      }
      
      $data['remedies'] = json_encode($rem);
    }
    $res = $Models_General->addDetails('complete_repertory', $data);
    $record['data'] = $data;
    $record['result'] = $res;
    break;
    
  case 'complete_repertory_getAll':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_repertory_getAll&uid=xyz&cacheTime=0
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    $query = 'select * from my_complete_repertory as m LEFT JOIN complete_repertory
 as r ON m.id = r.id WHERE m.uid = ?';
    $results = $Models_General->fetchAll($query, array($_GET['uid']), $_GET['cacheTime']);
    if (!empty($results)) {
      foreach ($results as $k => $v) {
        if (!empty($v['remedies'])) {
          $results[$k]['remedies'] = json_decode($v['remedies'], 1);  
        }
      }
    }
    $record['data'] = $results;
    break;
  case 'complete_repertory_add':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_repertory_add&id=1&uid=xyz
    if (empty($_GET['id'])) {
      throw new Exception('missing id');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    
    $data = array();
    $data['id'] = $_GET['id'];
    $data['uid'] = $_GET['uid'];
    
    $query = 'select * from my_complete_repertory as m WHERE m.uid = ? AND m.id = ?';
    $results = $Models_General->fetchRow($query, array($_GET['uid'], $_GET['id']), 0);
    $record['res'] = 0;
    if (empty($results)) {
      $res = $Models_General->addDetails('my_complete_repertory', $data);
      $record['res'] = $res;
    }
    break;
  case 'complete_repertory_delete':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_repertory_delete&rid=5199&uid=xyz
    if (empty($_GET['rid'])) {
      throw new Exception('missing rid');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    
    $q = 'delete from my_complete_repertory WHERE rid = ? AND uid = ?';
    $res = $Models_General->deleteDetails($q, array($_GET['rid'], $_GET['uid']));
    break;
  default:
    break;
}

} catch (Exception $e) {
  $record = array('success' => 0, 'error' => $e->getMessage());  
}

echo json_encode($record);
?>