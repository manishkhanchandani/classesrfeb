<?php

# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_connClassesMain = "localhost";
$database_connClassesMain = "consultl_classes";
$username_connClassesMain = "consultl_user";
$password_connClassesMain = "passwords123";
$connClassesMain = mysql_connect($hostname_connClassesMain, $username_connClassesMain, $password_connClassesMain) or trigger_error(mysql_error(),E_USER_ERROR);
mysql_select_db($database_connClassesMain, $connClassesMain) or die('could not select db');
$dsn_connClassesMain = 'mysql:dbname='.$database_connClassesMain.';host='.$hostname_connClassesMain;

//adodb try
define('BASE_DIR', dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))));
include(BASE_DIR.'/adodb/adodb.inc.php');
$ADODB_CACHE_DIR = BASE_DIR.'/adodb_cache';
$connClassesMainAdodb = ADONewConnection('mysql');
$connClassesMainAdodb->Connect($hostname_connClassesMain, $username_connClassesMain, $password_connClassesMain, $database_connClassesMain);
//$connAdodb->LogSQL();consultl_user, passwords123
