<?php
header('Content-type: text/plain');
require_once('1.php');
echo \App\Lib1\MYCONST."\n";
echo \App\Lib1\MyFunction() . "\n";
$c = new \App\Lib1\MyClass();
print_r($c);
echo $c->WhoAmI() . "\n";
?>