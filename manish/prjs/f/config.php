<?php

function yearToAge($year) {
  $currentYear = date('Y');
  return $currentYear - $year;
}

$siteConfig = array(
  'SITENAME' => 'femalejole.tk',
  'PROJECT_TITLE' => 'FemaleJole (A Lesbian Community)',
  'TEMPLATE_FILE' => 'f/template.php',
  'MESSAGE_URL' => 'f/messages?toId=',
  'HOBBIES' => array('foreplay' => 'Foreplay', 'dfk' => 'DFK', 'backMassage' => 'Back Massage', 'hard' => 'Hard', 'soft' => 'Soft', 'anal' => 'Anal', 'licking' => 'Licking', 'toys' => 'Toys', 'strapOn' => 'Strap On', 'mutualMasturbation' => 'Mutual Masturbation', 'cunnilingus' => 'Cunnilingus', 'fingering' => 'Fingering', 'oralSex' => 'Oral Sex', 'dildo' => 'Dildo', 'vibrator' => 'Vibrator'),
  'education' => array(1 => 'Masters', 'Honours degree', 'Bachelors', 'Undergraduate', 'Associate Degree', 'Diploma', 'High School', 'Less than high school', 'Trade School'),
  'religion' => array(1 => 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Parsi', 'Jain'),
  'marital_status' => array(1 => 'Never Married', 'Divorced', 'Separated', 'Widowed', 'Married'),
  'profession' => array(1 => 'Advertising/ Marketing', 'Administrative services', 'Architecture', 'Armed Forces', 'Arts', 'Commerce', 'Computers/ IT', 'Education', 'Engineering/ Technology', 'Fashion', 'Finance', 'Fine Arts', 'Home Science', 'Homely', 'Law', 'Management', 'Medicine', 'Nursing/ Health Sciences', 'Office administration', 'Science', 'Shipping', 'Travel &amp; Tourism'),
  'height' => array(1 => 'Below 4 Feet', 'Between 4 to 5 Feet', 'Between 5 to 6 Feet', 'Above 6 Feet'),
  'weight' => array(1 => 'Between 50 to 100 lb', 'Between 100 to 150 lb', 'Between 150 to 200 lb', 'Between 200 to 250 lb', 'Above 250 lb'),
  'gender' => array(1 => 'Male', 'Female'),
  'showGender' => 2,
  'diet' => array(1 => 'Veg', 'Non-Veg', 'Occasionally Non-Veg', 'Eggetarian', 'Vegan'),
  'bodyType' => array(1 => 'Slim', 'Athletic', 'Average', 'Heavy'),
  'nature' => array(1 => 'Top', 'Bottom', 'Versatile'),
  'hosting' => array(1 => 'I can host', 'I cannot host'),
  'drinking' => array(1 => 'No', 'Occassionally', 'Yes'),
  'smoking' => array(1 => 'No', 'Occassionally', 'Yes'),
  'firebaseDirectory' => '/f',
  'homeUrl' => 'f/home',
  'tableName' => 'f_profile'
  
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
  $_GET['p'] = 'f/home';
}
?>