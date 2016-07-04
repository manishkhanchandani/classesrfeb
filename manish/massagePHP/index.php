<?php
try {
  include('init.php');
  
  //host entry
  $host = $_SERVER['HTTP_HOST'];
  $host = str_replace('www.', '', $host);
  //host entry ends
  
  //search by host Name
  $query = "select * from parlor_sites WHERE domain = ?";
  $params = array($host);
  $resultDomain = $Models_General->fetchRow($query, $params, TIMESMALL);

  $dirName = dirname($_SERVER['PHP_SELF']);
  if ($dirName !== '/') $dirName = $dirName.'/';

  $content = '';
  
  if (empty($resultDomain)) {
      throw new exception('no site found');
  }
  $page = !empty($_GET['page']) ? $_GET['page'] : 'home';
  $page = $page.'.php';

  
  if (file_exists($page)) {
    ob_start();
    include($page);
    $content_for_url = ob_get_clean();
  }
  
  ob_start();
  include('main.php');
  $content = ob_get_clean();

} catch (Exception $e) {
  $content = $e->getMessage();
}

echo $content;
?>