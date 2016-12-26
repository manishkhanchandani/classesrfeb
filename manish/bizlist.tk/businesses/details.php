<?php 
if (empty($_GET['id'])) {
  header("Location: /");
  ext;
}

$googleUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='.$_GET['id'].'&key='.PLACESAPIKEY;



$Biz = new Biz();

$rs = $Biz->detailBiz($_GET['id'], 900);

if (empty($rs['details']) && !empty($rs['place_id'])) {
  echo $googleUrl;
  
  $res = curlget($googleUrl);
  $d = array();
  $d['details'] = $res;

  $where = sprintf('place_id = %s', $modelGeneral->qstr($rs['place_id']));
  $modelGeneral->updateDetails('bizlist_business', $d, $where);
  
  $query = "select * from bizlist_business as m WHERE m.place_id = ? or m.id = ?";
  $modelGeneral->clearCache($query, array($rs['place_id'], $rs['place_id']));
  $rs = $Biz->detailBiz($_GET['id'], 900);
}

$mainImage = imgUrl($rs['data']['photos'][0]['photo_reference'], $rs['id']);
if (empty($mainImage)) $mainImage = !empty($rs['data']['icon']) ? $rs['data']['icon'] : DEFAULT_IMAGE;

?>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1><?php echo $rs['name']; ?></h1>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3">
      <img src="<?php echo $mainImage; ?>" class="img-responsive" />
    </div>
    <div class="col-md-6">
      <div>
        <strong>Location:</strong> <a href=""><?php echo $rs['details']['result']['formatted_address']; ?></a>
      </div>
      <div>
        <strong>Latitude:</strong> <?php echo $rs['lat']; ?>
      </div>
      <div>
        <strong>Longitude:</strong> <?php echo $rs['lng']; ?>
      </div>
      <div>
        <strong>Phone:</strong> <a href="tel:?php echo $rs['details']['result']['international_phone_number']; ?>"><?php echo $rs['details']['result']['international_phone_number']; ?></a>
      </div>
      <?php if (!empty($rs['details']['result']['opening_hours']['weekday_text'])) { ?>
      <div>
        <br>
         <strong>Opening Hours</strong><br>
        <?php foreach($rs['details']['result']['opening_hours']['weekday_text'] as $v) {
        ?>
          <?php echo $v; ?><br>
        <?php
        } ?>
        <br>
      </div>
      <?php } ?>
      <?php if (!empty($rs['details']['result']['rating'])) { ?>
      <div>
        <strong>Rating:</strong> <?php echo $rs['details']['result']['rating']; ?>
        <br>
      </div>
      <?php } ?>
      <?php if (!empty($rs['details']['result']['reviews'])) { ?>
      <div>
         <strong>Reviews</strong><br>
         <ul>
        <?php foreach($rs['details']['result']['reviews'] as $v) {
          if ($v['rating'] < 4) continue;
        ?>
          <li><strong><?php echo $v['author_name']; ?></strong> (Rating: <?php echo $v['rating']; ?>) <?php echo $v['text']; ?></li>
        <?php
        } ?>
        </ul>
        <br>
      </div>
      <?php } ?>
    </div>
    <div class="col-md-3">
      
    </div>
  </div>
</div>
<?php

//pr($rs);
?>