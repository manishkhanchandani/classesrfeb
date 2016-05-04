<?php


try {
  define("LOG_FILE", "./ipn_".date('Y-m-d').".log");
  include_once('firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects/homeopathyClassical');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('CASE_PATH', '/cases');
  define('USER_PATH', '/users');
  define('FOLLOWUP_PATH', '/followup');
  define('PAYMENT_PATH', '/payments');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('functions.php');

  define("DEBUG", 1);
  define("USE_SANDBOX", 0);
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
  }//end if

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
  
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));
  $res = curl_exec($ch);
  if (curl_errno($ch) != 0) {
    if(DEBUG == true) {	
      error_log(date('[Y-m-d H:i e] '). "Can't connect to PayPal to validate IPN message: " . curl_error($ch) . PHP_EOL, 3, LOG_FILE);
    }
    curl_close($ch);
    exit;
  } else {
      if(DEBUG == true) {
        error_log(date('[Y-m-d H:i e] '). "HTTP request of validation request:". curl_getinfo($ch, CURLINFO_HEADER_OUT) ." for IPN payload: $req" . PHP_EOL, 3, LOG_FILE);
        error_log(date('[Y-m-d H:i e] '). "HTTP response of validation request: $res" . PHP_EOL, 3, LOG_FILE);
      }
      curl_close($ch);
  }
  $tokens = explode("\r\n\r\n", trim($res));
  $res = trim(end($tokens));
  if (strcmp ($res, "VERIFIED") == 0) {
    $custom = stripslashes(urldecode($_POST['custom']));
    error_log(date('[Y-m-d H:i e] '). "custom: $custom ". PHP_EOL, 3, LOG_FILE);
    $customArr = json_decode($custom, 1);
    error_log(date('[Y-m-d H:i e] '). "customArr: ". var_export($customArr, 1). PHP_EOL, 3, LOG_FILE);
    $id = !empty($customArr['id']) ? $customArr['id'] : '';
    $uid = !empty($customArr['uid']) ? $customArr['uid'] : '';
    $data = $_POST;
    error_log(date('[Y-m-d H:i e] '). "post: ".var_export($_POST, 1). PHP_EOL, 3, LOG_FILE);
    //custom logic comes here
    //checking data and setting it in record
    save_data($firebase, $id, $user_id, $data, PAYMENT_PATH);
    
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