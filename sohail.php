<?php
function pr($value)
{
  echo '<pre>';
  print_r($value);
  echo '</pre>';
}

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

$string = '[row asin="B01LYOLGYJ" value="Nothing goes here"][row asin="B0002NYD1W" value="wow"][row asin="B0002NYD1X" value="heybaby"]';

$regexp = "\[row asin=\"(.*)\" value=\"(.*)\"\]";
$matches = regexp($string, $regexp);
$returnValue = array();
if (!empty($matches)) {
  foreach ($matches as $k => $v) {
    $returnValue[] = array('asin' => $v[1], 'value' => $v[2]);
  }
}
echo $string;
pr($returnValue);
exit;

?>