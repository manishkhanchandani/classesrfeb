<?php $url = url_name_v2($v['name']).':'.$v['place_id']; ?>
<div class="row" style="padding-bottom:20px">
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="<?php echo url_name_v2($v['name']); ?>/<?php echo $v['place_id']; ?>/details">
          <img class="img-thumbnail img-responsive" src="<?php echo $mainImage; ?>" alt="...">
      </a>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
    <h4 class="media-heading"><a href="<?php echo url_name_v2($v['name']); ?>/<?php echo $v['place_id']; ?>/details"><?php echo $v['name']; ?></a></h4>
      <p><small><?php echo $v['data']['vicinity']; ?>
        <?php if (!empty($v['distance'])) { ?>
        <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?>
        <br>
        <strong>Category:</strong> <?php echo ucwords($v['data']['types'][0]); ?>
        <?php if (!empty($v['active_coupons'])) { ?>
          <br /><strong>Coupons Available!!</strong>
        <?php } ?>
        </small></p>
  </div>
  
</div>
