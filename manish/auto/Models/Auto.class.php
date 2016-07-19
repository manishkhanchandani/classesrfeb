<?php
class Models_Auto extends Models_General
{
  protected $data = array();

  public function getFields($module_id, $module_name)
  {
    $tablename = 'auto_'.$module_name;
    $this->data['tablename'] = $tablename;

    $query = "SELECT * FROM z_modules_fields WHERE module_id = ? ORDER BY sorting ASC";
    $this->data['module_fields_query'] = $query;
    $resultModuleFields = $this->fetchAll($query, array($module_id), $t);
    if (empty($resultModuleFields)) {
      throw new Exception('Could not find the module fields');
    }
    $this->data['resultModuleFields'] = $resultModuleFields;
    
    return $resultModuleFields;
  }
  
  public function getModuleDetail($module_id)
  {
    if (empty($module_id)) {
      throw new Exception('missing module id');  
    }
    
    $colname_rsModule = "-1";
    if (isset($module_id)) {
      $colname_rsModule = $module_id;
    }
    $query = "SELECT * FROM z_modules WHERE module_id = ?";
    $this->data['module_query'] = $query;
    $resultModule = $this->fetchRow($query, array($colname_rsModule), $t);
    $this->data['resultModule'] = $resultModule;
    if (empty($resultModule)) {
      throw new Exception('Could not find the module');
    }
    if ($resultModule['module_status'] == 0) {
      throw new Exception('module is inactive');
    }  
    return $resultModule;
  }
  
  
  public function detailRecord($tablename, $resultModuleFields, $module_id, $id, $lat='', $lng='', $t=3600)
  {
    $locationBar = false;
    $distanceFrom = '';
    $distanceWhere = '';
    $searchCriteria = '';
    $searchCriteria .= ' AND a.id = ? AND a.module_id = ? AND a.rc_deleted = 0';
    foreach ($resultModuleFields as $k => $v) {
      if ($v['field_type'] == 'addressbox' && !empty($lat) && !empty($lng)) {
        $locationBar = true;
        $distanceFrom = ", (ROUND(DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.clatitude)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.clatitude)) * COS(RADIANS(".GetSQLValueString($lng, 'double')." -(a.clongitude)))))*60*1.1515,2)) as distance";
      }
    }
    $query_rowResult = "SELECT a.*, u.name as fullname, u.*, c.name as city, c.* $distanceFrom FROM ".$tablename." as a LEFT JOIN google_auth as u ON a.uid = u.uid LEFT JOIN geo_cities as c ON a.city_id = c.cty_id WHERE 1 $searchCriteria $distanceWhere";
    $rowResult = $this->fetchRow($query_rowResult, array($id, $module_id), $t);
    $this->data['query_rowResult'] = $query_rowResult;
    $this->data['query_rowResult_params'] = array($id, $module_id);
    $this->data['rowResult'] = $rowResult;
    if (empty($rowResult)) {
      throw new Exception('could not find the record');
    }
    
    //decryption
    foreach ($resultModuleFields as $k => $v) {
      if (!empty($rowResultEdit[$v['field_name']]) && $v['encrypted'] == 1) {
        $rowResultEdit[$v['field_name']] = decryptText($rowResultEdit[$v['field_name']]);
      }
      if ($v['field_type'] == 'images') {
        if (!empty($this->data['rowResult'][$v['field_name']])) {
          $images = json_decode($this->data['rowResult'][$v['field_name']], 1);
          $this->data['rowResult']['images'] = $images;
          if (!empty($images)) {
            $this->data['rowResult']['image'] = $images[0];
          }
        }
      }
      if ($v['field_type'] == 'videos') {
        if (!empty($this->data['rowResult'][$v['field_name']])) {
          $videos = json_decode($this->data['rowResult'][$v['field_name']], 1);
          $this->data['rowResult']['videos'] = $videos;
        }
      }
      if ($v['field_type'] == 'urls') {
        if (!empty($this->data['rowResult'][$v['field_name']])) {
          $urls = json_decode($this->data['rowResult'][$v['field_name']], 1);
          $this->data['rowResult']['urls'] = $urls;
        }
      }
    }
    //decryption
    
    $queryEditTags = "SELECT * FROM auto_pre_tags WHERE id = ?";
    $rowResultEditTags = $this->fetchAll($queryEditTags, array($id), 0);
    if (!empty($rowResultEditTags)) {
      $tmp = array();
      foreach ($rowResultEditTags as $tags) {
        $tmp[] = $tags['tag'];
      }
      $this->data['rowResult']['tags'] = implode(', ', $tmp);
    }
    return $rowResult;
  }
  
  
  public function details($module_id, $id, $lat='', $lng='') {
    if (empty($module_id)) {
      return false;  
    }
    if (empty($id)) {
      return false;  
    }
    $this->data['module_id'] = $module_id;
    $this->data['id'] = $id;
    
    
    $t = (3600*24);
    $this->data['t'] = $t;
    
    $resultModule = $this->getModuleDetail($module_id);
    $resultModuleFields = $this->getFields($module_id, $resultModule['module_name']);
    
    $resultModuleFields2 = array();
    foreach ($resultModuleFields as $k => $v) {
      $resultModuleFields2[$v['field_name']] = $v;
    }
    $this->data['resultModuleFields2'] = $resultModuleFields2;
    
    $rowResult = $this->detailRecord($this->data['tablename'], $this->data['resultModuleFields'], $module_id, $id, $lat, $lng, $this->data['t']);
    return $this->data;
  }//end if detail
  
  
  
