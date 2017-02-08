<?php
class D
{
  const admin_amount = 10;
  
  function createNewRec($uid, $amount='') {
    global $modelGeneral;
    
    if (empty($amount)) {
      return;
    }
    
    $d = array();
    $d['uid'] = $uid;
    for ($i = 0; $i < $amount; $i++) {
      $amt = 1;
      $d['created_dt'] = date('Y-m-d H:i:s');
      $d['amount'] = ($amt * (100 - self::admin_amount)) / 100;
      $d['admin_amount'] = ($amt * self::admin_amount) / 100;
      $d['parent_id'] = 0;
      $d['to_uid'] = $uid;
      echo 'd';
      pr($d);
      $id = $modelGeneral->addDetails('d_profile', $d);
      echo "id is $id<br>";
      if ($id === 1) continue;
      
      $id2 = floor($id / 2);
      $query = "select * from d_profile where id = ?";
      $row = $modelGeneral->fetchRow($query, array($id2), 0);
      echo 'row';
      pr($row);

      $newD = array();
      $newD['parent_id'] = $id2;
      $newD['to_uid'] = $row['uid'];
      echo 'newD';
      pr($newD);
      $where = sprintf('id = %s', $id);
      $modelGeneral->updateDetails('d_profile', $newD, $where);
    }
    
    $query = "select * from d_profile order by id";
    $record = $modelGeneral->fetchAll($query, array(), 0);
    pr($record);
  }
  
  public function findAmount($user) {
    global $modelGeneral;
    
    $query = "select * from d_profile where to_uid = ? order by created_dt";
    $record = $modelGeneral->fetchAll($query, array($user), 0);
    pr($record);
  }
  
  public function amountPaid($user) {
    global $modelGeneral;
    
    $query = "select * from d_profile where uid = ? order by created_dt";
    $record = $modelGeneral->fetchAll($query, array($user), 0);
    pr($record);
  }
  
  public function findAmountTotal($user) {
    global $modelGeneral;
    
    $query = "select sum(amount) as total from d_profile where to_uid = ? group by to_uid order by created_dt";
    $record = $modelGeneral->fetchRow($query, array($user), 0);
    pr($record);
  }
  
  public function amountPaidTotal($user) {
    global $modelGeneral;
    
    $query = "select count(uid) as total from d_profile where uid = ? group by uid order by created_dt";
    $record = $modelGeneral->fetchRow($query, array($user), 0);
    pr($record);
  }
}
/*
  id  parent id
  1   0
  2   1
  3   1
*/
?>