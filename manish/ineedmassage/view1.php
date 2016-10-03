
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="details/<?php echo $v['id']; ?>">
          <img class="img-thumbnail img-responsive" src="<?php echo $mainImage; ?>" alt="...">
      </a>
  </div>
  <div class="col-md-5 col-xs-5 col-lg-5 col-sm-5">
    <h4 class="media-heading"><a href="details/<?php echo $v['id']; ?>"><?php echo $v['name']; ?></a></h4>
      <p><?php echo $v['description']; ?></p>
      <p><small><?php echo $v['location']; ?>
        <?php if (!empty($v['distance'])) { ?>
      <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?></small></p>
      <p><small><b>Massage Types:</b> 
        <?php foreach ($massageTypes as $key => $types) { 
          if (empty($v[$key])) continue;
          echo $types['name'].', ';
        } ?>
      </small></p>
      <?php echo editDeleteLink((!empty($_SESSION['user']['id']) ? $_SESSION['user']['uid']: ''), $v['uid'], $v['id'], (!empty($_SESSION['user']['is_admin']) ? $_SESSION['user']['is_admin'] : '')); ?>
  </div>
  <div class="col-md-4 col-xs-4 col-lg-4 col-sm-4">
      <?php if (!empty($v['min30_charges'])) { ?>
      <span class="chargeHead">30 Min Charges:</span>  <span class="" style="text-decoration:line-through">$<?php echo $v['min30_charges']; ?></span> <span class="">$<?php echo $v['min30_charges'] - ($v['min30_charges'] / $v['discount_perc']); ?></span><br>
      <?php } ?>
      <?php if (!empty($v['min60_charges'])) { ?>
      <span class="chargeHead">60 Min Charges:</span> <span class="" style="text-decoration:line-through">$<?php echo $v['min60_charges']; ?></span> <span class="">$<?php echo $v['min60_charges'] - ($v['min60_charges'] / $v['discount_perc']); ?></span><br>
      <?php } ?>
      <?php if (!empty($v['min90_charges'])) { ?>
      <span class="chargeHead">90 Min Charges:</span> <span class="" style="text-decoration:line-through">$<?php echo $v['min90_charges']; ?></span> <span class="">$<?php echo $v['min90_charges'] - ($v['min90_charges'] / $v['discount_perc']); ?></span><br>
      <?php } ?>
      <?php if (!empty($v['min120_charges'])) { ?>
      <span class="chargeHead">120 Min Charges:</span> <span class="" style="text-decoration:line-through">$<?php echo $v['min120_charges']; ?></span> <span class="">$<?php echo $v['min120_charges'] - ($v['min120_charges'] / $v['discount_perc']); ?></span><br>
      <?php } ?>
  </div>