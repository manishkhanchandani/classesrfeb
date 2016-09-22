<?php

define('ADMIN_USER', 'google:112913147917981568678');

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


function postJson($uri, $postFields) {
		$https = 0;
		if (substr($uri, 0, 5) === 'https') {
			$https = 1;
		}

		$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri);  
    if (is_array($postFields)) {
        $postFields = json_encode($postFields);    
    }
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(                          
        'Content-Type: application/json',                                
        'Content-Length: ' . strlen($postFields))                    
    );
		curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
		curl_setopt($ch, CURLOPT_COOKIEJAR,COOKIE_FILE_PATH);
		if (!empty($https)) {
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		}                                                                                                                      $return = array();
    $return['uri'] = $uri;
    $return['request'] = $postFields;
		$return['result'] = curl_exec ( $ch );

		$return['http_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
		$return['errNo'] = curl_errno($ch);
		$return['errMsg'] = curl_error($ch);
		$return['returnheaders'] = curl_getinfo($ch);


		curl_close ( $ch );

		return $return;
}