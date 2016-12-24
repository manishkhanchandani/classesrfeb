<?php

$Groups = new Groups();
$id = md5($_GET['id']);

$groupData = $Groups->detail($id);
$groupTitle = $groupData['name'];
$myMembership = null;
if (!empty($_SESSION['user'])) {
  $myMembership = $Groups->myGroupMemberShip($id, $_SESSION['user']['id']);
}
$memberCount = $Groups->countMembers($id);


$mainImg = 'https://noblehour.com/public/layouts/images/group-default-logo.png';
$images = json_decode($groupData['images'], true);

if (!empty($images[0])) {
  $mainImg = $images[0];
}

?>