  public function browse($module_id, $pageNum_rsView=0, $params=array(), $lat='', $lng='', $radius=30, $my=false, $uid='') {
    if (empty($module_id)) {
      return false;  
    }
    $this->data['module_id'] = $module_id;
    
    
    $t = (3600*24);
    $this->data['t'] = $t;
    
    $resultModule = $this->getModuleDetail($module_id);
    $resultModuleFields = $this->getFields($module_id, $resultModule['module_name']);
    
    $resultModuleFields2 = array();
    foreach ($resultModuleFields as $k => $v) {
      $resultModuleFields2[$v['field_name']] = $v;
    }
    $this->data['resultModuleFields2'] = $resultModuleFields2;
    //vars
    $maxRows_rsView = $resultModule['default_max_rows'];
    $mutilselectFrom = '';
    $locationBox = false;
    $cacheTime = 300;
    $distanceFrom = '';
    $distanceWhere = '';
    $searchCriteria = '';
    if (!empty($my)) {
      $cacheTime = 0;
      $searchCriteria .= ' AND a.rc_deleted = 0 AND a.uid = '.$modelGeneral->qstr($uid);
    } else {
      $searchCriteria .= ' AND a.rc_approved = 1 AND a.rc_status = 1 AND a.rc_deleted = 0';
    }
    
    $orderBy = 'ORDER BY a.'.$resultModule['default_sorting_field'].' '.$resultModule['default_sorting_type'];
    
    //image field name
    $imageFieldName = 'images';
    //image field name ends
    foreach ($resultModuleFields as $k => $v) {
      //image field name
      if ($v['field_type'] === 'images') {
        $imageFieldName = $v['field_name'];
      }
      //searchable
      if ($v['searchable'] == 0) {
        continue;
      }
      if ($v['field_type'] == 'double' || $v['field_type'] == 'int') {
        if (!empty($params[$v['field_name']]['min'])) {
          $value = $params[$v['field_name']]['min'];
          $searchCriteria .= ' AND a.'.$v['field_name'].' >= '.GetSQLValueString($value, 'double');
        }
        if (!empty($params[$v['field_name']]['max'])) {
          $value = $params[$v['field_name']]['max'];
          $searchCriteria .= ' AND a.'.$v['field_name'].' <= '.GetSQLValueString($value, 'double');
        }
      }//end if double or int
      
      else if ($v['field_type'] == 'addressbox' && !empty($lat) && !empty($lng)) {
        $locationBox = true;
        
        $latitude = $lat;
        $longitude = $lng;
        $orderBy = ' ORDER BY distance ASC, a.rc_created_dt DESC';
        $distanceFrom = ", (ROUND(DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.clatitude)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.clatitude)) * COS(RADIANS(".GetSQLValueString($lng, 'double')." -(a.clongitude)))))*60*1.1515,2)) as distance";
        if (empty($_GET['wholeworld'])) {
          $distanceWhere = " AND (ROUND(DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.clatitude)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.clatitude)) * COS(RADIANS(".GetSQLValueString($lng, 'double')." -(a.clongitude)))))*60*1.1515,2)) <= ".GetSQLValueString($radius, 'int');
        }
      }//end if addressbox
      
      else if ($v['field_type'] == 'selectbox') {
        if (!empty($params[$v['field_name']])) {
          $tmp = array();
          foreach ($params[$v['field_name']] as $sel => $value) {
            $tmp[] = $value;
          }
          $value = "'".implode("','", $tmp)."'";
          $searchCriteria .= ' AND a.'.$v['field_name'].' IN ('.$value.')';
        }
      }//end selectbox
      
      else if ($v['field_type'] == 'multipleselectbox') {
        $mutilselectFrom = ' LEFT JOIN auto_pre_multiselectcats as mc ON a.id = mc.id';
        if (!empty($params[$v['field_name']])) {
          $tmp = array();
          foreach ($params[$v['field_name']] as $sel => $value) {
            $tmp[] = '(mc.col_name = \''.$v['field_name'].'\' AND mc.category_id = \''.$value.'\')';
          }
          $value = implode(" OR ", $tmp);
          $searchCriteria .= ' AND ('.$value.')';
        }
      }//end if multiselectbox
      
      else if ($v['field_type'] == 'checkbox') {
        if (isset($params[$v['field_name']])) {
          $searchCriteria .= " AND a.".$v['field_name']." = ".GetSQLValueString($params[$v['field_name']], 'int');
        }
      } //end if checkbox
    }//end foreach
    $this->data['searchCriteria'] = $searchCriteria;
    
    //sorting
    if (!empty($params['sort'])) {
      $sorttype = 'ASC';
      if (!empty($params['sorttype'])) {
        $sorttype = $params['sorttype'];
      }
      $sort = $params['sort'];
      if ($sort !== 'distance') {
        $sort = 'a.'.$sort;
      }
      $orderBy = " ORDER BY $sort $sorttype";
    }
    //sorting
    $this->data['orderBy'] = $orderBy;


    $tagsTable = '';
    $tagsWhere = '';
    if (!empty($params['keyword'])) {
        $tmp = array();
        $tmp2 = array();
        foreach ($resultModuleFields as $k => $v) {
          if ($v['searchable'] == 1 && ($v['field_type'] == 'varchar' || $v['field_type'] == 'text')) {
            $tagsTable = ' LEFT JOIN auto_pre_tags as tg ON a.id = tg.id';
            $tmp[] = "a.".$v['field_name']." LIKE ".GetSQLValueString('%'.$params['keyword'].'%', 'text');
            $tmp2[] = "tg.tag = ".GetSQLValueString($params['keyword'], 'text');
          }
        }
        if (!empty($tmp)) {
          $tmp2[] = implode(' OR ', $tmp);
        }
        if (!empty($tmp2)) {
          $tagsWhere = ' AND ('.implode(' OR ', $tmp2).')';
        }
    }//end if tags
    
    $query_rsView = "SELECT a.*, u.name as fullname, u.* $distanceFrom FROM ".$this->data['tablename']." as a LEFT JOIN google_auth as u ON a.uid = u.uid $mutilselectFrom $tagsTable WHERE a.module_id = ".$module_id." $searchCriteria $distanceWhere $tagsWhere GROUP BY a.id $orderBy";
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    
    $this->data['query_limit_rsView'] = $query_limit_rsView; 
    
    $rsView = $this->fetchAll($query_limit_rsView, array(), $cacheTime);
    $this->data['result'] = $rsView;
    
    
    //getting rowCount
    $queryTotalRows = "SELECT COUNT(a.id) as cnt FROM ".$this->data['tablename']." as a LEFT JOIN google_auth as u ON a.uid = u.uid $mutilselectFrom $tagsTable WHERE a.module_id = ".$module_id." $searchCriteria $distanceWhere $tagsWhere GROUP BY a.id";
    if (isset($params['totalRows_rsView'])) {
      $totalRows_rsView = $params['totalRows_rsView'];
    } else {
      $rowCountResult = $this->fetchAll($queryTotalRows, array(), $cacheTime);
      $totalRows_rsView = count($rowCountResult);
    }
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $this->data['totalRows_rsView'] = $totalRows_rsView;
    $this->data['totalPages_rsView'] = $totalPages_rsView;
    return $this->data;
  }//end if detail


