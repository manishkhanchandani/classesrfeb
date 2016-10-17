<div class="row" style="padding-bottom:20px">
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="<?php echo $v['url']; ?>/details">
          <img class="img-thumbnail img-responsive" src="<?php echo $mainImage; ?>" alt="...">
      </a>
  </div>
  <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9">
    <h4 class="media-heading"><a href="<?php echo $v['url']; ?>/details"><?php echo $v['name']; ?> Group</a></h4>
      <p><small><?php echo $v['location']; ?>
        <?php if (!empty($v['distance'])) { ?>
        <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?>
        <br><strong>Members:</strong> <?php echo $v['members']; ?>
        </small></p>
        
        <?php echo $Groups->editDeleteLink((!empty($_SESSION['user']['id']) ? $_SESSION['user']['uid']: ''), $v['uid'], $v['id'], (!empty($_SESSION['user']['is_admin']) ? $_SESSION['user']['is_admin'] : '')); ?>
      
  </div>
  
</div>
