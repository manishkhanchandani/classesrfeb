<?php


try {
  include_once('../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage');
  define('DEFAULT_PATH_TMP', '/manager/countyPending');
  define('DEFAULT_PATH_CANCELLED', '/manager/countyCancelled');
  define('DEFAULT_PATH', '/manager/county');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  
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
  
  if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
        }
    }

  function save_data($id, $user_id, $data) {
    global $firebase;
    $data['mdate'] = date('r');
    $data['mtime'] = time();
    $path = MAIN_PATH . '/payments/all';
    $sid = $firebase->push($path, $data);
    $arr = json_decode($sid, 1);
    $pathID = $arr['name'];
    $path = MAIN_PATH . '/payments/users/'.$user_id.'/'.$id.'/'.$pathID;
    $firebase->set($path, time());
  }
  
  function getDetails($id) {
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/records/'.$id;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      $record['path'] = 'massage';
    } else {
      $record['path'] = 'massageTmp';
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }

  function subscr_cancel($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel started". PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      error_log(date('[Y-m-d H:i e] '). "subscr_cancel path1: ".$path. PHP_EOL, 3, LOG_FILE);
      $path = DEFAULT_PATH_CANCELLED . '/' . $v;
      $firebase->set($path, $r);
      error_log(date('[Y-m-d H:i e] '). "subscr_cancel path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_payment($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $exp = strtotime("+1 month", time());
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_signup($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_signup started". PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      $firebase->delete($path);
      error_log(date('[Y-m-d H:i e] '). "subscr_signup path1: ".$path. PHP_EOL, 3, LOG_FILE);
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->set($path, $r);
      error_log(date('[Y-m-d H:i e] '). "subscr_signup path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }
    $exp = strtotime("+3 months", time());
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/records/'. $id. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    error_log(date('[Y-m-d H:i e] '). "subscr_signup ended". PHP_EOL, 3, LOG_FILE);
    //custom logic ends here
  }

// CONFIG: Enable debug mode. This means we'll log requests into 'ipn.log' in the same directory.
// Especially useful if you encounter network errors or other intermittent problems with IPN (validation).
// Set this to 0 once you go live or don't require logging.
define("DEBUG", 1);
// Set to 0 once you're ready to go live
define("USE_SANDBOX", 0);
define("LOG_FILE", "./ipn.log");
// Read POST data
// reading posted data directly from $_POST causes serialization
// issues with array data in POST. Reading raw POST data from input stream instead.
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);

$myPost = array();
foreach ($raw_post_array as $keyval) {
	$keyval = explode ('=', $keyval);
	if (count($keyval) == 2)
		$myPost[$keyval[0]] = urldecode($keyval[1]);
}
// read the post from PayPal system and add 'cmd'
$req = 'cmd=_notify-validate';
if(function_exists('get_magic_quotes_gpc')) {
	$get_magic_quotes_exists = true;
}

foreach ($myPost as $key => $value) {
	if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
		$value = urlencode(stripslashes($value));
	} else {
		$value = urlencode($value);
	}
	$req .= "&$key=$value";
}

// Post IPN data back to PayPal to validate the IPN data is genuine
// Without this step anyone can fake IPN data
if(USE_SANDBOX == true) {
	$paypal_url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
} else {
	$paypal_url = "https://www.paypal.com/cgi-bin/webscr";
}
$ch = curl_init($paypal_url);
if ($ch == FALSE) {
	return FALSE;
}
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
if(DEBUG == true) {
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
}
// CONFIG: Optional proxy configuration
//curl_setopt($ch, CURLOPT_PROXY, $proxy);
//curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1);
// Set TCP timeout to 30 seconds
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));
// CONFIG: Please download 'cacert.pem' from "http://curl.haxx.se/docs/caextract.html" and set the directory path
// of the certificate as shown below. Ensure the file is readable by the webserver.
// This is mandatory for some environments.
//$cert = __DIR__ . "./cacert.pem";
//curl_setopt($ch, CURLOPT_CAINFO, $cert);
$res = curl_exec($ch);
if (curl_errno($ch) != 0) // cURL error
	{
	if(DEBUG == true) {	
		error_log(date('[Y-m-d H:i e] '). "Can't connect to PayPal to validate IPN message: " . curl_error($ch) . PHP_EOL, 3, LOG_FILE);
	}
	curl_close($ch);
	exit;
} else {
		// Log the entire HTTP response if debug is switched on.
		if(DEBUG == true) {
			error_log(date('[Y-m-d H:i e] '). "HTTP request of validation request:". curl_getinfo($ch, CURLINFO_HEADER_OUT) ." for IPN payload: $req" . PHP_EOL, 3, LOG_FILE);
			error_log(date('[Y-m-d H:i e] '). "HTTP response of validation request: $res" . PHP_EOL, 3, LOG_FILE);
		}
		curl_close($ch);
}
// Inspect IPN validation result and act accordingly
// Split response headers and payload, a better way for strcmp
$tokens = explode("\r\n\r\n", trim($res));
$res = trim(end($tokens));
if (strcmp ($res, "VERIFIED") == 0) {
	// check whether the payment_status is Completed
  /*if ($_POST['payment_status'] !== 'Completed') {
    throw new Exception('error in payment status. '.var_export($_POST, 1));
  }*/

	// check that txn_id has not been previously processed
	// check that receiver_email is your PayPal email
	// check that payment_amount/payment_currency are correct
	// process payment and mark item as paid.
	// assign posted variables to local variables
	//$item_name = $_POST['item_name'];
	//$item_number = $_POST['item_number'];
	//$payment_status = $_POST['payment_status'];
	//$payment_amount = $_POST['mc_gross'];
	//$payment_currency = $_POST['mc_currency'];
	//$txn_id = $_POST['txn_id'];
	//$receiver_email = $_POST['receiver_email'];
	//$payer_email = $_POST['payer_email'];
  //variable parsing comes here
  $custom = stripslashes(urldecode($_POST['custom']));
  error_log(date('[Y-m-d H:i e] '). "custom: $custom ". PHP_EOL, 3, LOG_FILE);
  $customArr = json_decode($custom, 1);
  error_log(date('[Y-m-d H:i e] '). "customArr: ". var_export($customArr, 1). PHP_EOL, 3, LOG_FILE);
  $id = !empty($customArr['id']) ? $customArr['id'] : '';
  $user_id = !empty($customArr['uid']) ? $customArr['uid'] : '';
  $data = $_POST;
  error_log(date('[Y-m-d H:i e] '). "post: ".var_export($_POST, 1). PHP_EOL, 3, LOG_FILE);
  //custom logic comes here
  //checking data and setting it in record
  save_data($id, $user_id, $data);
  
  if (!empty($_POST['txn_type'])) {
    switch ($_POST['txn_type']) {
      case 'subscr_signup':
        subscr_signup($id, $user_id, $data);
        break;
      case 'subscr_payment';
        subscr_payment($id, $user_id, $data);
        break;
      case 'subscr_cancel';
        subscr_cancel($id, $user_id, $data);
        break;
      default:
        break;
    }
  }

	
	if(DEBUG == true) {
		error_log(date('[Y-m-d H:i e] '). "Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
	}
} else if (strcmp ($res, "INVALID") == 0) {
	// log for manual investigation
	// Add business logic here which deals with invalid IPN messages
	if(DEBUG == true) {
		error_log(date('[Y-m-d H:i e] '). "Invalid IPN: $req" . PHP_EOL, 3, LOG_FILE);
	}
}

} catch (Exception $e) {
  error_log(date('[Y-m-d H:i e] '). "Error in Catch: " . $e->getMessage() . PHP_EOL, 3, LOG_FILE);
}
?>