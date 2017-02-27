<?php
switch ($_SERVER['HTTP_HOST']) {
  case 'donationworld.tk':
  case 'www.donationworld.tk':
  case 'dw.mkgalaxy.com':
    header("Location: d/home");
    exit;
    break;
  case 'femalejole.tk':
  case 'www.femalejole.tk':
    header("Location: f/home");
    exit;
    break;
  case 'malejole.tk':
  case 'www.malejole.tk':
    header("Location: g/home");
    exit;
    break;
  case 'core.mkgalaxy.com':
    header("Location: g/home");
    exit;
    break;
}
?>
<h1>Not a Valid Directory</h1>