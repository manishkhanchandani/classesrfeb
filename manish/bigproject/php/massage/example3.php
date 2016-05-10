<?php

  include_once('../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage');
  define('DEFAULT_PATH_TMP', '/massage/massageTmp');
  define('DEFAULT_PATH_CANCELLED', '/massage/massageCancelled');
  define('DEFAULT_PATH', '/massage/massage');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('../functions.php');
  include_once('config.php');
  
function getDetails($id) {
    global $firebase;
   // error_log(date('[Y-m-d H:i e] '). "getDetails started". PHP_EOL, 3, LOG_FILE);
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
    //error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }
  
    
  function subscr_payment($id, $user_id, $data) {
    global $firebase, $smountSharingConfig;
    //error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    //error_log(date('[Y-m-d H:i e] '). "id: ".$id. PHP_EOL, 3, LOG_FILE);
    //error_log(date('[Y-m-d H:i e] '). "user_id: ".$user_id. PHP_EOL, 3, LOG_FILE);
    $record = getDetails($id);
    if (empty($record)) {
      //error_log(date('[Y-m-d H:i e] '). "empty posting data". PHP_EOL, 3, LOG_FILE);
      throw new Exception('empty posting data');
    }
    $exp = strtotime("+1 month", time());
    $record['expiration'] = $exp;
    $record['expiration_format'] = date('r', $exp);
    
    
    //error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount". PHP_EOL, 3, LOG_FILE);
    $totalAmount = $data['mc_gross'] - $data['mc_fee'];
    
    $path = MAIN_PATH . '/amountReceived/totalAmount/'.$id;
    $firebase->set($path, $totalAmount);
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
    
    $record['chain'] = $arrRef;
    
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
    
    
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      if (empty($r)) {
        continue;  
      }
      //$firebase->delete($path);
      //error_log(date('[Y-m-d H:i e] '). "subscr_payment path1: ".$path. PHP_EOL, 3, LOG_FILE);
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->update($path, $r);
      //error_log(date('[Y-m-d H:i e] '). "subscr_payment path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }
    
    $path = MAIN_PATH . '/usersChain/counter';
    $firebase->set($path, $counter);
    
    $path = MAIN_PATH . '/usersChain/list/'.$counter;
    $firebase->set($path, $user_id);
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }
  
    $id = '-KFRYSpauJLvtQXzMpmu';
    $data['txn_id'] = 1;
    $data['mc_gross'] = 10;
    $data['mc_fee'] = 0.59;
  subscr_payment($id, 'google:117652198097778721736', $data);
    exit;
?>