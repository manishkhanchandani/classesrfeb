<?php
$chapters = array(1 => array('chapter' => 'mind'), array('chapter' => 'vertigo'), array('chapter' => 'head'), array('chapter' => 'eye'), array('chapter' => 'vision'), array('chapter' => 'ear'), array('chapter' => 'hearing'), array('chapter' => 'nose'), array('chapter' => 'face'), array('chapter' => 'mouth'), array('chapter' => 'teeth'), array('chapter' => 'throat'), array('chapter' => 'external throat'), array('chapter' => 'stomach'), array('chapter' => 'abdomen'), array('chapter' => 'rectum'), array('chapter' => 'stool'), array('chapter' => 'urinary organs'), array('chapter' => 'bladder'), array('chapter' => 'kidneys'), array('chapter' => 'prostate gland'), array('chapter' => 'urethra'), array('chapter' => 'urine'), array('chapter' => 'genitalia male'), array('chapter' => 'genitalia female'), array('chapter' => 'laryx and trachea'), array('chapter' => 'respiration'), array('chapter' => 'cough'), array('chapter' => 'expectoration'), array('chapter' => 'chest'), array('chapter' => 'back'), array('chapter' => 'extremities'), array('chapter' => 'sleep'), array('chapter' => 'chill'), array('chapter' => 'fever'), array('chapter' => 'perspiration'), array('chapter' => 'skin'), array('chapter' => 'generalities'));

foreach ($chapters as $k => $v) {
  $chapters[$k]['id'] = $k;
  $chapters[$k]['name'] = base64_encode($v['chapter']);
}

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

function getQueryString()
  {
    $queryString_rsView = "";
    if (!empty($_SERVER['QUERY_STRING'])) {
      $params = explode("&", $_SERVER['QUERY_STRING']);
      $newParams = array();
      foreach ($params as $param) {
        if (stristr($param, "pageNum_rsView") == false && 
            stristr($param, "totalRows_rsView") == false) {
          array_push($newParams, $param);
        }
      }
      if (count($newParams) != 0) {
        $queryString_rsView = "&" . htmlentities(implode("&", $newParams));
      }
    }
    $queryString_rsView = sprintf("&totalRows_rsView=%d%s", $totalRows_rsView, $queryString_rsView); 
    return $queryString_rsView;
  }
  

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}
?>