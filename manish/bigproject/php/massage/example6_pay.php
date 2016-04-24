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
  
  $id = '-KG5y1aTVficxdA5eCp6';
  $user_id = 'google:117652198097778721736'; //'google:112913147917981568678';
  echo $id;
  echo '<br>';
  echo $user_id;
  echo '<br>';
  $data = array();
  $data['mc_gross'] = 9.99;
  $data['mc_fee'] = 0.59;
  $data['txn_id'] = 10;
  subscr_payment($id, $user_id, $data);
  echo 'done';
?>