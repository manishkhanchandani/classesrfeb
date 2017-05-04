<?php
use App\Lib1 as L;
use App\Lib2\MyClass as Obj;

require_once('1.php');
require_once('3.php');

header('Content-type: text/plain');
echo L\MYCONST . "\n";
echo L\MyFunction() . "\n";
echo L\MyClass::WhoAmI() . "\n";
echo Obj::WhoAmI() . "\n";
?>