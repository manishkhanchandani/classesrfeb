<?php
//header and include files
header('Content-Type: application/json'); 
try {
  $return = array('success' => 1);
  if (empty($_REQUEST['email'])) {
    throw new Exception('email is required');  
  }
  if (empty($_REQUEST['subject'])) {
    throw new Exception('subject is required');  
  }
  if (empty($_REQUEST['message'])) {
    throw new Exception('message is required');  
  }
  if (empty($_REQUEST['from'])) {
    throw new Exception('from is required');  
  }
  if (empty($_REQUEST['fromEmail'])) {
    throw new Exception('fromEmail is required');  
  }
  mail($_REQUEST['email'], $_REQUEST['subject'], $_REQUEST['message'], 'From:'.$_REQUEST['from'].'<'.$_REQUEST['fromEmail'].'>');
} catch (Exception $e) {
  $return = array('success' => 0, 'error' => $e->getMessage());
}
echo json_encode($return);
?>