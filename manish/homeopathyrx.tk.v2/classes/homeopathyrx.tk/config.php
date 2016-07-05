<?php
class Config
{
  public $config;
  
  public function __construct()
  {
    $this->config = array(
      'title' => 'HomeopathyRx',
      'description' => 'Welcome to world of homeopathy',
      'img' => 'http://homeopathyrx.tk/images/main.jpg'
    );
  }
}