  public function save($module_id, $id='', $uid='', $post=array())
  {
    if (empty($module_id)) {
      return false;  
    }
    if (empty($uid)) {
      throw new Exception('user not logged in');
    }
    $this->data['module_id'] = $module_id;
    $this->data['id'] = $id;
    
    
    $t = (3600*24);
    $this->data['t'] = $t;
    
    $resultModule = $this->getModuleDetail($module_id);
    $resultModuleFields = $this->getFields($module_id, $resultModule['module_name']);
    
    $resultModuleFields2 = array();
    foreach ($resultModuleFields as $k => $v) {
      $resultModuleFields2[$v['field_name']] = $v;
    }
    $this->data['resultModuleFields2'] = $resultModuleFields2;
    
    if (!empty($id)) {
      $return = $this->update($module_id, $id, $uid, $post);
    } else {
      $return = $this->insert($module_id, $uid, $post);
    }
    
    $this->data['return'] = $return;
    return $this->data;
  }//end save()
  
  public function update($module_id, $id, $uid='', $post=array()) {
    $latitude = !empty($post['lat']) ? $post['lat'] : null;
    $longitude = !empty($post['lng']) ? $post['lng'] : null;
    $data = $post;
    if (isset($data['MM_Insert'])) unset($data['MM_Insert']);
    if (isset($data['MM_Update'])) unset($data['MM_Update']);
    if (isset($data['submit'])) unset($data['submit']);
    
    $data['rc_updated_dt'] = date('Y-m-d H:i:s');
    
    $data['id'] = $id;
    $data['uid'] = $uid;
    
    $data['city_id'] = !empty($post['city_id']) ? $post['city_id'] : null;
    $data['module_id'] = $module_id;
    $data['rc_updated_dt'] = date('Y-m-d H:i:s');
    if (!empty($post['lat'])) {
        $data['clatitude'] = $latitude;
        unset($data['lat']);
    }
    if (!empty($post['lng'])) {
        $data['clongitude'] = $longitude;
        unset($data['lng']);
    }
    //encryption
    foreach ($this->data['resultModuleFields'] as $k => $v) {
      if (isset($data[$v['field_name']]) && $v['encrypted'] == 1) {
        $data[$v['field_name']] = encryptText($data[$v['field_name']]);
      }
    }
    //encryption
    foreach ($post as $k => $v) {
      if (is_array($v)) {
        $post[$k] = !empty($post[$k]) ? array_filter($post[$k]) : array();
        $data[$k] = json_encode($post[$k]);
      }
    }
    
    
    $data['rc_approved'] = 0;
    if ($resultModule['approval_needed'] == 0) {
        $data['rc_approved'] = 1;
    }
    $where = sprintf('uid = %s AND id=%s', $this->qstr($uid), $this->qstr($id));
    $result = $this->updateDetails($this->data['tablename'], $data, $where);
    //tag start
    
    //deleting from tags table
    $query = "delete from auto_pre_tags where id = ".$this->qstr($id);
    $this->deleteDetails($query);
      
    if (!empty($post['tags'])) {
      $tmp = explode(',', $_POST['tags']);
      foreach ($tmp as $v) {
        $v = trim($v);
        $d = array();
        $d['id'] = $id;
        $d['tag'] = $v;
        $d['module_id'] = $module_id;
        $this->addDetails('auto_pre_tags', $d);
      }
    }
    //tag ends
    //multiselect
    foreach ($this->data['resultModuleFields'] as $k => $v) {
      if ($v['field_type'] === 'multipleselectbox') {
        //deleting from multiselect category table
        $query = "delete from auto_pre_multiselectcats where id = ".$modelGeneral->qstr($id);
        $this->deleteDetails($query);
        //adding category
        if (!empty($post[$v['field_name']])) {
          foreach ($post[$v['field_name']] as $v1) {
            $v1 = trim($v1);
            $d = array();
            $d['id'] = $id;
            $d['category_id'] = $v1;
            $d['col_name'] = $v['field_name'];
            $d['module_id'] = $module_id;
            $this->addDetails('auto_pre_multiselectcats', $d);
          }
        }
      }
    }
    //multiselect
    return $data;
  }//end update()
  
