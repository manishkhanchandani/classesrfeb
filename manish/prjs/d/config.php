<?php

function yearToAge($year) {
  $currentYear = date('Y');
  return $currentYear - $year;
}

$siteConfig = array(
  'SITENAME' => 'donationworld.tk',
  'PROJECT_TITLE' => 'Donation World',
  'TEMPLATE_FILE' => 'd/template.php',
  'MESSAGE_URL' => 'd/messages?toId=',
  'firebaseDirectory' => '/d',
  'homeUrl' => 'd/home',
  'tableName' => 'd_profile'
  
  
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
  $_GET['p'] = 'd/home';
}
?>