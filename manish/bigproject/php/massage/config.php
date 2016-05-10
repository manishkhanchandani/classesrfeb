<?php

  if (!defined('LOG_FILE')) {
    define("LOG_FILE", "./ipn_".date('Y-m-d').".log");
  }
  
  $smountSharingConfig = array( 'admin' => 20,
            'owner' => 40,
            'ref1_level1' => 10,
            'ref1_level2' => 5,
            'ref1_level3' => 3,
            'ref1_level4' => 2,
            'ref2_level1' => 5,
            'ref2_level2' => 5,
            'ref2_level3' => 5,
            'ref2_level4' => 5
            );




function getRecordDetails($firebase, $id) {
  $path = DEFAULT_PATH_TMP . '/records/'.$id;
  $record = json_decode($firebase->get($path), 1);
  if (empty($record)) {
    $path = DEFAULT_PATH . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (!empty($record)) {
      $record['sourcePath'] = DEFAULT_PATH;
    }
  } else {
    $record['sourcePath'] = DEFAULT_PATH_TMP;
  }
  return $record;  
}
  


function saveData($firebase, $user_id, $data) {
  $path = MAIN_PATH . '/users/'.$user_id;
  $userData = json_decode($firebase->get($path), 1);
  $data['details']['postedBy'] = $userData['displayName'];
  $data['details']['profileImage'] = $userData['image'];
  $data['uid'] = $user_id;
  $oldUserId = $user_id;
  foreach($data['paths'] as $k => $v) {
    if (substr($v, 0, 2) === 'my') {
      $matches = regexp($v, '^my\/(.*)\/(.*)$');
      $oldUserId = $matches[0][1];
      $data['paths'][$k] = 'my/'.$user_id.'/'.$matches[0][2];
    }
  }
  
  $path = DEFAULT_PATH . '/records/'.$data['id'];
  $firebase->update($path, $data);
  $firebase->delete(DEFAULT_PATH.'/my/'.$oldUserId.'/'.$data['id']);
  $firebase->set(DEFAULT_PATH.'/my/'.$user_id.'/'.$data['id'], time() * 1000);
  return $data;
  /*
  $pathID = $data['id'];
  $idPath = DEFAULT_PATH . '/records/'.$pathID;
  //$arr = json_decode($sid, 1);
  //$pathID = $arr['name'];
  
  //$idPath = DEFAULT_PATH . '/records/'.$pathID;
  //$firebase->set($idPath.'/id', $pathID);
  
  $recordPath = $idPath.'/paths';
  $firebase->delete($recordPath);
  
  $firebase->set(DEFAULT_PATH.'/my/'.$user_id.'/'.$pathID, time() * 1000);
  if (!empty($data['location']['county'])) {
    $firebase->set(DEFAULT_PATH.'/location/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID, time() * 1000);
  }
  
  
  $firebase->push($recordPath, 'records/' . $pathID);
  $firebase->push($recordPath, 'my/' .$user_id . '/' .$pathID);
  $firebase->push($recordPath, 'location/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID);
  
  
  if (!empty($data['tags2'])) {
    $arr = explode(',', $data['tags2']);
    foreach ($arr as $v) {
      $v = strtolower(trim($v));
      if (empty($v)) {
       continue; 
      }//end if
      if (!empty($data['location']['county'])) {
        $firebase->set(DEFAULT_PATH.'/tags/' . base64_encode($v) . '/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID, time() * 1000);
        $firebase->push($recordPath, 'tags/' . base64_encode($v) . '/' .  base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID);
      }
      $firebase->set(DEFAULT_PATH.'/onlyTags/' . base64_encode($v) . '/' . $pathID, time() * 1000);
      $firebase->push($recordPath, 'onlyTags/' . base64_encode($v) . '/' . $pathID);
    }
  }*/
}

function deleteRecord($firebase, $record, $sourcePath) {
  //delete all old paths
  if (empty($record['paths'])) {
    return;
  }
  
  foreach ($record['paths'] as $v) {
    if (substr($v, 0, 7) === 'records') {
      continue; 
    }
    $path = $sourcePath. '/' . $v;
    $firebase->delete($path);
  }
  
  return $record;
}

/*
 * $id, record id
 * $user_id, the new user id
 * path1 is tmp path or path which you want to delete, path 2 is path which you want to save
 */
