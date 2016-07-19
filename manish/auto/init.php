<?php

//header and include files
define('TIMESMALL', 900);
define('TIMEBIG', (60*60*24*365));
ini_set("include_path", '/home/consultlawyers/php:' . ini_get("include_path") );

define('ROOTDIR', dirname(__FILE__));

include(ROOTDIR.'/conn.php');
include(ROOTDIR.'/functions.php');
include(ROOTDIR.'/general.php');

$Models_General = new Models_General($connMainAdodb);

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   echo ROOTDIR.'/'.$classPath . '.class.php';
   exit;
   if (file_exists(ROOTDIR.'/'.$classPath . '.class.php')) {
    include_once ROOTDIR.'/'.$classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);
?>