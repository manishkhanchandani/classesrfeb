<?php
class repertory_Complete
{
  public $chain = array();
  
  public function getAll($Models_General, $max=100, $start=0, $cacheTime=0)
  {
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $start;
    $pageNum_rsView = floor($startRow_rsView / $maxRows_rsView);
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $query_rsView = 'select * from consultl_homeopathy.complete_repertory order by id DESC';
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $Models_General->fetchAll($query_limit_rsView, array(), $cacheTime);
    if (!empty($results)) {
      foreach ($results as $k => $v) {
        if (!empty($v['remedies'])) {
          $results[$k]['remedies'] = json_decode($v['remedies'], 1);  
        }
      }
    }
    $sql1 = $Models_General->sql;
    $return['sql1'] = $sql1;
    $queryTotalRows = 'select count(*) as cnt from consultl_homeopathy.complete_repertory order by id DESC';
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = (int) $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['sql2'] = $sql2;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    $return['results'] = $results;
    return $return;
  }
  
  
  public function getAllSearch($Models_General, $keyword, $max=100, $page=0, $cacheTime=0)
  {
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $page * $maxRows_rsView;
    $pageNum_rsView = $page;
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $query_rsView = sprintf('select * from consultl_homeopathy.complete_repertory WHERE path LIKE %s AND remedies is NOT NULL order by path ASC', GetSQLValueString('%'.$keyword.'%', 'text'));
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $Models_General->fetchAll($query_limit_rsView, array(), $cacheTime);
    if (!empty($results)) {
      foreach ($results as $k => $v) {
        if (!empty($v['remedies'])) {
          $results[$k]['remedies'] = json_decode($v['remedies'], 1);  
        }
      }
    }
    $sql1 = $Models_General->sql;
    $return['sql1'] = $sql1;
    $queryTotalRows = sprintf('select count(*) as cnt from consultl_homeopathy.complete_repertory WHERE path LIKE %s AND remedies is NOT NULL', GetSQLValueString('%'.$keyword.'%', 'text'));
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = (int) $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['sql2'] = $sql2;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    $return['results'] = $results;
    return $return;
  }
  
  
  
  
}//end class