<?php
class classes_home extends classes_base
{
  public function __construct($params=null)
  {
    if (!empty($params['host']) && !empty($params['dirname'])) {
      if (!file_exists($params['dirname'].'classes/'.$params['host'].'/config.php')) {
        return; 
      }//end if
      include_once($params['dirname'].'classes/'.$params['host'].'/config.php');
      $config = new Config();
      $params['meta'] = $config->config;
    }
    $this->setParams($params);
  }

}//end class