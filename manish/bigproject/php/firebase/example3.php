<?php

    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
        }
    }
    include_once('firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage');
  define('DEFAULT_PATH_TMP', '/massage/massageTmp');
  define('DEFAULT_PATH', '/massage/massage');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  
  $data = array('x' => 'y');
  $path = MAIN_PATH . '/payments/all';
  $sid = $firebase->push($path, $data);
  $arr = json_decode($sid, 1);
  pr($arr['name']);
  $pathID = $arr['name'];
  $path = MAIN_PATH . '/payments/users/5/6/'.$pathID;
  $firebase->set($path, time());
  exit;
    
    $id = '-KEyzoZpnDmumFdDT7Ob';
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/records/'.$id;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      $record['path'] = 'massage';
    } else {
      $record['path'] = 'massageTmp';
    }
    pr($record);
    exit;
    ?>