<?php

$siteConfig = array(
  'SITENAME' => 'localcommunity.tk',
  'PROJECT_TITLE' => 'Local Community',
  'TEMPLATE_FILE' => 'l/template.php',
  'MESSAGE_URL' => 'l/messages?toId=',
  'firebaseDirectory' => '/sites/locals',
  'homeUrl' => 'l/home'
  
  
);

$defaultFirebasePath = $siteConfig['firebaseDirectory'];

define('DEFAULT_IMAGE', 'http://bento.cdn.pbs.org/hostedbento-prod/filer_public/_bento_media/img/no-image-available.jpg');

$siteConfig = array_merge($siteConfigMain, $siteConfig);

$page = '';
if (!empty($_GET['p'])) {
  $page = $_GET['p'];
  $page .= '.php';
}


if (!file_exists($page)) {
  $_GET['p'] = 'l/home';
}
?>