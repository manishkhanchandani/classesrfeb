<?php 
log_log(__FILE__.' on line number '.__LINE__);
if (empty($_GET['id'])) {
  header("Location: /");
  exit;  
}
$id = $_GET['id'];
$query = "select * from massage WHERE id = ?";
$data = $modelGeneral->fetchRow($query, array($id), 0);
pr($data);
pr($_GET);
?>
<div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
      </div>