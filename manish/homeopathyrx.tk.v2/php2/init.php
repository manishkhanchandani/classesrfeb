<?php

//header and include files
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
define('TIMESMALL', 900);
define('TIME1hr', (60*60));
define('TIME4hr', (60*60*4));
define('TIME8hr', (60*60*8));
define('TIME16hr', (60*60*16));
define('TIME24hr', (60*60*24));
define('TIMEWEEK', (60*60*24*7));
define('TIMEMONTH', (60*60*24*30));
define('TIMEBIG', (60*60*24*365));
define('TIMEBIGTEN', (60*60*24*365*10));

define('ROOTDIR', dirname(__FILE__));

include(ROOTDIR.'/conn.php');
include(ROOTDIR.'/functions.php');
include(ROOTDIR.'/general.php');
include_once(ROOTDIR.'/connClasses.php');

$Models_General = new Models_General($connMainAdodb);
$modelClasses = new Models_General($connClassesMainAdodb);

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   if (file_exists(ROOTDIR.'/'.$classPath . '.class.php')) {
    include_once ROOTDIR.'/'.$classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);
?>