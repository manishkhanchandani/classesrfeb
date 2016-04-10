<?php
class classes_modules_lessons
{
   public $data;
   public $firebase;
   public function __construct($arr=array(), $params=array())
   {
      $this->firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
      $page = $arr[2];
      $pages = array('detail');
      $return = array();
      if (in_array($page, $pages)) {
        $return = $this->$page($arr, $params);
      }
      
      $this->data = $return;
   }
   
   public function detail($arr, $params)
   {
     if (empty($arr[3])) {
        return false; 
     }
     $id = $arr[3];
     $d = $this->firebase->get('/lessons/tutors/records/'.$id);
     $details = json_decode($d, 1);
     
     $mainImage = '';
      if (!empty($details['details']['defaultImage'])) $mainImage = $details['details']['defaultImage'];
      else if ($details['details']['images']) {
        foreach ($details['details']['images'] as $key => $value) {
          if (!empty($mainImage)) break;
          $mainImage = $value;
        };
      } else if ($details['details']['profileImage']) {
        $mainImage = $details['details']['profileImage'];
      } else {
        $mainImage = 'images/noimage.jpg';  
      }
      ob_start();
      include($params['dirname'].'pages/lessons/detail.php');
      $result = ob_get_clean();
      $details['result'] = $result;
      
      return $details;
   }
}
?>