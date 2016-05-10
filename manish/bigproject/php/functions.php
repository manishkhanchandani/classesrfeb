<?php

define('ADMIN_USER', 'google:112913147917981568678');

//types
define('addCounty', 'addCounty');
define('addMassageRecord', 'addMassageRecord');

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


function url_name_v2($name='')
{
	if (empty($name)) {
		return $name;
	}

	$patterns = array();
	$patterns[0] = "/\s+/";
	$patterns[1] = '/[^A-Za-z0-9]+/';
	$replacements = array();
	$replacements[0] = "-";
	$replacements[1] = '-';
	ksort($patterns);
	ksort($replacements);
	$output = preg_replace($patterns, $replacements, $name);
	$output = strtolower($output);
	return $output;
}//end list_name_url()



if (!function_exists('pr')) {
    function pr($d){
        echo '<pre>';
        print_r($d);
        echo '</pre>';
    }
}


function guid()
{
    mt_srand((double) microtime() * 10000);
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $guid = substr($charid, 0, 8) . '-' .
            substr($charid, 8, 4) . '-' .
            substr($charid, 12, 4) . '-' .
            substr($charid, 16, 4) . '-' .
            substr($charid, 20, 12);
   return $guid;
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


 function addAmountInUserAccount($firebase, $uid, $totalAmount, $percentage, $txn_id, $desc=array(), $basePath='/massage')
 {
   $netAmount = ($percentage / 100) * $totalAmount;
   $desc['amount'] = $netAmount;
   $desc['mdate'] = date('r');
   $desc['mtime'] = time() * 1000;
   $desc['uid'] = $uid;
   $desc['totalAmount'] = $totalAmount;
   $desc['percentage'] = $percentage;
   //$path = $basePath . '/amountReceived/all';
   //$sid = $firebase->push($path, $desc);
   //$arr = json_decode($sid, 1);
   //$pathID = $arr['name'];
   $path = $basePath . '/amountReceived/users/'.$uid;
   $firebase->push($path, $desc);
   
   $path = $basePath . '/amountReceived/totalAmount/users/'.$uid;
   $amt = $firebase->get($path);
   if (empty($amt)) {
    $amt = 0.00; 
   }
   $amt = $amt + $netAmount;
   $firebase->set($path, $amt);
   //$path = $basePath . '/amountReceived/txn_id/'.$txn_id.'/'.$pathID;
   //$firebase->set($path, true);
   return true;
 }
 
 /*usage */
function testAmount() {
  global $firebase;
  addAmountInUserAccount($firebase, 'admin', 10, 20, 1);
  addAmountInUserAccount($firebase, 'user1', 10, 40, 1);
  addAmountInUserAccount($firebase, 'ref1', 10, 10, 1);
  addAmountInUserAccount($firebase, 'ref2', 10, 5, 1);
  addAmountInUserAccount($firebase, 'ref3', 10, 3, 1);
  addAmountInUserAccount($firebase, 'ref4', 10, 2, 1);
  addAmountInUserAccount($firebase, 'ref5', 10, 5, 1);
  addAmountInUserAccount($firebase, 'ref6', 10, 5, 1);
  addAmountInUserAccount($firebase, 'ref7', 10, 5, 1);
  addAmountInUserAccount($firebase, 'ref8', 10, 5, 1);
}

function recursive_counter($counter)
{
  if ($counter % 2 === 0) {
    $parent1 = $counter / 2;
    if ($parent1 < 1) $parent1 = 0;
  } else {
    $parent1 = ($counter - 1) / 2;
    if ($parent1 < 1) $parent1 = 0;
  }
  
  return $parent1;
}


function calc_recursive_counter($counter)
{
  $arr = array();
  $parent1 = recursive_counter($counter);
  array_push($arr, $parent1);
  $parent2 = recursive_counter($parent1);
  array_push($arr, $parent2);
  $parent3 = recursive_counter($parent2);
  array_push($arr, $parent3);
  $parent4 = recursive_counter($parent3);
  array_push($arr, $parent4);
  return $arr;
}