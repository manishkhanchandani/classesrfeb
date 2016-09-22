<?php
/*
$vowels = array("a", "e", "o", "u");
$consonants = array("b", "c", "d", "v", "g", "t", "h", "m", "n", "p", "q", "z", "j", "f", "k", "l", "r", "s");

function randVowel()
{
	global $vowels;
	return $vowels[array_rand($vowels, 1)];
}

function randConsonant()
{
	global $consonants;
	return $consonants[array_rand($consonants, 1)];
}

function randomName() {
   return ucfirst("" . randConsonant() . "" . randVowel() . "" . "" . randConsonant() . "" . randVowel() . "" . randVowel() . "" . randConsonant() . "" . randVowel() . "");
}

$arr = array();
$arr['petition_id'] = 2319361;
$arr['first_name'] = randomName();
$arr['last_name'] = randomName();
if (empty($pageId)) $pageId = -1;
$arr['email'] = $arr['first_name'].'.'.$arr['last_name'].'.'.$pageId.'@mkgalaxy.com';

$apiKey = 'bF0yfFz0nbYkFWvADd2oQRp6p8BI8FO74uEEDkGX';
$uri = 'https://api.whitehouse.gov/v1/signatures.json?api_key='.$apiKey;
$postFields = json_encode($arr);
$return = postJson($uri, $postFields);
if ($return['http_code'] != 200) {
  mail('naveenkhanchandani@gmail.com', 'checksum', var_export($return, 1));
}
*/
?>