<?php

function pr($value)
	{
		echo '<pre>';
		print_r($value);
		echo '</pre>';
		return true;
	}
	


if (empty($_GET['file'])) {
  echo 'empty file';
  exit;
}
$file = $_GET['file'];
$content = json_decode(file_get_contents($file),1);
$tmp = explode('"Remedy"', $content['content']);
foreach($tmp as $k => $v) {
  echo '<h1>'.$k.'</h1>';
  echo htmlentities($v);
  echo '<hr>';
}
?>