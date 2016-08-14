<?php
class repertory_Complete
{
  
  public static $tableCompleteRepertory = 'consultl_homeopathy.complete_repertory';

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
    $query_rsView = 'select * from '.self::$tableCompleteRepertory.' order by updated_dt DESC';
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
    $queryTotalRows = 'select count(*) as cnt from '.self::$tableCompleteRepertory.' order by id DESC';
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
  
  public function formatData($results)
  {
    if (empty($results)) {
      return $results;  
    }
    
    $results2 = array();
    foreach ($results as $k => $v) {
      $results2[ucwords($v['bpath'])][] = $v;
    }
    
    return $results2;
  }//end formatData
  
  
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
      $string .= ' AND a.path like '.GetSQLValueString('%'.trim($v).'%', 'text');
    }
    $query_rsView = 'select a.*, b.id as bid, b.path as bpath from '.self::$tableCompleteRepertory.' as a LEFT JOIN '.self::$tableCompleteRepertory.' as b ON a.chapter = b.id WHERE a.remedies is NOT NULL '.$string.' order by b.id, a.path ASC';
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
    $queryTotalRows = 'select count(*) as cnt from '.self::$tableCompleteRepertory.' as a LEFT JOIN '.self::$tableCompleteRepertory.' as b ON a.chapter = b.id WHERE a.remedies is NOT NULL '.$string;
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = (int) $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['sql2'] = $sql2;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    //$return['results'] = $results;
    $return['resultsGroup'] = $this->formatData($results);
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
    
    $query_rsView = sprintf('select a.*, b.id as bid, b.path as bpath from '.self::$tableCompleteRepertory.' as a LEFT JOIN '.self::$tableCompleteRepertory.' as b ON a.chapter = b.id WHERE a.remedies is NOT NULL AND a.chapter = %s order by path ASC', GetSQLValueString($chapter, 'int'));
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
    $queryTotalRows = sprintf('select count(*) as cnt from '.self::$tableCompleteRepertory.' as a LEFT JOIN '.self::$tableCompleteRepertory.' as b ON a.chapter = b.id WHERE a.remedies is NOT NULL AND a.chapter = %s', GetSQLValueString($chapter, 'int'));
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = (int) $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['sql2'] = $sql2;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    //$return['results'] = $results;
    $return['resultsGroup'] = $this->formatData($results);
    return $return;
  }
  
  
  
  
}//end class