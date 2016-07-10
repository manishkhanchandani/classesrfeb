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

}