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
  

    $id = '-KF02hR1yjJ5m-kKAmwB';
    $path = DEFAULT_PATH . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $user_id = $record['uid'];
    $exp = strtotime("+1 month", time());
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    
    
    //get counter
    $path = MAIN_PATH . '/usersChain/counter';
    $counter = $firebase->get($path);
    if (empty($counter)) {
      $counter = 1;
    } else {
      $counter = (int) $counter + 1;
    }
    echo "counter is ". $counter;
    $arrChain = calc_recursive_counter($counter);
    pr($arrChain);
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
    
    $path = MAIN_PATH . '/usersChain/counter';
    $firebase->set($path, $counter);
    
    $path = MAIN_PATH . '/usersChain/list/'.$counter;
    $firebase->set($path, $user_id);
    pr($arrRef);
    
?>