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
  
    $id = '-KEzFobg6RHQvM1h4hYh';
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    
    pr($record);
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      $firebase->delete($path);
      echo $path.'<br>';
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->set($path, $r);
      echo $path.'<br>';
    }
    exit;
    
    ?>