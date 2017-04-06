<?php

$pageTitle = "Communities";

function getApprovedCommunityFromFb($firebase, $defaultFirebasePath)
{
  $p = '/community/approved';
  $retJson = $firebase->get($defaultFirebasePath . $p);
  $return = json_decode($retJson, true);
  
  return $return;
}

$records = getApprovedCommunityFromFb($firebase, $defaultFirebasePath);
?>

<form action="" method="get" name="form1">
    <div class="form-group">
        <input type="text" class="form-control" name="name" id="name" placeholder="Enter community name">
    </div>
    <button type="submit" class="btn btn-primary form-control">Search</button>
</form>

<?php if (!empty($records)) { ?>
<?php foreach ($records as $id => $result) { ?>
<?php
  $img = $result['image'];
  if (empty($img)) {
    $img = DEFAULT_IMAGE;
  }
?>
<div class="col-md-4">
  
  <div class="media">
    <div class="media-left text-center" >
        <a href="" target="_blank">
            <img class="media-object img-responsive img-thumbnail" style="max-width: 200px;" src="<?php echo $img; ?>" alt="...">
        </a>
        <h4 class="media-heading"><?php echo $result['name']; ?></h4>
    </div>
  </div>
</div>
<?php } ?>
<?php } ?>