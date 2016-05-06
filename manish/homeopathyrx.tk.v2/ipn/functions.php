<?php

define('ADMIN_USER', 'google:112913147917981568678');

//types
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

function save_data($firebase, $id, $uid, $data) {
    $data['mdate'] = date('r');
    $data['mtime'] = time();
    $path = PAYMENT_PATH . '/all';
    $sid = $firebase->push($path, $data);
    $arr = json_decode($sid, 1);
    $pathID = $arr['name'];
    $path = PAYMENT_PATH.'/users/'.$uid.'/'.$id.'/'.$pathID;
    $firebase->set($path, time());
    return true;
}

function processData($firebase, $id, $user_id, $data) {
    error_log(date('[Y-m-d H:i e] '). "Process data for ".$id, " user: ".$user_id. PHP_EOL, 3, LOG_FILE);
    //update fees
    $path = CASE_PATH . '/' .$user_id.'/'.$id;
    error_log(date('[Y-m-d H:i e] '). "path: ". var_export($path, 1). PHP_EOL, 3, LOG_FILE);
    $r = array();
    $r['amount']['gross'] = $data['mc_gross'];
    $r['amount']['fees'] = $data['mc_fee'];
    $r['amount']['net'] = $data['mc_gross'] - $data['mc_fee'];
    //get email
    $record = json_decode($firebase->get($path), 1);
    error_log(date('[Y-m-d H:i e] '). "record: ". var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    
    $remedyPath = RX_PATH.'/did_'.$record['details']['disease_id'].'/rid_'.$record['details']['id'];
    error_log(date('[Y-m-d H:i e] '). "remedyPath: ". var_export($remedyPath, 1). PHP_EOL, 3, LOG_FILE);
    $remedyRecord = json_decode($firebase->get($remedyPath), 1);
    error_log(date('[Y-m-d H:i e] '). "remedyRecord: ". var_export($remedyRecord, 1). PHP_EOL, 3, LOG_FILE);
    
    $remedy = "\n\n";
    if (!empty($remedyRecord)) {
      
      if (count($remedyRecord) == 1) {
        $remedy .= "Take ".$remedyRecord[0]." (One dose of 5 pills) and then no medicine for a month.\n";  
      } else if (count($remedyRecord) == 2) {
        $remedy .= "Take ".$remedyRecord[0]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[1]." (One dose of 5 pills) and then no medicine for a month.";  
      } else if (count($remedyRecord) == 3) {
        $remedy .= "Take ".$remedyRecord[0]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[1]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[2]." (One dose of 5 pills) and then no medicine for a month.";  
      } else if (count($remedyRecord) == 4) {
        $remedy .= "Take ".$remedyRecord[0]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[1]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[2]." (One dose of 5 pills) and then no medicine for a month.\nFollowed by ".$remedyRecord[3]." (One dose of 5 pills) and then no medicine for a month.";  
      }
      
      
    }//end if
    
    $remedy .= "\n\nIn chronic cases, You have to take this remedy till you get change in your problem. If your problem decreases or increases, then it means medicine has started working and so don't take any further doses for 3 more months. After 3 months come back on the website to create a follow-up case. In acute case, one dose will cure your problem.";
    $prescription = "Dear ".$record['name'].",
Your prescription for this month is: ".$remedy."
    ";
    error_log(date('[Y-m-d H:i e] '). "prescription: ". $prescription. PHP_EOL, 3, LOG_FILE);
    mail($record['email'], 'Homeopathic Prescription For '.$record['name'], $prescription, 'From: HomeopathyRx<remedy@homeopathyrx.tk>');
    
    $r['remedies'] = $remedyRecord;
    $r['prescription'] = $prescription;
    error_log(date('[Y-m-d H:i e] '). "r: ". var_export($r, 1). PHP_EOL, 3, LOG_FILE);
    $firebase->update($path, $r);
}