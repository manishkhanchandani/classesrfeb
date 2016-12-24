<?php

class Groups
{
  function postNewProfile($data, $uid='') {
    global $modelGeneral;
    if (empty($data['location'])) {
        throw new Exception('missing address');
    }
    if (empty($data['name'])) {
        throw new Exception('missing name');
    }
    
    $data['uid'] = $uid;
    $data['address'] = stripslashes($data['address']);
    $data['images'] = json_encode(array_filter($_POST['images']));
    $data['videos'] = json_encode(array_filter($_POST['videos']));
    $data['urls'] = json_encode(array_filter($_POST['urls']));
    $data['created_on'] = date('Y-m-d H:i:s');
    $data['updated_on'] = date('Y-m-d H:i:s');
    $data['url'] = url_name_v2($data['location']);
    $data['id'] = md5($data['url']);

    $query = "select * from city_groups where id = ?";
    $existed = $modelGeneral->fetchRow($query, array($data['id']), 0);
    if (!empty($existed)) {
      throw new Exception('Group already existed for this city');
    }//end if
    
    $ins = $modelGeneral->addDetails('city_groups', $data);
    
    //insert into members
    $this->postGroupMembers($data['id'], $data['uid'], 'Organiser', 1);
    //end into members
    
    header("Location: ".HTTPPATH.'admin/newConfirm');
    exit;
  }
  
  
  function postNewEvent($data, $uid='') {
    global $modelGeneral;
    if (empty($data['event_location'])) {
        throw new Exception('missing location');
    }
    if (empty($data['event_title'])) {
        throw new Exception('missing event title');
    }
    
    $arr = json_decode($data['event_address'], 1);
    $data['event_uid'] = $uid;
    $data['event_address'] = stripslashes($data['event_address']);
    $data['event_images'] = json_encode(array_filter($_POST['event_images']));
    $data['event_videos'] = json_encode(array_filter($_POST['event_videos']));
    $data['event_urls'] = json_encode(array_filter($_POST['event_urls']));
    $data['event_created_on'] = date('Y-m-d H:i:s');
    $data['event_updated_on'] = date('Y-m-d H:i:s');
    $data['event_id'] = guid();
    //create group if empty
    $location = $arr['ln']['city'].', '.$arr['sn']['state'].', '.$arr['ln']['country'];
    $name = $arr['ln']['city'];
    $url = url_name_v2($location);
    $group_id = md5($url);
    if (empty($data['group_id'])) {
      $data['group_id'] = $group_id;
    }//end if
    
    if (!empty($data['group_id'])) {
      $query = "select * from city_groups where id = ?";
      $existed = $modelGeneral->fetchRow($query, array($data['group_id']), 0);
      if (empty($existed)) {
        throw new Exception('Group "'.$location.'" does not exist. Please create this group before posting an event in this city.');
      }
    }//end if
    
    $query = "select * from city_events where event_id = ?";
    $existedEvents = $modelGeneral->fetchRow($query, array($data['event_id']), 0);
    if (!empty($existedEvents)) {
      throw new Exception('Event already existed.');
    }//end if
    
    if ($existed['url'] !== $url) {
      throw new Exception('City name of Event is different from city name of Group, both should be in same city.');  
    }
 
    $ins = $modelGeneral->addDetails('city_events', $data);
    
    //insert into members
    $this->postEventMembers($data['event_id'], $data['event_uid'], 'Organiser', 1);
    //end into members
    
    header("Location: ".HTTPPATH.$existed['url'].'/events/newConfirm');
    exit;
  }
  
