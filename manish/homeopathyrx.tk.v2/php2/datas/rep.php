<?php
include('../conn.php');
include('../functions.php');
include('../general.php');

$chapter = 'generalities';
$chapterNum = 0;
foreach ($chapters as $k => $v) {
  if ($v['chapter'] === $chapter) {
    $chapterNum = $k;  
  }
}
$filename = '../../tempFolder/rawdata/generalities.html';
echo $filename;
echo '<br>';
echo $chapterNum;
pr($chapters);
exit;
function analyseThis($reference)
  {
    $obj = array();
    $arr = explode(',', $reference);
    if (empty($arr)) {
      return $obj;  
    }
    foreach ($arr as $key => $value) {
      $value = trim(strtolower($value));
      $regexp = '<i><font color=\"#0000ff\">(.*)<';
      $match1 = regexp($value, $regexp);
      $regexp = '<font color=\"#0000ff\">(.*)<\/font>';
      $match2a = regexp($value, $regexp);
      $regexp = '<b><font color="#ff0000">(.*)<';
      $match3 = regexp($value, $regexp);
      $regexp = '<b><font color="#ff0000">(.*)<\/b>';
      $match4 = regexp($value, $regexp);
      $regexp = '<font color=\"#0000ff\">(.*)$';
      $match5 = regexp($value, $regexp);
      $regexp = '<b><font color="#ff0000">(.*)$';
      $match6 = regexp($value, $regexp);
      if (!empty($match1)) {
        $cleanText = strip_tags($match1[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 2); 
      } else if (!empty($match2a)) {
        $cleanText = strip_tags($match2a[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 2); 
      } else if (!empty($match3)) {
        $cleanText = strip_tags($match3[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 3); 
      } else if (!empty($match4)) {
        $cleanText = strip_tags($match4[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 3); 
      } else if (!empty($match5)) {
        $cleanText = strip_tags($match5[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 2); 
      } else if (!empty($match6)) {
        $cleanText = strip_tags($match6[0][1]);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 3); 
      } else {
        $cleanText = strip_tags($value);
        $obj[base64_encode($cleanText)] = array('remedy' => $cleanText, 'points' => 1); 
      }
    }
    return $obj;
  }

$priority = 1;
$homeopathy = new Models_General($connMainAdodb);

$content = file_get_contents($filename);
$regexp = '<p>(.*)<\/p>';
$matches = regexp($content, $regexp);

foreach ($matches as $match) {
  if ($match[1] === '----------') {
    continue;  
  }
  if (substr($match[1], 0, 7) === '<a HREF') {
    continue;  
  }
  if (substr($match[1], 0, 9) === 'Copyright') {
    continue;  
  }
  if (substr($match[1], 0, 10) === '----------') {
    continue;  
  }
  
  $data = array();
  $tmp = explode(':', $match[1]);
  if (count($tmp) === 2) {
    $data['symptom'] = $tmp[0];
    $data['remedies'] = json_encode(analyseThis($tmp[1]));
  } else {
    $data['symptom'] = $match[1];
    $data['remedies'] = '';
  }
  $data['symptom'] = trim(strtolower(strip_tags($data['symptom'])));
  $data['chapter'] = $chapterNum;
  $data['parent_id'] = 0;
  $data['priority'] = $priority;
  $homeopathy->addDetails('hom_kent_repertory', $data);
  $priority++;
}
?>