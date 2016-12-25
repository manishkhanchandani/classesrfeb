
  <div class="col-md-3 col-xs-3 col-lg-3 col-sm-3">
      <a href="details/<?php echo $v['id']; ?>">
          <img class="img-thumbnail img-responsive" src="<?php echo $mainImage; ?>" alt="...">
      </a>
      <br>
      <div align="center">
        <a href="details/<?php echo $v['id']; ?>"><?php echo $v['name']; ?></a><br>
        <small><?php echo $v['location']; ?>
        <?php if (!empty($v['distance'])) { ?>
        <br><strong>Distance:</strong> <?php echo $v['distance']; ?> mi
        <?php } ?></small>
        <?php echo $Groups->editDeleteLink((!empty($_SESSION['user']['id']) ? $_SESSION['user']['id'] : ''), $v['uid'], $v['id'], (!empty($_SESSION['user']['is_admin']) ? $_SESSION['user']['is_admin'] : '')); ?>
      </div>
  </div>
