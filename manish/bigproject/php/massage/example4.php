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
  
  $id = '-KFqzbjnx6-B4VBF8Akm';
  $user_id = 'google:101318303150498751334';
  echo $id;
  copyRecordByUserId($firebase, $id, $user_id, DEFAULT_PATH_TMP, DEFAULT_PATH);
  echo 'done';
?>