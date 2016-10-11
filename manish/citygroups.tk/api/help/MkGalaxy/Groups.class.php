<?php

class Groups
{
  function postNewProfile($uid, $data) {
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
      $distance = ", (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(m.lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(m.lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(m.lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
      DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(m.lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(m.lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(m.lng)))))*60*1.1515,2)) <= ".GetSQLValueString($radius, 'int');
      $orderBy = ' ORDER BY distance ASC, m.created_on DESC';
    }
    
    $mainSql = "select * $distance";
    $mainSql .= ", (select count(*) from city_groups_members as gm WHERE gm.group_id = m.id) as members";
    
    $sql = " from city_groups as m WHERE 1 $distanceWhere AND m.status = 1 AND m.deleted = 0";
    if (!empty($keyword)) {
      $sql .= " AND (m.name like ".GetSQLValueString('%'.$keyword.'%', 'text')." OR m.description like ".GetSQLValueString('%'.$keyword.'%', 'text').")";
    }
    //end keyword
    
    if (!empty($uid)) {
      $sql .= " AND (m.uid = ".GetSQLValueString($uid, 'text').")";
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



  public function editDeleteLink($uid1, $uid2, $id, $is_admin='')
  {
    if (!($uid1 === $uid2 || $is_admin)) return;
    return '<div><small><a href="'.HTTPPATH.'admin/new?id='.$id.'">Edit</a> | <a href="'.HTTPPATH.'admin/delete?id='.$id.'">Delete</a></small></div>';
  }//end editDeleteLink()
}
?>