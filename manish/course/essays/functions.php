<?php

function pr($d) {
  echo '<pre>';
  print_r($d);
  echo '</pre>';
}
function getIssuesAndModifiedData($issueArray, $data='', $issueFound=array()) {

  $modifiedData = $data;
  if (!empty($issueArray)) {
    foreach ($issueArray as $issue => $issueDetails) {
      $pos = strpos($data, $issue);
      if (!($pos === false)) {
        $issueFound[] = $issueDetails;
        $modifiedData = str_replace($issue , '<span class="selectedWord">'.$issue.'</span>' , $modifiedData);
      }
    }
  }
  
  return array($modifiedData, $issueFound);
}//end