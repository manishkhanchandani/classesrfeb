<?php


if (empty($_GET['id'])) {
  header("Location: home");
  exit;
}

$p = '/users/'.$_GET['id'];
$d1 = $firebase->get($defaultFirebasePath . $p);

if (empty($d1)) {
  header("Location: home");
  exit;
}

$details = json_decode($d1, true);
$v = !empty($details['profile']) ? $details['profile'] : '';
$address = !empty($details['profile']['address']) ? json_decode($details['profile']['address'], true) : '';

$images = json_decode($v['images'], true); 
$videos = json_decode($v['videos'], true); 
$urls = json_decode($v['urls'], true); 
$mainImage = !empty($details['photoURL']) ? $details['photoURL'] : DEFAULT_IMAGE;

$v['created'] = date('Y-m-d', $details['created_dt']/1000);

$title = !empty($v['title']) ? $v['title'] : $details['displayName'];
$location = !empty($address['sn']['city']) ? $address['sn']['city'].', '.$address['sn']['state'].', '.$address['sn']['country'].' ('.$address['sn']['county'].')' : '';
if (empty($location) && !empty($details['ipDetails'])) {
  $location = $details['ipDetails']['city'].', '.$details['ipDetails']['region'].', '.$details['ipDetails']['country'];
}
?>

<div class="row" style="padding-bottom:20px">
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="g/details?id=<?php echo $v['uid']; ?>">
          <img class="img-thumbnail img-responsive" src="<?php echo $mainImage; ?>" alt="...">
      </a>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
    <h4 class="media-heading"><a href="g/details?id=<?php echo $v['uid']; ?>"><?php echo $title; ?></a></h4>
      <p><small>
        <br><strong>Location:</strong> <?php echo $location; ?>
        <br><?php if (!empty($v['nature'])) { echo $siteConfig['nature'][$v['nature']]; } ?> 
        <?php if (!empty($v['birth_year'])) { echo yearToAge($v['birth_year']).' years'; } ?>
        <?php if (!empty($v['height'])) { echo '<b>Ht</b>: '.$siteConfig['height'][$v['height']]; } ?> 
        <?php if (!empty($v['weight'])) { echo '<b>Wt</b>: '.$siteConfig['weight'][$v['weight']]; } ?>
        <?php if (!empty($v['distance'])) { ?>
        <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?> 
        <br><strong>Created:</strong> <?php echo $v['created']; ?>

        </small></p>


  </div>

</div>
<?php /*echo pr($_GET);
pr($details);
pr($address);
pr($v);*/?>