  public function postEventMembers($eventId, $memberId, $accessLevel, $is_owner)
  {
    global $modelGeneral;
    $d = array();
    $d['event_id'] = $eventId;
    $d['event_member_id'] = $memberId;
    $d['event_joined_on'] = date('Y-m-d H:i:s');
    $d['event_accessLevel'] = $accessLevel;
    $d['event_is_owner'] = $is_owner;
    $modelGeneral->addDetails('city_event_members', $d);
  }//end postEventMembers()
  
  
  public function postGroupMembers($groupId, $memberId, $accessLevel, $is_owner)
  {
    global $modelGeneral;
    $d = array();
    $d['group_id'] = $groupId;
    $d['member_id'] = $memberId;
    $d['joined_on'] = date('Y-m-d H:i:s');
    $d['accessLevel'] = $accessLevel;
    $d['is_owner'] = $is_owner;
    $modelGeneral->addDetails('city_groups_members', $d);
  }//end postGroupMembers()
  
  
  public function updateGroupMembers($groupId, $memberId, $accessLevel='Member', $is_owner=0)
  {
    global $modelGeneral;
    $d = array();
    $d['accessLevel'] = $accessLevel;
    $d['is_owner'] = $is_owner;
    $where = sprintf('group_id = %s AND member_id = %s', $modelGeneral->qstr($groupId), $modelGeneral->qstr($memberId));
    $modelGeneral->updateDetails('city_groups_members', $d, $where);
  }//end updateGroupMembers()
  
  
  function postUpdateProfile($data) {
    global $modelGeneral, $massageTypes;
    $data['name'] = $data['location'];
    if (empty($data['location'])) {
        throw new Exception('missing address');
    }
    if (empty($data['name'])) {
        throw new Exception('missing name');
    }
    
    unset($data['uid']);
    $where = sprintf('id = %s', $modelGeneral->qstr($data['id']));
    $modelGeneral->updateDetails('city_groups', $data, $where);
    header("Location: ".HTTPPATH.'admin/updateConfirm?id='.$data['id']);
    exit;
  }
  
  
  public function getList($max=100, $page=0, $totalRows_rsView=0, $keyword='', $lat='', $lon='', $radius='', $params=array(), $uid='', $cacheTime=900) {
    global $modelGeneral;
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $page * $maxRows_rsView;
    $pageNum_rsView = $page;
    //$maxRows_rsView = (int) $max;
    //$startRow_rsView = (int) $start;
    //$pageNum_rsView = floor($startRow_rsView / $maxRows_rsView);
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $return['cacheTime'] = $cacheTime;
    $distance = '';
    $distanceWhere = '';
    $orderBy = ' ORDER BY m.created_on DESC';
    if (!empty($lat) && !empty($lon) && !empty($radius)) {
      $lat = (double) $lat;
      $lon = (double) $lon;
      $radius = (int) $radius;
      $distance = ", (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(m.lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(m.lat)) * COS(RADIANS(".$lon." -(m.lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(m.lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(m.lat)) * COS(RADIANS(".$lon." -(m.lng)))))*60*1.1515,2)) <= ".$radius;
      $orderBy = ' ORDER BY distance ASC, m.created_on DESC';
    }
    $mainSql = "select * $distance";
    $mainSql .= ", (select count(*) from city_groups_members as gm WHERE gm.group_id = m.id) as members";
    
    $sql = " from city_groups as m WHERE 1 $distanceWhere AND m.status = 1 AND m.deleted = 0";
    if (!empty($keyword)) {
      $sql .= " AND (m.name like ".$modelGeneral->qstr('%'.$keyword.'%')." OR m.description like ".$modelGeneral->qstr('%'.$keyword.'%').")";
    }
    //end keyword
    
    if (!empty($uid)) {
      $sql .= " AND (m.uid = ".$modelGeneral->qstr($uid).")";
    }//end uid
    
    if (!empty($params)) {
      $sql .= " AND (";
      $tmp = array();
      foreach ($params as $k => $v) {
        $tmp[] = "m.".$v." = 1";
      }
      $tmpString = implode(' OR ', $tmp);
      $sql .= $tmpString;
      $sql .= ")";
    }
    
    $sql_limit_rsView = sprintf("%s LIMIT %d, %d", $mainSql.$sql.$orderBy, $startRow_rsView, $maxRows_rsView);
  
    $data = $modelGeneral->fetchAll($sql_limit_rsView, array(), $cacheTime);
  
    $queryTotalRows = 'select count(*) as cnt '.$sql;
    if (empty($totalRows_rsView)) {
      $rowCountResult = $modelGeneral->fetchRow($queryTotalRows, array(), $cacheTime);
      $totalRows_rsView = (int) $rowCountResult['cnt'];
    }
    $sql2 = $queryTotalRows;
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    $return['data'] = $data;
    $return['sql1'] = $sql_limit_rsView;
    $return['sql2'] = $sql2;
    return $return;
  }
  
