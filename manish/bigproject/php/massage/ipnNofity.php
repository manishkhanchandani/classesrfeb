<?php


try {
  include_once('../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('DEFAULT_PATH_TMP', '/massage/massageTmp');
  define('DEFAULT_PATH', '/massage/massage');
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

  function deleteRecord($id, $user_id) {
    
    //getting data
    $path = DEFAULT_PATH . '/posting/'.$id;
    $postingData = json_decode($firebase->get($path), 1);
    $path = DEFAULT_PATH . '/locations/'.$postingData['location_id'];
    $locationData = json_decode($firebase->get($path), 1);

    //setting data
    $path = DEFAULT_PATH . '/postingCancelled/'.$id;
    $firebase->set($path, $postingData);
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedCancelledProfiles/'.$id;
    $firebase->set($path, true);
    
    //deleting data
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedProfiles/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/posting/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/browsePostings/citywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['city']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/browsePostings/statewise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/browsePostings/countrywise/'.base64_encode($locationData['country']).'/'.'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/browsePostings/countywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['county']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->delete($path);
  }
 
  function save_data($id, $user_id, $data) {
    global $firebase;
    $custom = !empty($data['custom']) ? json_decode($data['custom'], 1) : '';
    $data['custom'] = $custom;
    $data['mdate'] = date('r');
    $data['mtime'] = time();
    $path = DEFAULT_PATH . '/payments/'.$user_id.'/'.$id;
    $firebase->push($path, $data);
  }

  function subscr_cancel($id, $user_id, $data, $coupon='') {
    global $firebase;
    $path = DEFAULT_PATH . '/posting/'.$id.'/cancel';
    $firebase->set($path, true);
  }

  function subscr_payment($id, $user_id, $data, $coupon='') {
    global $firebase;
  }

  function subscr_signup($id, $user_id, $data, $coupon='') {
    global $firebase;
    $path = DEFAULT_PATH . '/users/'.$user_id;
    $userData = json_decode($firebase->get($path), 1);
    $path = DEFAULT_PATH . '/postingPending/'.$id;
    $postingData = json_decode($firebase->get($path), 1);
    if (empty($postingData)) {
      throw new Exception('empty posting data');
    }
    $path = DEFAULT_PATH . '/locations/'.$postingData['location_id'];
    $locationData = json_decode($firebase->get($path), 1);
    //insertion
    $path = DEFAULT_PATH . '/posting/'.$id;
    $firebase->set($path, $postingData);
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedProfiles/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/citywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['city']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/statewise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/countrywise/'.base64_encode($locationData['country']).'/'.'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/countywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['county']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    
    //deleting
    $path = DEFAULT_PATH . '/postingPending/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedPendingProfiles/'.$id;
    $firebase->delete($path);
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
  $data = $_POST;
  error_log(date('[Y-m-d H:i e] '). "post: ".var_export($_POST, 1). PHP_EOL, 3, LOG_FILE);
  //custom logic comes here
  /*
  save_data($id, $user_id, $data);
  if (!empty($_POST['txn_type'])) {
    switch ($_POST['txn_type']) {
      case 'subscr_signup':
        subscr_signup($id, $user_id, $data, $coupon);
        break;
      case 'subscr_payment';
        subscr_payment($id, $user_id, $data, $coupon);
        break;
      case 'subscr_cancel';
        subscr_cancel($id, $user_id, $data, $coupon);
        break;
      default:
        break;
    }
  }*/

	
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