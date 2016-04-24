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
  $user_id = 'google:115733859954457656229'; //'google:112913147917981568678';
  echo $id;
  echo '<br>';
  echo $user_id;
  echo '<br>';
  $data = array();
  subscr_signup($id, $user_id, $data);
  echo 'done';
?>