  public function getEventList($max=100, $page=0, $totalRows_rsView=0, $group_id='', $keyword='', $lat='', $lon='', $radius='', $uid='', $cacheTime=900) {
    global $modelGeneral;
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $page * $maxRows_rsView;
    $pageNum_rsView = $page;
    //$maxRows_rsView = (int) $max;
    //$startRow_rsView = (int) $start;
    //$pageNum_rsView = floor($startRow_rsView / $maxRows_rsView);
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $return['cacheTime'] = $cacheTime;
    $distance = '';
    $distanceWhere = '';
    $orderBy = ' ORDER BY m.event_created_on DESC';
    if (!empty($lat) && !empty($lon) && !empty($radius)) {
      $lat = (double) $lat;
      $lon = (double) $lon;
      $radius = (int) $radius;
      $distance = ", (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(m.event_lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(m.event_lat)) * COS(RADIANS(".$lon." -(m.event_lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(m.event_lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(m.event_lat)) * COS(RADIANS(".$lon." -(m.event_lng)))))*60*1.1515,2)) <= ".$radius;
      $orderBy = ' ORDER BY distance ASC, m.event_created_on DESC';
    }
    $mainSql = "select * $distance";
    $mainSql .= ", (select count(*) from city_event_members as em WHERE em.event_id = m.event_id) as members";
    
    $sql = " from city_events as m LEFT JOIN city_groups as g ON m.group_id = g.id WHERE 1 $distanceWhere AND m.event_status = 1 AND m.event_deleted = 0";
    if (!empty($keyword)) {
      $sql .= " AND (m.event_title like ".$modelGeneral->qstr('%'.$keyword.'%')." OR m.event_description like ".$modelGeneral->qstr('%'.$keyword.'%').")";
    }
    //end keyword
    
    if (!empty($uid)) {
      $sql .= " AND (m.event_uid = ".$modelGeneral->qstr($uid).")";
    }//end uid
    
    if (!empty($group_id)) {
      $sql .= " AND (m.group_id = ".$modelGeneral->qstr($group_id).")";
    }//end uid
    

    $sql_limit_rsView = sprintf("%s LIMIT %d, %d", $mainSql.$sql.$orderBy, $startRow_rsView, $maxRows_rsView);
    $data = $modelGeneral->fetchAll($sql_limit_rsView, array(), $cacheTime);
  
    $queryTotalRows = 'select count(*) as cnt '.$sql;
    if (empty($totalRows_rsView)) {
      $rowCountResult = $modelGeneral->fetchRow($queryTotalRows, array(), $cacheTime);
      $totalRows_rsView = (int) $rowCountResult['cnt'];
    }
    $sql2 = $queryTotalRows;
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    $return['data'] = $data;
    $return['sql1'] = $sql_limit_rsView;
    $return['sql2'] = $sql2;
    return $return;
  }



  public function editDeleteLink($uid1, $uid2, $id, $is_admin='')
  {
    if (!($uid1 === $uid2 || $is_admin)) return;
    return '<div><small><a href="'.HTTPPATH.'admin/new?id='.$id.'">Edit</a> | <a href="'.HTTPPATH.'admin/delete?id='.$id.'">Delete</a></small></div>';
  }//end editDeleteLink()
  
  public function detail($id) {
    global $modelGeneral;
    $query = "select *, (select count(*) from city_groups_members as gm WHERE gm.group_id = m.id) as members from city_groups as m WHERE m.id = ?";
    $data = $modelGeneral->fetchRow($query, array($id), 900);
    return $data;
  }//end detail
  
  public function detailMembers($id)
  {
    global $modelGeneral;
    $query = "select * from city_groups_members as gm LEFT JOIN users as u ON gm.member_id = u.uid WHERE gm.group_id = ? ORDER BY gm.joined_on DESC";
    $members = $modelGeneral->fetchAll($query, array($id), 900);
    return $members;
  }
  
  public function countMembers($id)
  {
    global $modelGeneral;
    $query = "select count(gm.member_id) as cnt from city_groups_members as gm LEFT JOIN users as u ON gm.member_id = u.uid WHERE gm.group_id = ? ORDER BY gm.joined_on DESC";
    $members = $modelGeneral->fetchRow($query, array($id), 900);
    return $members;
  }
  
  public function myGroupMemberShip($id, $uid)
  {
    global $modelGeneral;
    $query = "select * from city_groups_members as gm LEFT JOIN users as u ON gm.member_id = u.uid WHERE gm.group_id = ? AND gm.member_id = ? ORDER BY gm.joined_on DESC";
    $members = $modelGeneral->fetchRow($query, array($id, $uid), 900);
    return $members;
  }
}
?>