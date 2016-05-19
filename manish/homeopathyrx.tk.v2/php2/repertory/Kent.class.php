<?php
class repertory_Kent
{
  public function getAll($Models_General, $chapter='', $max=100, $page=0, $cacheTime=0)
  {
    $return = array();
    $maxRows_rsView = (int) $max;
    $pageNum_rsView = (int) $page;
    $startRow_rsView = $pageNum_rsView * $maxRows_rsView;
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $query_rsView = sprintf('select * from hom_kent_repertory where chapter = %s', GetSQLValueString($chapter, 'int'));
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
    $queryTotalRows = sprintf('select count(*) as cnt from hom_kent_repertory where chapter = %s', GetSQLValueString($chapter, 'int'));
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return['sql2'] = $sql2;
    $return['totalRows'] = $totalRows_rsView;
    $return['totalPages'] = $totalPages_rsView;
    $return['results'] = $results;
    return $return;
  }
}//end class