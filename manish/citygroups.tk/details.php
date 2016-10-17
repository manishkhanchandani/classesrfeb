<?php 
log_log(__FILE__.' on line number '.__LINE__);
if (empty($_GET['id'])) {
  header("Location: /");
  exit;  
}

$Groups = new Groups();
$id = md5($_GET['id']);

$groupData = $Groups->detail($id);
$projectTitle = $groupData['name'];
$members = $Groups->detailMembers($id);
pr($_GET);
pr($groupData);
pr($members);
?>
<div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
      </div>