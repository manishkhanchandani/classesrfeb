<?php
$pageTitle = "Pending New Communities";
if (empty($_COOKIE['uid'])) {
  header("Location: home");
  exit;
}

define('CURRENTPAGE', HTTPPATH.'l/admin/newCommunity');


function saveApprovedCommunityToFb($firebase, $defaultFirebasePath, $id, $uid, $nodesArray)
{
  $arr = $nodesArray;
  $p = '/community/approved/'.$id;
  $firebase->update($defaultFirebasePath . $p, $arr);
  
  $p = '/community/users/approved/'.$uid.'/'.$id;
  $firebase->set($defaultFirebasePath . $p, 1);
}


function getPendingCommunityFromFb($firebase, $defaultFirebasePath)
{
  $p = '/community/pending/';
  $retJson = $firebase->get($defaultFirebasePath . $p);
  $return = json_decode($retJson, true);
  
  return $return;
}


function deleteCommunityFromFb($firebase, $defaultFirebasePath, $id, $uid)
{
  if (empty($id)) {
    return false;
  }
  if (empty($uid)) {
    return false;
  }
  $p = '/community/pending/'.$id;
  $firebase->delete($defaultFirebasePath . $p);
  
  $p = '/community/users/pending/'.$_COOKIE['uid'].'/'.$id;
  $firebase->delete($defaultFirebasePath . $p);
  
  return true;
}


function moveCommunityFromFb($firebase, $defaultFirebasePath, $id, $uid)
{
  if (empty($id)) {
    return false;
  }
  if (empty($uid)) {
    return false;
  }
  
  $p = '/community/pending/'.$id;
  $retJson = $firebase->get($defaultFirebasePath . $p);
  $return = json_decode($retJson, true);
  
  saveApprovedCommunityToFb($firebase, $defaultFirebasePath, $id, $uid, $return);
  deleteCommunityFromFb($firebase, $defaultFirebasePath, $id, $uid);
  
  return true;
}

if (!empty($_GET['delete']) && isset($_GET['id']) && isset($_GET['uid'])) {
  deleteCommunityFromFb($firebase, $defaultFirebasePath, $_GET['id'], $_GET['uid']);
  header("Location: ".CURRENTPAGE);
  exit;
}


if (!empty($_GET['approve']) && isset($_GET['id']) && isset($_GET['uid'])) {
  moveCommunityFromFb($firebase, $defaultFirebasePath, $_GET['id'], $_GET['uid']);
  header("Location: ".CURRENTPAGE);
  exit;
}

$records = getPendingCommunityFromFb($firebase, $defaultFirebasePath);

?>
<?php if (!empty($records)) { ?>
<?php foreach ($records as $id => $result) { ?>

<div class="media">
  <div class="media-left">
      <a href="<?php echo $result['image']; ?>" target="_blank">
          <img class="media-object img-responsive img-thumbnail" style="max-width: 200px;" src="<?php echo $result['image']; ?>" alt="...">
      </a>
  </div>
  <div class="media-body">
      <h4 class="media-heading"><?php echo $result['name']; ?></h4>
      <p><?php echo $result['description']; ?></p>
      <p>Created by "<?php echo $result['uid']; ?>"</p>
      <p>Created On <?php echo $result['created_dt']; ?></p>
      <p><a href="<?php echo CURRENTPAGE; ?>?delete=1&id=<?php echo $id; ?>&uid=<?php echo $result['uid']; ?>">Delete This Community</a> | <a href="<?php echo CURRENTPAGE; ?>?approve=1&id=<?php echo $id; ?>&uid=<?php echo $result['uid']; ?>">Approve</a></p>
  </div>
</div>
<?php } ?>
<?php } else { ?>
<div class="alert alert-danger" role="alert">
No pending community found.
</div>
<?php } ?>