function copyRecordByUserId($firebase, $id, $user_id)
{
  $record = getRecordDetails($firebase, $id);
  if (empty($record)) {
    return false; 
  }

  //save data
  $d = saveData($firebase, $user_id, $record);
  return $d;
}


function updatePath($firebase, $paths)
{
  if (empty($paths)) {
    return false;  
  }
  foreach ($paths as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      $firebase->delete($path);
      error_log(date('[Y-m-d H:i e] '). "updatePath path1: ".$path. PHP_EOL, 3, LOG_FILE);
      if (substr($v, 0, 7) === 'records' || empty($r)) {
        continue; 
      }
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->set($path, $r);
      error_log(date('[Y-m-d H:i e] '). "updatePath path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }  
    return true;
}

  function save_data($id, $user_id, $data) {
    global $firebase;
    $data['mdate'] = date('r');
    $data['mtime'] = time();
    $path = MAIN_PATH . '/payments/all';
    $sid = $firebase->push($path, $data);
    $arr = json_decode($sid, 1);
    $pathID = $arr['name'];
    $path = MAIN_PATH . '/payments/users/'.$user_id.'/'.$id.'/'.$pathID;
    $firebase->set($path, time());
  }
  
  function getDetails($id) {
    error_log(date('[Y-m-d H:i e] '). "getDetails started". PHP_EOL, 3, LOG_FILE);
    global $firebase;
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/records/'.$id;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      $record['sourcePath'] = 'massage';
    } else {
      $record['sourcePath'] = 'massageTmp';
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }

  function subscr_cancel($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($id);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      if (empty($r)) {
        continue;  
      }
      $path = DEFAULT_PATH_CANCELLED . '/' . $v;
      $firebase->set($path, $r);
    }
    
    
    $path = DEFAULT_PATH_CANCELLED . '/records/'. $id . '/cancelDate';
    $firebase->set($path, time() * 1000);
    $path = DEFAULT_PATH . '/records/'. $id . '/cancelDate';
    $firebase->set($path, time() * 1000);
    
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_payment($id, $user_id, $data) {
    global $firebase, $smountSharingConfig;
    error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "id: ".$id. PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "user_id: ".$user_id. PHP_EOL, 3, LOG_FILE);
    //get the details
    $record = getRecordDetails($firebase, $id);
    if (empty($record)) {
      error_log(date('[Y-m-d H:i e] '). "empty posting data". PHP_EOL, 3, LOG_FILE);
      throw new Exception('empty posting data');
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    
    //check if user is changed else save the data
    if ($record['uid'] !== $user_id) {
      $record = copyRecordByUserId($firebase, $id, $user_id); 
      if (empty($record)) {
        error_log(date('[Y-m-d H:i e] '). "empty posting data2". PHP_EOL, 3, LOG_FILE);
        throw new Exception('empty posting data2');
      }
      error_log(date('[Y-m-d H:i e] '). "record changed: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    } else {
      $record = saveData($firebase, $user_id, $record); 
    }//end if
    
    //setting the expiration
    if ($record['expiration']) {
      $exp = strtotime("+1 year", $record['expiration'] / 1000);
    } else {
      $exp = strtotime("+1 year", time());
    }
    $record['expiration'] = $exp * 1000;
    $record['expiration_format'] = date('r', $exp);
    $record['uid'] = $user_id;
    
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount". PHP_EOL, 3, LOG_FILE);
    $totalAmount = $data['mc_gross'] - $data['mc_fee'];

    //total amount
    $path = MAIN_PATH . '/amountReceived/totalAmount/total';
     $amt = $firebase->get($path);
     if (empty($amt)) {
      $amt = 0.00; 
     }
     $amt = $amt + $totalAmount;
    $firebase->set($path, $amt);
    
    
    $path = MAIN_PATH . '/amountReceived/totalAmount/records/'.$id;
    $firebase->push($path, $totalAmount);
    //total amount ends
    
    //get counter
    $path = MAIN_PATH . '/usersChain/counter';
    $counter = $firebase->get($path);
    if (empty($counter)) {
      $counter = 1;
    } else {
      $counter = (int) $counter + 1;
    }
    
    $arrChain = calc_recursive_counter($counter);
    //end counter
    $arrRef = array();
    $path = MAIN_PATH . '/manager/county/'.base64_encode($record['location']['country']).'/'.base64_encode($record['location']['state']).'/'.base64_encode($record['location']['county']);
    $countyRecord = json_decode($firebase->get($path), 1);
    
    $arrRef['county'] = ADMIN_USER;
    if (!empty($countyRecord)) {
      $arrRef['county'] = $countyRecord['uid'];
    }
    
    $path = MAIN_PATH . '/users/'.$user_id;
    $usersRecord = json_decode($firebase->get($path), 1);
    $arrRef['ref1'] = !empty($usersRecord['chain'][0]) ? $usersRecord['chain'][0] : ADMIN_USER;
    $arrRef['ref2'] = !empty($usersRecord['chain'][1]) ? $usersRecord['chain'][1] : ADMIN_USER;
    $arrRef['ref3'] = !empty($usersRecord['chain'][2]) ? $usersRecord['chain'][2] : ADMIN_USER;
    $arrRef['ref4'] = !empty($usersRecord['chain'][3]) ? $usersRecord['chain'][3] : ADMIN_USER;
    
    $arrRef['ref5'] = !empty($arrChain[0]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[0]), 1) : ADMIN_USER;
    $arrRef['ref6'] = !empty($arrChain[1]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[1]), 1) : ADMIN_USER;
    $arrRef['ref7'] = !empty($arrChain[2]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[2]), 1) : ADMIN_USER;
    $arrRef['ref8'] = !empty($arrChain[3]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[3]), 1) : ADMIN_USER;
    
    addAmountInUserAccount($firebase, ADMIN_USER, $totalAmount, $smountSharingConfig['admin'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['county'], $totalAmount, $smountSharingConfig['owner'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref1'], $totalAmount, $smountSharingConfig['ref1_level1'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref2'], $totalAmount, $smountSharingConfig['ref1_level2'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref3'], $totalAmount, $smountSharingConfig['ref1_level3'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref4'], $totalAmount, $smountSharingConfig['ref1_level4'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref5'], $totalAmount, $smountSharingConfig['ref2_level1'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref6'], $totalAmount, $smountSharingConfig['ref2_level2'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref7'], $totalAmount, $smountSharingConfig['ref2_level3'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref8'], $totalAmount, $smountSharingConfig['ref2_level4'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount ends". PHP_EOL, 3, LOG_FILE);
    
    $path = DEFAULT_PATH . '/records/'. $id;
    $firebase->update($path, $record);
    
    updatePath($firebase, $record['paths']);
    
    $path = MAIN_PATH . '/usersChain/counter';
    $firebase->set($path, $counter);
    
    $path = MAIN_PATH . '/usersChain/list/'.$counter;
    $firebase->set($path, $user_id);
    
    $path = MAIN_PATH . '/usersChain/chain/'.$counter;
    $firebase->set($path, $arrRef);
    
    $path = MAIN_PATH . '/usersChain/record/'.$counter;
    $firebase->set($path, $id);
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_signup($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_signup started". PHP_EOL, 3, LOG_FILE);
    $record = getRecordDetails($firebase, $id);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    if ($record['uid'] !== $user_id) {
      $record = copyRecordByUserId($firebase, $id, $user_id); 
      if (empty($record)) {
        error_log(date('[Y-m-d H:i e] '). "empty posting data2". PHP_EOL, 3, LOG_FILE);
        throw new Exception('empty posting data2');
      }
      error_log(date('[Y-m-d H:i e] '). "record changed: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    } else {
      $record = saveData($firebase, $user_id, $record); 
    }
    
    //setting the expiration
    $exp = strtotime("+1 year", time());
    $record['expiration'] = $exp * 1000;
    $record['expiration_format'] = date('r', $exp);
    $path = DEFAULT_PATH . '/records/'. $id;
    $firebase->update($path, $record);
    
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      $firebase->delete($path);
      error_log(date('[Y-m-d H:i e] '). "subscr_signup path1: ".$path. PHP_EOL, 3, LOG_FILE);
      if (substr($v, 0, 7) === 'records' || empty($r)) {
        continue; 
      }
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->set($path, $r);
      error_log(date('[Y-m-d H:i e] '). "subscr_signup path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }
    /*
    $exp = strtotime("+3 months", time());
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    $path = DEFAULT_PATH . '/records/'. $id. '/uid';
    $firebase->set($path, $user_id);*/
    error_log(date('[Y-m-d H:i e] '). "subscr_signup ended". PHP_EOL, 3, LOG_FILE);
    //custom logic ends here
  }