  public function insert($module_id, $uid='', $post=array()) {
    $latitude = !empty($post['lat']) ? $post['lat'] : null;
    $longitude = !empty($post['lng']) ? $post['lng'] : null;
    $data = $post;
    if (isset($data['MM_Insert'])) unset($data['MM_Insert']);
    if (isset($data['MM_Update'])) unset($data['MM_Update']);
    if (isset($data['submit'])) unset($data['submit']);
    
    $data['id'] = guid();
    $data['uid'] = $uid;
    
    $data['city_id'] = !empty($post['city_id']) ? $post['city_id'] : null;
    $data['module_id'] = $module_id;
    $data['rc_created_dt'] = date('Y-m-d H:i:s');
    $data['rc_updated_dt'] = date('Y-m-d H:i:s');
    if (!empty($post['lat'])) {
        $data['clatitude'] = $latitude;
        unset($data['lat']);
    }
    if (!empty($post['lng'])) {
        $data['clongitude'] = $longitude;
        unset($data['lng']);
    }
    //encryption
    foreach ($this->data['resultModuleFields'] as $k => $v) {

      //if field is not show then calculate on bases of default value
      if ($v['field_type'] == 'noshow') {
        if (empty($data[$v['field_name']])) {
          if ($v['field_default_value'] === 'current_date_time') {
            $data[$v['field_name']] = date('Y-m-d H:i:s');
          }
        }
      }

      if (isset($data[$v['field_name']]) && $v['encrypted'] == 1) {
        $data[$v['field_name']] = encryptText($data[$v['field_name']]);
      }
    }
    //encryption
    foreach ($post as $k => $v) {
      if (is_array($v)) {
        $post[$k] = !empty($post[$k]) ? array_filter($post[$k]) : array();
        $data[$k] = json_encode($post[$k]);
      }
    }
    if ($approved == 1) {
      $data['rc_approved'] = 1;
    } else {
      $data['rc_approved'] = 0;
      if ($resultModule['paid_module'] == 1 && $resultModule['paid_posting'] == 1) {
          $data['rc_approved'] = 0;
      } else {
        if ($resultModule['approval_needed'] == 0) {
            $data['rc_approved'] = 1;
        }
      }
    }
    
    $result = $this->addDetails($this->data['tablename'], $data);
    //tag start
    if (!empty($post['title'])) {
      $tmp1 = !empty($post['tags']) ? explode(',', $post['tags']) : array();
      $tmp2 = explode(' ', $post['title']);
      $tmp = array_merge($tmp1, $tmp2);
      $tmp = array_unique($tmp);
      foreach ($tmp as $v) {
        $v = trim($v);
        $d = array();
        $d['id'] = $data['id'];
        $d['tag'] = $v;
        $d['module_id'] = $module_id;
        $this->addDetails('auto_pre_tags', $d);
      }
    }
    //tag ends
    //multiselect
    foreach ($this->data['resultModuleFields'] as $k => $v) {
      if ($v['field_type'] === 'multipleselectbox') {
        //adding category
        if (!empty($post[$v['field_name']])) {
          foreach ($post[$v['field_name']] as $v1) {
            $v1 = trim($v1);
            $d = array();
            $d['id'] = $data['id'];
            $d['category_id'] = $v1;
            $d['col_name'] = $v['field_name'];
            $d['module_id'] = $module_id;
            $this->addDetails('auto_pre_multiselectcats', $d);
          }
        }
      }
    }
    //multiselect
    return $data;
  }//end insert()
}