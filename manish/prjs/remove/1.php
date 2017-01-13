<?php
include('../functions.php');
$url = 'https://curofy.com/update_vote_of_given_user';
echo 'start';
for ($i = 0; $i < 1000; $i++) {
  echo " $i. <br>";
$res = curlget($url, 1, 'doc_id=755');
pr($res);
}