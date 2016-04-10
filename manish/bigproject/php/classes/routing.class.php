<?php
class classes_routing extends classes_base
{
  public $returnData;
  public function __construct($params=null)
  {
    $arr = $params['arr'];
    $path = $arr[1];
    if (!file_exists($params['dirname'].'classes/modules/'.$path.'.class.php')) {
      return;
    }
    $classFile = 'classes_modules_'.$path;
    $class = new $classFile($arr, $params);
    $this->returnData = $class->data;
  }

}//end class