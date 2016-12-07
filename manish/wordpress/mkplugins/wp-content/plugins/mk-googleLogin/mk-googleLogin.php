<?php

/**

* Plugin Name: MK Google Login

* Plugin URI: http://mkgalaxy.com

* Description: Login to website using google login

* Version: 1.01

* Author: Mkhanchandani

* Author URI: http://manishkhanchandani.tk/

* Requires at least: 4.0

* Tested up to: 4.6.1

* License: GPL2 or higher

*/



defined( 'ABSPATH' ) or die( "No direct access please." );

require_once(sprintf("%s/googleauth/src/Google_Client.php", dirname(__FILE__)));
require_once(sprintf("%s/googleauth/src/contrib/Google_PlusService.php", dirname(__FILE__)));
require_once(sprintf("%s/googleauth/src/contrib/Google_Oauth2Service.php", dirname(__FILE__)));
