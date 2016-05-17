<?php

	function pr($value)
	{
		echo '<pre>';
		print_r($value);
		echo '</pre>';
		return true;
	}
	

if (!function_exists('curlget')) {
	function curlget($url, $post=0, $POSTFIELDS='') {
		$https = 0;
		if (substr($url, 0, 5) === 'https') {
			$https = 1;
		}

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);  
		if (!empty($post)) {
			curl_setopt($ch, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS,$POSTFIELDS);
		}

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
		curl_setopt($ch, CURLOPT_COOKIEJAR,COOKIE_FILE_PATH);
		if (!empty($https)) {
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		}

		$result = curl_exec($ch); 
		curl_close($ch);
		return $result;
	}
}


if (!function_exists('regexp')) {
	function regexp($input, $regexp, $casesensitive=false)
	{
		if ($casesensitive === true) {
			if (preg_match_all("/$regexp/sU", $input, $matches, PREG_SET_ORDER)) {
				return $matches;
			}
		} else {
			if (preg_match_all("/$regexp/siU", $input, $matches, PREG_SET_ORDER)) {
				return $matches;
			}
		}

		return false;
	}
}


function check($string) {
  if (substr($string, 0, 6) === '<html>') {
    return false;  
  }
  
  //check kentmind.htm
  $regexp = 'kentmind.htm';
  $matches = regexp($string, $regexp);
  if (!empty($matches)) {
    return false;  
  }
  
  
  return true;
}

function calculate($input)
{
  echo $input;
  echo '<br><br><br>';  
  echo '<hr>';
  $regexp = '<dir>(.*)<\/dir>';
  $matches = regexp($input, $regexp);
  foreach ($matches as $v) {
    foreach ($v as $v2) {
      echo htmlentities($v2);
      echo '<br><br><br>';  
    }
    echo '<hr>';
  }
}

/*
$page = 'http://homeoint.org/books/kentrep/kent0000.htm';
$page2 = 'http://homeoint.org/books/kentrep/kent0005.htm';
*/
$page = 'page1.html';
$res = file_get_contents($page);

$tmp = explode('<p>----------</p>', $res);
foreach ($tmp as $v) {
  $check = check($v);
  if (!$check) continue;
  
  calculate($v);

  echo htmlentities($v);
  echo '<br><hr><br>';  
}


?>