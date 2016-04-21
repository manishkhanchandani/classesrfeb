<?php
  $smountSharingConfig = array( 'admin' => 20,
            'owner' => 40,
            'ref1_level1' => 10,
            'ref1_level2' => 5,
            'ref1_level3' => 3,
            'ref1_level4' => 2,
            'ref2_level1' => 5,
            'ref2_level2' => 5,
            'ref2_level3' => 5,
            'ref2_level4' => 5
            );




function getRecordDetails($firebase, $id, $path1, $path2) {
  $path = $path1 . '/records/'.$id;
  $record = json_decode($firebase->get($path), 1);
  if (empty($record)) {
    $path = $path2 . '/records/'.$id;
    $record = json_decode($firebase->get($path), 1);
    $record['sourcePath'] = $path2;
  } else {
    $record['sourcePath'] = $path1;
  }
  return $record;  
}
  


function saveData($firebase, $user_id, $data, $path1) {
  if (!empty($data['paths'])) {
    unset($data['paths']);
  }
  
  $path = MAIN_PATH . '/users/'.$user_id;
  $userData = json_decode($firebase->get($path), 1);
  
  $data['details']['postedBy'] = $userData['displayName'];
  $data['details']['profileImage'] = $userData['image'];
  
  $pathID = $data['id'];
  pr($data);
  exit;
  $idPath = $path1 . '/records/'.$pathID;
  $firebase->set($path, $data);
  //$arr = json_decode($sid, 1);
  //$pathID = $arr['name'];
  
  //$idPath = $path1 . '/records/'.$pathID;
  //$firebase->set($idPath.'/id', $pathID);
  
  $recordPath = $idPath.'/paths';
  $firebase->delete($recordPath);
  
  $firebase->set($path1.'/my/'.$user_id.'/'.$pathID, time() * 1000);
  if (!empty($data['location']['county'])) {
    $firebase->set($path1.'/location/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID, time() * 1000);
  }
  
  
  $firebase->push($recordPath, 'records/' . $pathID);
  $firebase->push($recordPath, 'my/' .$user_id . '/' .$pathID);
  $firebase->push($recordPath, 'location/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID);
  
  
  if (!empty($data['tags2'])) {
    $arr = explode(',', $data['tags2']);
    foreach ($arr as $v) {
      $v = strtolower(trim($v));
      if (empty($v)) {
       continue; 
      }//end if
      if (!empty($data['location']['county'])) {
        $firebase->set($path1.'/tags/' . base64_encode($v) . '/' . base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID, time() * 1000);
        $firebase->push($recordPath, 'tags/' . base64_encode($v) . '/' .  base64_encode($data['location']['country']) . '/' . base64_encode($data['location']['state']) . '/' . base64_encode($data['location']['county']) . '/' . $pathID);
      }
      $firebase->set($path1.'/onlyTags/' . base64_encode($v) . '/' . $pathID, time() * 1000);
      $firebase->push($recordPath, 'onlyTags/' . base64_encode($v) . '/' . $pathID);
    }
  }
}

function deleteRecord($firebase, $record) {
  //delete all old paths
  if (empty($record['paths'])) {
    return;
  }
  
  foreach ($record['paths'] as $v) {
    $path = $record['sourcePath']. '/' . $v;
    $firebase->delete($path);
  }
  return $record;
}

/*
 * $id, record id
 * $user_id, the new user id
 * path1 is tmp path or path which you want to delete, path 2 is path which you want to save
 */
function copyRecordByUserId($firebase, $id, $user_id, $path1, $path2)
{
  $record = getRecordDetails($firebase, $id, $path1, $path2);
  if (empty($record)) {
    return false; 
  }
  //delete all old paths
  deleteRecord($firebase, $record);
  $record['uid'] = $user_id;

  //save data
  saveData($firebase, $user_id, $record, $path2);
}