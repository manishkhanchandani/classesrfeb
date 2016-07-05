<?php
class classes_modules_learn
{
   public $data;
   public $firebase;
   public function __construct($arr=array(), $params=array())
   {
      $page = $arr[2];
      $pages = array('detail');
      $return = array();
      $return = $this->detail($arr, $params);
      
      $this->data = $return;
   }
   
   public function detail($arr, $params)
   {
     if (!file_exists($params['dirname'].'modules/learn/files/'.$arr[2].'.html')) {
      return array();  
     }
      $content = file_get_contents($params['dirname'].'modules/learn/files/'.$arr[2].'.html');
      $details['content'] = $content;
      
      $matches = regexp($content, '<h1>(.*)<\/h1>');
      $details['title'] = $matches[0][1];
      
      return $details;
   }
}
?>