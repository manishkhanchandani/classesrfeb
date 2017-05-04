<?php
namespace App\Lib1;

require_once('1.php');
require_once('3.php');

header('Content-type: text/plain');
echo "test: \n";
echo MYCONST."\n";
echo MyFunction() . "\n";
echo MyClass::WhoAmI() . "\n";
?>