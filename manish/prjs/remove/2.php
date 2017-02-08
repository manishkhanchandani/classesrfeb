<?php
include('../functions.php');
$url = 'http://www.aapkacolors.com/us/biggboss/submit-voting';
echo 'start';
for ($i = 0; $i < 1; $i++) {
  echo " $i. <br>";
$res = curlget($url, 1, 'contestantId=915&validate=0&contestantName=Rohan+Mehra');
pr($res);
}