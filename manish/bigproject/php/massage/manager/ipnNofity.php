<?php


try {
  include_once('../../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage/manager');
  define('DEFAULT_PATH_TMP', '/massage/manager/countyPending');
  define('DEFAULT_PATH_CANCELLED', '/massage/manager/countyCancelled');
  define('DEFAULT_PATH', '/massage/manager/county');
  define('ROOT_PATH', '/massage');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('../../functions.php');
  
  
  function save_data($uid, $uPath, $data) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    $data['mdate'] = date('r');
    $data['mtime'] = time();
    $path = MAIN_PATH . '/payments/all';
    $sid = $firebase->push($path, $data);
    $arr = json_decode($sid, 1);
    $pathID = $arr['name'];
    error_log(date('[Y-m-d H:i e] '). "payment data saved in: ".MAIN_PATH . '/payments/all/'.$pathID. PHP_EOL, 3, LOG_FILE);
    $path = MAIN_PATH . '/payments/users/'.$uid.'/'.$uPath.'/'.$pathID;
    $firebase->set($path, time());
    error_log(date('[Y-m-d H:i e] '). "payment user data saved in: ".MAIN_PATH . '/payments/users/'.$uid.'/'.$uPath.'/'.$pathID. PHP_EOL, 3, LOG_FILE);
  }
  
  function getDetails($uPath) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "uPath is: ".var_export($uPath, 1). PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_TMP . '/'.$uPath;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/'.$uPath;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      if (empty($record)) {
        $path = DEFAULT_PATH_CANCELLED . '/'.$uPath;
        $rec = $firebase->get($path);
        $record = json_decode($rec, 1);
        $record['sourcePath'] = 'countyCancelled';
      } else {
        $record['sourcePath'] = 'county';
      }
    } else {
      $record['sourcePath'] = 'countyPending';
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }


  function subscr_refunded($uid, $uPath, $data) {
    global $firebase;
    return;
    /*
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "subscr_refunded started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    
    $path = ROOT_PATH.'/amountReceived/txn_id/'.$data['parent_txn_id'];
    $txnIdPath = json_decode($firebase->get($path), 1);
    $path = ROOT_PATH . '/amountReceived/all/'.$txnIdPath;
    $txnIdRec = json_decode($firebase->get($path), 1);
    $txnIdRec['refunded'] = 1;
    $path = ROOT_PATH . '/amountReceived/all/'.$txnIdPath;
    $firebase->update($path, $txnIdRec);
   
    error_log(date('[Y-m-d H:i e] '). "subscr_refunded path: ".$uPath. PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_CANCELLED . '/' . $uPath;
    $firebase->set($path, $record);
    
    $path = DEFAULT_PATH . '/' . $uPath;
    $firebase->delete($path);
    error_log(date('[Y-m-d H:i e] '). "subscr_refunded ended". PHP_EOL, 3, LOG_FILE);*/
  }
  
  function subscr_cancel($uid, $uPath) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel path: ".$uPath. PHP_EOL, 3, LOG_FILE);
    $path = DEFAULT_PATH_CANCELLED . '/' . $uPath;
    $firebase->set($path, $record);
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_payment($uid, $uPath, $data) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $path = DEFAULT_PATH . '/' . $uPath;
    $firebase->update($path, $record);
    $exp = strtotime("+1 year", time());
    $path = DEFAULT_PATH . '/'. $uPath. '/expiration';
    $firebase->set($path, $exp);
    $path = DEFAULT_PATH . '/'. $uPath. '/expiration_format';
    $firebase->set($path, date('r', $exp));
    
    //error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount to admin". PHP_EOL, 3, LOG_FILE);
    $totalAmount = $data['mc_gross'] - $data['mc_fee'];
    addAmountInUserAccount($firebase, ADMIN_USER, $totalAmount, 100, $data['txn_id'], array('type' => addCounty, 'title' => 'For County: '.$record['county']['county'].', '.$record['county']['state'].', '.$record['county']['country'], 'path' => $record['path'], 'txn_id' => $data['txn_id']), '/massage');
    error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount to admin ends". PHP_EOL, 3, LOG_FILE);
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_signup($uid, $uPath) {
    global $firebase;
    error_log(PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "subscr_signup started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($uPath);
    if (empty($record)) {
      throw new Exception('empty posting data');
    }
    $path = DEFAULT_PATH_TMP . '/' . $uPath;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/' . $uPath;
    $firebase->update($path, $record);
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

error_log(date('[Y-m-d H:i e] '). PHP_EOL.PHP_EOL.PHP_EOL.PHP_EOL.PHP_EOL, 3, LOG_FILE);
error_log(date('[Y-m-d H:i e] '). 'STARTING NEW TRANSACTION'.PHP_EOL, 3, LOG_FILE);
    
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
  $uid = $customArr['uid'];
  $uPath = $customArr['path'];
  error_log(date('[Y-m-d H:i e] '). "uid: ". var_export($uid, 1). PHP_EOL, 3, LOG_FILE);
  error_log(date('[Y-m-d H:i e] '). "uPath: ". var_export($uPath, 1). PHP_EOL, 3, LOG_FILE);
  $data = $_POST;
  error_log(date('[Y-m-d H:i e] '). "post: ".var_export($_POST, 1). PHP_EOL, 3, LOG_FILE);
  //custom logic comes here
  //checking data and setting it in record
  save_data($uid, $uPath, $data);
  
  if (!empty($_POST['txn_type'])) {
    switch ($_POST['txn_type']) {
      case 'subscr_signup':
        subscr_signup($uid, $uPath);
        break;
      case 'subscr_payment';
        subscr_payment($uid, $uPath, $data);
        break;
      case 'subscr_cancel';
        subscr_cancel($uid, $uPath);
        break;
      default:
        break;
    }
  } else if (!empty($_POST['payment_status']) && $_POST['payment_status'] === 'Refunded') {
    subscr_refunded($uid, $uPath, $data);
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

error_log(date('[Y-m-d H:i e] '). 'ENDING TRANSACTION'.PHP_EOL, 3, LOG_FILE);
?>