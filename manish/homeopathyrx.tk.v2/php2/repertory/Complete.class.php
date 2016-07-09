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
    $return['cacheTime'] = $cacheTime;
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
    $return['cacheTime'] = $cacheTime;
    //search term
    $tmp = array();
    $tmp['search_term'] = $keyword;
    $tmp['search_ip'] = $_SERVER['REMOTE_ADDR'];
    $Models_General->addDetails('consultl_homeopathy.search_terms', $tmp);
    //search term ends here
    $keyword = urldecode($keyword);
    $tmp = explode(' ', $keyword);
    $string = '';
    foreach ($tmp as $v) {
      $string .= ' AND path like '.GetSQLValueString('%'.trim($v).'%', 'text');
    }
    $query_rsView = 'select * from consultl_homeopathy.complete_repertory WHERE remedies is NOT NULL '.$string.' order by path ASC';
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
    $queryTotalRows = 'select count(*) as cnt from consultl_homeopathy.complete_repertory WHERE remedies is NOT NULL '.$string;
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
  
  
  public function browseByChapter($Models_General, $chapter, $max=100, $page=0, $cacheTime=0)
  {
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $page * $maxRows_rsView;
    $pageNum_rsView = $page;
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $return['cacheTime'] = $cacheTime;
    
    $query_rsView = sprintf('select * from consultl_homeopathy.complete_repertory WHERE remedies is NOT NULL AND chapter = %s order by path ASC', GetSQLValueString($chapter, 'int'));
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
    $queryTotalRows = sprintf('select count(*) as cnt from consultl_homeopathy.complete_repertory WHERE remedies is NOT NULL AND chapter = %s', GetSQLValueString($chapter, 'int'));
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