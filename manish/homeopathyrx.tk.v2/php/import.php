<?php
include_once('firebase/firebaseLib.php');
define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
define('MAIN_PATH', '/homeopathyRx');
define('MAIN_PATH2', '/homeopathy');
$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
include_once('functions.php');

$record = curlget('http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDiseaseAll');
$res = json_decode($record, 1);
foreach ($res['data']['diseases'] as $disease) {
  
  $tmp = $res['data']['hom'][$disease['disease_id']];
  $details = array();
  $remedies = array();
  foreach ($tmp as $k => $v) {
    $details[$k] = $v;
    unset($details[$k]['remedies']);
    $path = MAIN_PATH . '/remedies/'.$disease['disease_id'].'/'.$v['id'];
    $firebase->set($path, $v['remedies']);
  }
  $disease['details'] = $details;
 $path = MAIN_PATH2 . '/diseases/'.$disease['disease_id'];
 $firebase->set($path, $disease);
}
pr($res);
exit;
?>