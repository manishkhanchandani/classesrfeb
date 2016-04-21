<?php


try {
  include_once('../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/massage');
  define('DEFAULT_PATH_TMP', '/massage/massageTmp');
  define('DEFAULT_PATH_CANCELLED', '/massage/massageCancelled');
  define('DEFAULT_PATH', '/massage/massage');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('../functions.php');
  include_once('config.php');

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
    error_log(date('[Y-m-d H:i e] '). "getDetails started". PHP_EOL, 3, LOG_FILE);
    global $firebase;
    $path = DEFAULT_PATH_TMP . '/records/'.$id;
    $rec = $firebase->get($path);
    $record = json_decode($rec, 1);
    if (empty($record)) {
      $path = DEFAULT_PATH . '/records/'.$id;
      $rec = $firebase->get($path);
      $record = json_decode($rec, 1);
      $record['sourcePath'] = 'massage';
    } else {
      $record['sourcePath'] = 'massageTmp';
    }
    error_log(date('[Y-m-d H:i e] '). "record: ".var_export($record, 1). PHP_EOL, 3, LOG_FILE);
    return $record;  
  }

  function subscr_cancel($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_cancel started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($id);
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
    global $firebase, $smountSharingConfig;
    error_log(date('[Y-m-d H:i e] '). "subscr_payment started". PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "id: ".$id. PHP_EOL, 3, LOG_FILE);
    error_log(date('[Y-m-d H:i e] '). "user_id: ".$user_id. PHP_EOL, 3, LOG_FILE);
    $record = getDetails($id);
    if (empty($record)) {
      error_log(date('[Y-m-d H:i e] '). "empty posting data". PHP_EOL, 3, LOG_FILE);
      throw new Exception('empty posting data');
    }
    if ($record['details']['postedBy'] === '') {
      copyRecordByUserId($firebase, $id, $user_id, DEFAULT_PATH_TMP, DEFAULT_PATH); 
      $record = getDetails($id);
      if (empty($record)) {
        error_log(date('[Y-m-d H:i e] '). "empty posting data2". PHP_EOL, 3, LOG_FILE);
        throw new Exception('empty posting data2');
      }
    }
    $exp = strtotime("+1 month", time());
    $record['expiration'] = $exp * 1000;
    $record['expiration_format'] = date('r', $exp);
    $record['uid'] = $user_id;
    
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount". PHP_EOL, 3, LOG_FILE);
    $totalAmount = $data['mc_gross'] - $data['mc_fee'];

    //total amount
    $path = MAIN_PATH . '/amountReceived/totalAmount/total';
     $amt = $firebase->get($path);
     if (empty($amt)) {
      $amt = 0.00; 
     }
     $amt = $amt + $totalAmount;
    $firebase->set($path, $amt);
    $record['totalAmount'] = $totalAmount;
    //total amount ends
    
    //get counter
    $path = MAIN_PATH . '/usersChain/counter';
    $counter = $firebase->get($path);
    if (empty($counter)) {
      $counter = 1;
    } else {
      $counter = (int) $counter + 1;
    }
    
    $arrChain = calc_recursive_counter($counter);
    
    //end counter
    $arrRef = array();
    $path = MAIN_PATH . '/manager/county/'.base64_encode($record['location']['country']).'/'.base64_encode($record['location']['state']).'/'.base64_encode($record['location']['county']);
    $countyRecord = json_decode($firebase->get($path), 1);
    
    $arrRef['county'] = ADMIN_USER;
    if (!empty($countyRecord)) {
      $arrRef['county'] = $countyRecord['uid'];
    }
    
    $path = MAIN_PATH . '/users/'.$user_id;
    $usersRecord = json_decode($firebase->get($path), 1);
    $arrRef['ref1'] = !empty($usersRecord['chain'][0]) ? $usersRecord['chain'][0] : ADMIN_USER;
    $arrRef['ref2'] = !empty($usersRecord['chain'][1]) ? $usersRecord['chain'][1] : ADMIN_USER;
    $arrRef['ref3'] = !empty($usersRecord['chain'][2]) ? $usersRecord['chain'][2] : ADMIN_USER;
    $arrRef['ref4'] = !empty($usersRecord['chain'][3]) ? $usersRecord['chain'][3] : ADMIN_USER;
    
    $arrRef['ref5'] = !empty($arrChain[0]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[0]), 1) : ADMIN_USER;
    $arrRef['ref6'] = !empty($arrChain[1]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[1]), 1) : ADMIN_USER;
    $arrRef['ref7'] = !empty($arrChain[2]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[2]), 1) : ADMIN_USER;
    $arrRef['ref8'] = !empty($arrChain[3]) ? json_decode($firebase->get(MAIN_PATH . '/usersChain/list/'.$arrChain[3]), 1) : ADMIN_USER;
    
    $record['chain'] = $arrRef;
    
    addAmountInUserAccount($firebase, ADMIN_USER, $totalAmount, $smountSharingConfig['admin'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['county'], $totalAmount, $smountSharingConfig['owner'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref1'], $totalAmount, $smountSharingConfig['ref1_level1'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref2'], $totalAmount, $smountSharingConfig['ref1_level2'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref3'], $totalAmount, $smountSharingConfig['ref1_level3'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref4'], $totalAmount, $smountSharingConfig['ref1_level4'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref5'], $totalAmount, $smountSharingConfig['ref2_level1'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref6'], $totalAmount, $smountSharingConfig['ref2_level2'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref7'], $totalAmount, $smountSharingConfig['ref2_level3'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    addAmountInUserAccount($firebase, $arrRef['ref8'], $totalAmount, $smountSharingConfig['ref2_level4'], $data['txn_id'], array('type' => addMassageRecord, 'record' => $id, 'txn_id' => $data['txn_id']), '/massage');
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment adding amount ends". PHP_EOL, 3, LOG_FILE);
    
    $path = DEFAULT_PATH . '/records/'. $id;
    $firebase->update($path, $record);
    
    foreach ($record['paths'] as $v) {
      $path = DEFAULT_PATH_TMP. '/' . $v;
      $r = json_decode($firebase->get($path), 1);
      if (empty($r)) {
        continue;  
      }
      //$firebase->delete($path);
      error_log(date('[Y-m-d H:i e] '). "subscr_payment path1: ".$path. PHP_EOL, 3, LOG_FILE);
      $path = DEFAULT_PATH . '/' . $v;
      $firebase->update($path, $r);
      error_log(date('[Y-m-d H:i e] '). "subscr_payment path2: ".$path. PHP_EOL, 3, LOG_FILE);
    }
    
    $path = MAIN_PATH . '/usersChain/counter';
    $firebase->set($path, $counter);
    
    $path = MAIN_PATH . '/usersChain/list/'.$counter;
    $firebase->set($path, $user_id);
    
    error_log(date('[Y-m-d H:i e] '). "subscr_payment ended". PHP_EOL, 3, LOG_FILE);
  }

  function subscr_signup($id, $user_id, $data) {
    global $firebase;
    error_log(date('[Y-m-d H:i e] '). "subscr_signup started". PHP_EOL, 3, LOG_FILE);
    $record = getDetails($id);
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
    $path = DEFAULT_PATH . '/records/'. $id. '/uid';
    $firebase->set($path, $user_id);
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