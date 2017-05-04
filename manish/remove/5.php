<?php
use App\Lib2;

require_once('1.php');
require_once('3.php');

header('Content-type: text/plain');
echo "test2: \n";
echo Lib2\MYCONST . "\n";
echo Lib2\MyFunction() . "\n";
echo Lib2\MyClass::WhoAmI() . "\n";
?>