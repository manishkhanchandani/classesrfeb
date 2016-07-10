<?php
try {
  $result = array();
  $result['success'] = 1;
  include('initJson.php');
  $result['BASE_DIR'] = BASE_DIR;
  $result['ROOTDIR'] = ROOTDIR;
  
  //host entry
  $host = $_SERVER['HTTP_HOST'];
  $host = str_replace('www.', '', $host);
  $result['host'] = $host;
  //host entry ends

  $dirName = dirname($_SERVER['PHP_SELF']);
  if ($dirName !== '/') $dirName = $dirName.'/';
  $result['dirName'] = $dirName;

  $page = !empty($_GET['page']) ? $_GET['page'] : 'home';
  $page = $page.'.php';
  
  
  if (file_exists($page)) {
    $result['page'] = $page;
    include($page);
  } else {
    $page = 'home.php';
    $result['page'] = $page;
    include($page);
  }

} catch (Exception $e) {
  $result['success'] = 0;
  $result['error'] = $e->getMessage();
}

echo json_encode($result);
?>