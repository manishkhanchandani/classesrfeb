<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_connLaw = "remote-mysql4.servage.net";
$database_connLaw = "alaw";
$username_connLaw = "alaw";
$password_connLaw = "manishkk74";
$connLaw = mysql_connect($hostname_connLaw, $username_connLaw, $password_connLaw) or trigger_error(mysql_error(),E_USER_ERROR); 
?>