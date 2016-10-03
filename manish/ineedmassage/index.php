<?php
session_name('my_session');
session_start();

define('ROOTDIR', dirname(__FILE__));
define('SITEDIR', ROOTDIR);

define('ENV', 'dev');

$dir = dirname($_SERVER['PHP_SELF']);
if ($dir == '/') $dir = '';

$dir = $dir .'/';

$host = str_replace('www.', '', $_SERVER['HTTP_HOST']);
define('SITENAME', ucwords('MKGalaxy.com'));
define('ROOTDOMAIN', $host);
define('HTTPPATH', 'http://'.$host.$dir);
define('ROOTHTTPPATH', $dir);
define('APIDIR', $dir.'api');
define('APIHTTPPATH', 'http://'.$host.APIDIR);

define('ADMIN_EMAIL', 'mkgxy@mkgalaxy.com');
define('LOGINURL', 'users/login');
define('PLACESAPIKEY', 'AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw');
define('DEFAULT_LATITUDE', 37.3867);
define('DEFAULT_LONGITUDE', -121.897);
define('ENCRYPTKEY', 'JKjVXtFdY3NNT6Fp6U9uM3m5eeWbtqXWrR5qwWpyM9b8SFSdWVK2vruN');

//more to call class
include_once(SITEDIR.'/conn.php');
include_once(SITEDIR.'/config.php');

define('CLIENTID', '754890700194-4p5reil092esbpr9p3kk46pf31vkl3ub.apps.googleusercontent.com');
define('CLIENTSECRET', '8uvHeE3vQU1HQU0JoA1mRQTK');
define('DEVELOPERKEY', 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs');

ini_set("include_path", '/home/consultlawyers/php:/home/consultlawyers/public_html/libraries:' . ini_get("include_path") );


require_once('FirePHPCore/FirePHP.class.php');
$firephp = FirePHP::getInstance(true);
$firephp->setEnabled(true);
//my autoloader
function myautoload($class_name) {
    $classPath = SITEDIR.'/api/help/MkGalaxy/'.implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);

function log_error($message, $key='')
{
  global $firephp;
  $firephp->error($message, $key);
  $firephp->trace('Trace');
}

function log_log($message, $key='')
{
  if (ENV === 'prod') {
    return;
  }
  global $firephp;
  $firephp->log($message, $key);
}

function log_info($message, $key='')
{
  global $firephp;
  $firephp->info($message, $key);
}


function log_warn($message, $key='')
{
  global $firephp;
  $firephp->warn($message, $key);
}

include_once('functions.php');
include_once('general.php');

if (isset($_GET['clearSession'])) {
  $_SESSION['location'] = '';
}

if (empty($_SESSION['location']['ipDetails'])) {
  $ipDetails = curlget('http://api.mkgalaxy.com/ip.php?ip='.$_SERVER['REMOTE_ADDR']);
  $tmp = json_decode($ipDetails, true);
  $_SESSION['location']['ipDetails'] = !empty($tmp['data']['result']) ? $tmp['data']['result'] : '';
}

if (empty($_SESSION['location']['nearby'])) {
  $lat = !empty($_SESSION['location']['ipDetails']['lat']) ? $_SESSION['location']['ipDetails']['lat']: '';
  $lng = !empty($_SESSION['location']['ipDetails']['lng']) ? $_SESSION['location']['ipDetails']['lng']: '';
  if (!empty($lat) && !empty($lng)) {
    $location = curlget('http://api.mkgalaxy.com/api.php?action=nearby&lat='.$lat.'&lng='.$lng);
    $tmp = json_decode($location, true);
    $_SESSION['location']['nearby'] = !empty($tmp['data']) ? $tmp['data'] : '';
  }
}

log_log($_SESSION['location']);  

$modelGeneral = new Models_General($connMainAdodb);

log_log(__FILE__.' on line number '.__LINE__);

$defaultPage = 'location';
$page = $defaultPage;
$p = $defaultPage;

//override
if (!empty($_GET['q']['action'])) {
  $_GET['p'] = $_GET['q']['action'];
}
//end override

if (!empty($_GET['p'])) {
  $page = $_GET['p'];
  $p = $_GET['p'];
}
$page .= '.php';
$pageTitle = 'Some Page Title';

ob_start();
if (file_exists($page)) {
  include($page);
} else {
  include($defaultPage.'.php');
}

$contentForTemplate = ob_get_clean();

include('template.php');
?>