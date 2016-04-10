<?php
$requestUri = $_SERVER['REQUEST_URI'];
define('DIRNAME', dirname(__FILE__).'/');
include(DIRNAME.'functions.php');
include(DIRNAME.'firebase/firebaseLib.php');

define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');

$host = $_SERVER['HTTP_HOST'];
$host = str_replace('www.', '', $host);

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   if (file_exists(DIRNAME.$classPath.'.class.php')) {
    include_once DIRNAME.$classPath.'.class.php';
   }
}
spl_autoload_register('myautoload', true);

$returnData = array();
$title = '';
$description = '';
$img = '';
$content = '';
if ($requestUri === '/' || empty($requestUri)) {
    $cmd = new classes_home(array('host' => $host, 'dirname' => DIRNAME));
    $pageParams = $cmd->getParams();
    if (!empty($pageParams['meta']['title'])) {
      $title = $pageParams['meta']['title']; 
    }
    
    if (!empty($pageParams['meta']['description'])) {
      $description = $pageParams['meta']['description']; 
    }
    
    if (!empty($pageParams['meta']['img'])) {
      $img = $pageParams['meta']['img']; 
    }
} else if (!empty($requestUri)) {
  $arr = explode('/', $requestUri);
  $cmd = new classes_routing(array('host' => $host, 'dirname' => DIRNAME, 'arr' => $arr));
  if (!empty($cmd->returnData)) {
    $returnData = $cmd->returnData;
    $content = !empty($returnData['result']) ? $returnData['result'] : '';
    $img = !empty($returnData['mainImage']) ? $returnData['mainImage'] : '';
    $description = !empty($returnData['description']) ? $returnData['description'] : '';
  }
}




?>