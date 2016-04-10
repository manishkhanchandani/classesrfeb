<?php
class classes_base
{
  protected $params = array();
  
  public function setParams($value=null, $key=null)
  {
    if (empty($key)) {
      if (is_array($value)) {
        $this->params = array_merge($this->params, $value);
        return true;
      }
      return false; 
    }
    $this->params[$key] = $value;
    return true;
  }//end setTitle
  
  public function getParams($key=null)
  {
    if (empty($key)) return $this->params;
    return $this->params[$key];
  }//end getTitle
}