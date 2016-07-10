<?php

//header and include files
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
define('TIMESMALL', 900);
define('TIMEBIG', (60*60*24*365));

define('ROOTDIR', dirname(__FILE__));

include(ROOTDIR.'/conn.php');
include(ROOTDIR.'/functions.php');
include(ROOTDIR.'/general.php');

$Models_General = new Models_General($connMainAdodb);

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   if (file_exists(ROOTDIR.'/'.$classPath . '.class.php')) {
    include_once ROOTDIR.'/'.$classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);
?>