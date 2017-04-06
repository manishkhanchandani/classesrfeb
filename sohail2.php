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

$string = '[row asin=”B01LYOLGYJ” value=”Nothing goes here”][row asin=”B0002NYD1W” value=”wow”][row asin=”B0002NYD1X”][row asin=”B0002NYD1Z”]';

$regexp = "\[row asin=”([^”]*)”(.*)\]";
$matches = regexp($string, $regexp);
pr($matches);
$returnValue = array();
if (!empty($matches)) {
  foreach ($matches as $k => $v) {
    $value = '';
    if (!empty($v[2])) {
      $val = $v[2];
      
      /*$regexp2 = "([^=]*)=”(.*)”";
      $matches2 = regexp($val, $regexp2);
      pr($matches2);*/
      $regexp2 = "value=”(.*)”";
      $matches2 = regexp($val, $regexp2);
      if (!empty($matches2[0][1])) {
        $value = $matches2[0][1];
      }
    }
    
    $array = array('asin' => $v[1]);
    if (!empty($value)) {
      $array['value'] = $value;
    }
    
    $returnValue[] = $array;
  }
}
echo $string;
pr($returnValue);
exit;

?>