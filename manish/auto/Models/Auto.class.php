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

}