<?php
class classes_routing extends classes_base
{
  public $returnData;
  public function __construct($params=null)
  {
    return;
    $arr = $params['arr'];
    $path = $arr[1];
    $classFile = 'classes_modules_'.$path;
    $class = new $classFile($arr, $params);
    $this->returnData = $class->data;
  }

}//end class