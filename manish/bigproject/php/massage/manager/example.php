<?php

  include_once('../../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage/manager');
  define('DEFAULT_PATH_TMP', '/massage/manager/countyPending');
  define('DEFAULT_PATH_CANCELLED', '/massage/manager/countyCancelled');
  define('DEFAULT_PATH', '/massage/manager/county');
  define('DEFAULT_PATH_MY', '/massage/manager/my');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('../../functions.php');
  
  
  function getDetails($uPath) {
    global $firebase;
    //error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    //error_log(date('[Y-m-d H:i e] '). "uPath is: ".var_export($uPath, 1). PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_TMP . '/'.$uPath;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/'.$uPath;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      if (empty($record)) {
        $path = DEFAULT_PATH_CANCELLED . '/'.$uPath;
        $rec = $firebase->get($path);
        $record = json_decode($rec, 1);
        $record['sourcePath'] = 'countyCancelled';
      } else {
        $record['sourcePath'] = 'county';
      }
    } else {
      $record['sourcePath'] = 'countyPending';
    }
    //error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }
  
  function subscr_payment($uid, $uPath) {
    global $firebase;
    //error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    //error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $path = DEFAULT_PATH . '/' . $uPath;
    $firebase->update($path, $record);
    $exp = strtotime("+1 year", time());
    $path = DEFAULT_PATH . '/'. $uPath. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/'. $uPath. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    //error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }
  
  
  function subscr_signup($uid, $uPath) {
    global $firebase;
    //error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    //error_log(date('[Y-m-d H:i e] '). "subscr_signup started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $path = DEFAULT_PATH_TMP . '/' . $uPath;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/' . $uPath;
    $firebase->update($path, $record);
    //error_log(date('[Y-m-d H:i e] '). "subscr_signup ended". PHP_EOL, 3, LOG_FILE);
    //custom logic ends here
  }
  
  
  function subscr_cancel($uid, $uPath) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $record['cancel_date'] = time();
    $record['cancel_date_format'] = date('r');
    pr($record);
    //error_log(date('[Y-m-d H:i e] '). "subscr_cancel path: ".$uPath. PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_CANCELLED . '/' . $uPath;
    $firebase->update($path, $record);
    //error_log(date('[Y-m-d H:i e] '). "subscr_cancel ended". PHP_EOL, 3, LOG_FILE);
  }


  $uid = 'google:112913147917981568678';
  $uPath = 'VW5pdGVkIFN0YXRlcw==/Q0E=/U2FudGEgQ2xhcmEgQ291bnR5';
  //$record = getDetails($uPath);
  
  
    $path = '/massage/amountReceived/txn_id/9NP758795K865743F';
    echo $txnIdRec = json_decode($firebase->get($path), 1);

  exit;