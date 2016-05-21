<?php
class repertory_Kent
{
  public $chain = array();
  
  public function getAll($Models_General, $chapter='', $max=100, $start=0, $cacheTime=0)
  {
    $return = array();
    $maxRows_rsView = (int) $max;
    $startRow_rsView = (int) $start;
    $pageNum_rsView = floor($startRow_rsView / $maxRows_rsView);
    $return['max'] = $maxRows_rsView;
    $return['page'] = $pageNum_rsView;
    $return['start'] = $startRow_rsView;
    $query_rsView = sprintf('select * from hom_kent_repertory where chapter = %s order by id', GetSQLValueString($chapter, 'int'));
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $Models_General->fetchAll($query_limit_rsView, array(), $cacheTime);
    if (!empty($results)) {
      foreach ($results as $k => $v) {
        if (!empty($v['remedies'])) {
          $results[$k]['remedies'] = json_decode($v['remedies'], 1);  
        }
        if (!empty($v['chain'])) {
          $results[$k]['chain'] = json_decode($v['chain'], 1);  
        }
        if (!empty($v['reference'])) {
          $results[$k]['reference'] = json_decode($v['reference'], 1);  
        }
      }
    }
    $sql1 = $Models_General->sql;
    $return['sql1'] = $sql1;
    $queryTotalRows = sprintf('select count(*) as cnt from hom_kent_repertory where chapter = %s', GetSQLValueString($chapter, 'int'));
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
  
  public function deleteRecord($Models_General, $id)
  {
    $q = 'delete from hom_kent_repertory WHERE id = ?';
    $res = $Models_General->deleteDetails($q, array($id));
    $query_rsView = 'select * from hom_kent_repertory where parent_id = ?';
    $results = $Models_General->fetchAll($query_rsView, array($id), 0);
    if (!empty($results)) {
      foreach ($results as $result) {
        $this->deleteRecord($Models_General, $result['id']);
      }
    }
  }//end deleteRecord
  
  
  public function createChain($Models_General, $id)
  {
    if ($id == 0) return;
    $q = 'select * from hom_kent_repertory WHERE id = ?';
    $rec = $Models_General->fetchRow($q, array($id), 0);
    $this->chain[] = array('symptom' => $rec['symptom'], 'id' => $rec['id'], 'parent_id' => $rec['parent_id']); 
    $this->createChain($Models_General, $rec['parent_id'], $chain);
  }//end deleteRecord
  
}//end class