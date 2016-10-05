<?php

log_log(__FILE__.' on line number '.__LINE__);
//users/login?logout=1
//users/login

require_once ROOTDIR.'/googleauth/src/Google_Client.php'; // include the required calss files for google login
require_once ROOTDIR.'/googleauth/src/contrib/Google_PlusService.php';
require_once ROOTDIR.'/googleauth/src/contrib/Google_Oauth2Service.php';
$pageTitle = 'Login To Site';
try {
  $client = new Google_Client();
  $client->setApplicationName("Google Authentication"); // Set your applicatio name
  $client->setScopes(array('https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.profile')); // set scope during user login
  $client->setClientId(CLIENTID); // paste the client id which you get from google API Console
  $client->setClientSecret(CLIENTSECRET); // set the client secret
  $client->setDeveloperKey(DEVELOPERKEY); // Developer key
  $url = HTTPPATH . LOGINURL;
  $client->setRedirectUri($url); // paste the redirect URI where you given in APi Console. You will get the Access Token here during login success
  $plus 		= new Google_PlusService($client);
  $oauth2 	= new Google_Oauth2Service($client); // Call the OAuth2 class for get email address
  if(isset($_GET['logout'])) {
    unset($_SESSION['access_token']);
    unset($_SESSION['gplusuer']);
    unset($_SESSION['user']);
    setcookie('access_token', null, time() - 300);
    unset($_COOKIE['access_token']);
    header('Location: '.HTTPPATH . LOGINURL);
    exit;
  }
  if(isset($_GET['code'])) {
    $client->authenticate(); // Authenticate
    $_SESSION['access_token'] = $client->getAccessToken(); // get the access token here
    setcookie('access_token', $_SESSION['access_token'], time() + (60*60*24*360*10));
    $_COOKIE['access_token'] = $_SESSION['access_token'];
    header('Location: '.HTTPPATH . LOGINURL);
    exit;
  }
  
  if (!empty($_COOKIE['access_token'])) {
    $_SESSION['access_token'] = stripslashes($_COOKIE['access_token']);
  }
  
  if(isset($_SESSION['access_token'])) {
    $client->setAccessToken($_SESSION['access_token']); 
  }
  
  $title = 'Title';
  if ($client->getAccessToken()) {
    $pageTitle = 'Login Successfull';
    $user 		= $oauth2->userinfo->get();
    //select from table if user exists
    $query = "select * from users where uid = ?";
    $existed = $modelGeneral->fetchRow($query, array($user['id']), 0);

    $data = array();
    $data['uid'] = $user['id'];
    $data['email'] = $user['email'];
    $data['name'] = $user['name'];
    $data['first_name'] = $user['given_name'];
    $data['last_name'] = $user['family_name'];
    $data['link'] = $user['link'];
    $data['image'] = $user['picture'];  
    $data['gender'] = !empty($user['gender']) ? $user['gender'] : '';
    if (empty($existed)) {
      //insert record
      $modelGeneral->addDetails('users', $data);
      unset($data);
    } else {
      $where = sprintf('id = %s', $modelGeneral->qstr($user['id']));
      $modelGeneral->updateDetails('users', $data, $where);
    }
    $_SESSION['user'] = $user;
    
    if (!empty($existed['is_admin'])) {
      $_SESSION['user']['is_admin'] = $existed['is_admin'];
    }

    // The access token may have been updated lazily.
    $_SESSION['access_token'] 		= $client->getAccessToken();
    $email 							= filter_var($user['email'], FILTER_SANITIZE_EMAIL); // get the USER EMAIL ADDRESS using OAuth2
    if (isset($_SESSION['redirectUrl'])) {
      $url = $_SESSION['redirectUrl'];
      unset($_SESSION['redirectUrl']);
      header("Location: ".$url);
      exit;
    }
  } else {
    $authUrl = $client->createAuthUrl();
  }
  
  if(isset($me)){ 
    $_SESSION['gplusuer'] = $me; // start the session
  }
} catch (Exception $e) {
  $error = $e->getMessage();
}
?>
<h3><?php echo $pageTitle; ?></h3>
<?php 
if (!empty($error)) {
  echo '<div class="error">'.$error.'</div>';
} else if(isset($authUrl)) {
	echo "<a class='login' href='$authUrl'><img src=\"".HTTPPATH."googleauth/google-login-button-asif18.png\" alt=\"Google login\" title=\"login with google\" /></a>";
	} else {
    
		?>
<p><b>ID: </b><?php echo $_SESSION['user']['id']; ?><br>
<b>Name: </b><?php echo $_SESSION['user']['name']; ?><br>
<b>Gender: </b><?php echo $_SESSION['user']['gender']; ?><br>
<img src="<?php echo $_SESSION['user']['picture']; ?>" />
</p>
		<?php
}

/*
[user] => Array
        (
            [id] => 112913147917981568678
            [email] => manishkk74@gmail.com
            [verified_email] => 1
            [name] => Manish Khanchandani
            [given_name] => Manish
            [family_name] => Khanchandani
            [link] => https://plus.google.com/112913147917981568678
            [picture] => https://lh6.googleusercontent.com/-nLg0dFRo0DQ/AAAAAAAAAAI/AAAAAAAAGQs/AO_UIb6UHAM/photo.jpg
            [gender] => male
        )
        */
?>