<?php
/*urls
http://core.mkgalaxy.com/projects/classesrfeb/manish/auto/new?module_id=34
*/
$auto = new Models_Auto($connMainAdodb);
if (empty($_GET['module_id'])) {
  throw new Exception('Incorrect Module');
}
//get id to update
$id = isset($_GET['id']) ? $_GET['id'] : null;

$uid = '112913147917981568678';
/*$id = '0B1BB02F-124F-E390-1E36-49CFA274B2DB';
$_POST['tags'] = 'test tag 1, test tag 2';
$_POST['title'] = 'Test2';
$_POST['description'] = 'Test2';
$_POST['videos'] = array('test video2', 'test video 3', '');
$_POST['images'] = array('test video4', 'test video 5', '');
$_POST['urls'] = array('test video6', 'test video 7', '');
$_POST['MM_Update'] = 'form1';
$_POST['submit'] = 'Update Record';*/
$data = $auto->save($_GET['module_id'], $id, $uid, $_POST);
$result['data'] = $data['return'];
$result['meta'] = $data;
?>