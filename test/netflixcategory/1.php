<?php
function pr($value)
	{
		echo '<pre>';
		print_r($value);
		echo '</pre>';
		return true;
	}
	
if (!function_exists('regexp')) {
	function regexp($input, $regexp, $casesensitive=false)
	{
		if ($casesensitive === true) {
			if (preg_match_all("/$regexp/sU", $input, $matches, PREG_SET_ORDER)) {
				return $matches;
			}
		} else {
			if (preg_match_all("/$regexp/siU", $input, $matches, PREG_SET_ORDER)) {
				return $matches;
			}
		}

		return false;
	}
}

$content = file_get_contents('data.txt');
$regexp = '<a.*>(.*)<span.*>.*<\/span>.*<\/a>';
$matches = regexp($content, $regexp);
$arr = array();
foreach($matches as $k => $v) {
	array_push($arr, trim($v[1]));
}
file_put_contents('categories.json', json_encode($arr));
echo json_encode($arr);
?>