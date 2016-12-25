<div class="row" style="padding-bottom:20px">
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="/<?php echo $v['url']; ?>/events/<?php echo $v['event_id']; ?>/detail">
          <img class="img-thumbnail img-responsive" src="<?php echo $eventMainImage; ?>" alt="...">
      </a>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
    <h4 class="media-heading"><a href="/<?php echo $v['url']; ?>/events/<?php echo $v['event_id']; ?>/detail"><?php echo $v['event_title']; ?></a></h4>
      <p><small>Group: <a href="/<?php echo $v['url']; ?>/details"><?php echo $v['name']; ?> Group</a><br><?php echo $v['event_location']; ?>
        <?php if (!empty($v['distance'])) { ?>
        <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?>
        <br><strong>Event Members:</strong> <?php echo $v['members']; ?>
        </small></p>
        
        
      
  </div>
  
</div>
<!-- particular record
<?php pr($v); ?>
 -->
