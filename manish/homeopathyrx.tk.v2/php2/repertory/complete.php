<?php
include('../init.php');
$action = !empty($_GET['action']) ? $_GET['action'] : '';
$record = array('success' => 1);
try {
  if (!empty($_REQUEST['access_token'])) {
    $res = validateAccessToken($modelClasses, $_REQUEST['access_token']);
    //$_GET['uid'] = '';
    if (!empty($res)) {
      define('UID', $res['uid']);
      $_GET['uid'] = $res['uid']; 
    }
  }
  
switch ($action) {
  case 'getAllChapters':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=getAllChapters
    $query = 'select * from consultl_homeopathy.complete_repertory where chapter = 0 order by id';
    $results = $Models_General->fetchAll($query, array(), 0);
    $record['data'] = $results;
    break;
  case 'complete_search':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_search&keyword=skin&page=0&max=100
    if (empty($_GET['keyword'])) {
      throw new Exception('empty keyword');
    }
    $Complete = new repertory_Complete();
    $max = !empty($_GET['max']) ? $_GET['max'] : 100;
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $cacheTime = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : TIME24hr;
    $keyword = $_GET['keyword'];
    $data = $Complete->getAllSearch($Models_General, $keyword, $max, $page, $cacheTime);
    $record['data'] = $data;
    break;  
  case 'complete_browse':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_browse&chapter=1&page=0&max=100
    if (empty($_GET['chapter'])) {
      throw new Exception('empty chapter');
    }
    $Complete = new repertory_Complete();
    $max = !empty($_GET['max']) ? $_GET['max'] : 100;
    $page = !empty($_GET['page']) ? $_GET['page'] : 0;
    $cacheTime = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : TIME24hr;
    $chapter = $_GET['chapter'];
    $data = $Complete->browseByChapter($Models_General, $chapter, $max, $page, $cacheTime);
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
    
    $chapter = $tmp[0];
    
    
    $data = array();
    $data['symptom'] = $tmp[(count($tmp) - 1)];
    $data['path'] = trim(strtolower($symptoms));
    $data['path_md5'] = md5($data['path']);
    $data['parent'] = null;
    $data['parentMd5'] = null;
    
    $query = 'select * from consultl_homeopathy.complete_repertory where path_md5 = ?';
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
    
    $query = 'select * from consultl_homeopathy.complete_repertory where path = ?';
    $chapterResults = $Models_General->fetchRow($query, array($chapter), 3000);
    
    $data['chapter'] = !empty($chapterResults['id']) ? $chapterResults['id'] : 1000;
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
    $res = $Models_General->addDetails('consultl_homeopathy.complete_repertory', $data);
    $record['data'] = $data;
    $record['result'] = $res;
    break;
    
  case 'complete_repertory_getAll':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_repertory_getAll&uid=xyz&cacheTime=0
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    $query = 'select * from consultl_homeopathy.my_complete_repertory as m LEFT JOIN consultl_homeopathy.complete_repertory
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
  case 'complete_repertory_add_specific':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=complete_repertory_add_specific&id=1&uid=xyz&intensity=4
    if (empty($_GET['id'])) {
      throw new Exception('missing id');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    
    $data = array();
    $data['id'] = $_GET['id'];
    $data['uid'] = $_GET['uid'];
    $data['intensity'] = !empty($_GET['intensity']) ? $_GET['intensity'] : 1;
    
    $query = 'select * from consultl_homeopathy.my_complete_repertory as m WHERE m.uid = ? AND m.id = ?';
    $results = $Models_General->fetchRow($query, array($_GET['uid'], $_GET['id']), 0);
    $record['res'] = 0;
    if (empty($results)) {
      $res = $Models_General->addDetails('consultl_homeopathy.my_complete_repertory', $data);
      $record['res'] = $res;
    } else {
      $where = sprintf('rid=%s', GetSQLValueString($results['rid'], 'int'));
      $record['results'] = $results;
      $res = $Models_General->updateDetails('consultl_homeopathy.my_complete_repertory', $data, $where);
    }
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
    
    $query = 'select * from consultl_homeopathy.my_complete_repertory as m WHERE m.uid = ? AND m.id = ?';
    $results = $Models_General->fetchRow($query, array($_GET['uid'], $_GET['id']), 0);
    $record['res'] = 0;
    if (empty($results)) {
      $res = $Models_General->addDetails('consultl_homeopathy.my_complete_repertory', $data);
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
    
    $q = 'delete from consultl_homeopathy.my_complete_repertory WHERE rid = ? AND uid = ?';
    $res = $Models_General->deleteDetails($q, array($_GET['rid'], $_GET['uid']));
    break;
  
  case 'save_complete_repertory':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=save_complete_repertory
    //post &id=1&uid=xyz&name=
    
    $json = file_get_contents('php://input');
    $content = json_decode($json, 1);
    if (empty($content['uid'])) {
      throw new Exception('uid is missing');  
    }
    if (empty($content['ids'])) {
      throw new Exception('ids is missing');  
    }
    if (empty($content['name'])) {
      throw new Exception('name is missing');  
    }
    $data = array();
    $data['uid'] = $content['uid'];
    $data['name'] = $content['name'];
    $data['trace_id'] = guid();
    foreach ($content['ids'] as $k => $v) {
      $data['id'] = $k;
      $data['intensity'] = $v;
      $res = $Models_General->addDetails('consultl_homeopathy.save_complete_repertory', $data);
    }
    
    $record['res'] = 1;
    break;
  
  case 'saved_complete_repertory':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=saved_complete_repertory&uid=xyz&cacheTime=0
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    $ct = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : 1500;
    $query = 'select DISTINCT trace_id, name, createdOn from consultl_homeopathy.save_complete_repertory WHERE uid = ?';
    $results = $Models_General->fetchAll($query, array($_GET['uid']), $ct);
    $record['data'] = $results;
    break;
    
  case 'savedOne_complete_repertory':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=savedOne_complete_repertory&trace_id=xyz&cacheTime=1
    if (empty($_GET['trace_id'])) {
      throw new Exception('missing trace_id');  
    }
    $ct = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : 1500;
    $query = 'select * from consultl_homeopathy.save_complete_repertory as m LEFT JOIN consultl_homeopathy.complete_repertory
 as r ON m.id = r.id WHERE m.trace_id = ?';
    $results = $Models_General->fetchAll($query, array($_GET['trace_id']), $ct);
    if (!empty($results)) {
      foreach ($results as $k => $v) {
        if (!empty($v['remedies'])) {
          $results[$k]['remedies'] = json_decode($v['remedies'], 1);  
        }
      }
    }
    $record['data'] = $results;
    break;
  case 'saved_complete_repertory_delete':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=saved_complete_repertory_delete&rid=5199&access_token=xyz
    if (empty($_GET['rid'])) {
      throw new Exception('missing rid');  
    }
    if (empty($_GET['access_token'])) {
      throw new Exception('missing access_token');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('token expired, login again');  
    }
    $q = 'delete from consultl_homeopathy.save_complete_repertory WHERE rid = ? AND uid = ?';
    $res = $Models_General->deleteDetails($q, array($_GET['rid'], $_GET['uid']));
    break;
  case 'deleteSavedCase':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=deleteSavedCase&trace_id=xyz&access_token=xyz
    if (empty($_GET['trace_id'])) {
      throw new Exception('missing trace_id');  
    }
    if (empty($_GET['access_token'])) {
      throw new Exception('missing access_token');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('token expired, login again');  
    }
    $q = 'delete from consultl_homeopathy.save_complete_repertory WHERE trace_id = ? AND uid = ?';
    $res = $Models_General->deleteDetails($q, array($_GET['trace_id'], $_GET['uid']));
    $q = 'delete from consultl_homeopathy.save_prescription WHERE trace_id = ? AND uid = ?';
    $res = $Models_General->deleteDetails($q, array($_GET['trace_id'], $_GET['uid']));
    break;
  
  case 'savePrescription':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=savePrescription&access_token=xyz&trace_id=xyz&remedy=xyz&prescription_date=xyz
    
    if (empty($_GET['access_token'])) {
      throw new Exception('missing access_token');  
    }
    if (empty($_GET['uid'])) {
      throw new Exception('uid is missing');  
    }
    if (empty($_GET['remedy'])) {
      throw new Exception('remedy is missing');  
    }
    if (empty($_GET['trace_id'])) {
      throw new Exception('trace_id is missing');  
    }
    if (empty($_GET['prescription_date'])) {
      throw new Exception('prescription_date is missing');  
    }
    $data = array();
    $data['uid'] = $content['uid'];
    $data['remedy'] = $_GET['remedy'];
    $data['trace_id'] = $_GET['trace_id'];
    $data['prescription_date'] = $_GET['prescription_date'];
    $record['res'] = $Models_General->addDetails('consultl_homeopathy.save_prescription', $data);
    break;
  
  case 'saved_complete_repertory':
    //http://homeopathyrx.tk/php2/repertory/complete.php?action=saved_complete_repertory&uid=xyz&cacheTime=0
    if (empty($_GET['uid'])) {
      throw new Exception('missing uid');  
    }
    $ct = isset($_GET['cacheTime']) ? $_GET['cacheTime'] : 1500;
    $query = 'select DISTINCT trace_id, name, createdOn from consultl_homeopathy.save_complete_repertory WHERE uid = ?';
    $results = $Models_General->fetchAll($query, array($_GET['uid']), $ct);
    $record['data'] = $results;
    break;
  default:
    break;
}

} catch (Exception $e) {
  $record = array('success' => 0, 'error' => $e->getMessage());  
}

echo json_encode($record);
?>