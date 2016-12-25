<!--<div class="row">
        <div class="col-md-12">
          <hr>
          <div class="">
          <p class="text-center"> Records <strong><?php echo ($return['start'] + 1) ?></strong> to <strong><?php echo min($return['start'] + $return['max'], $return['totalRows']) ?></strong> of <strong><?php echo $return['totalRows'] ?></strong></p>
          <nav>
            <ul class="pager">
              <?php if ($pageNum_rsView > 0) { ?><li><a href="<?php printf("?pageNum_rsView=%d%s", 0, $queryString); ?>" style="cursor:pointer">First</a></li><?php } ?>
              <?php if ($pageNum_rsView > 0) { ?><li><a href="<?php printf("?pageNum_rsView=%d%s", max(0, $pageNum_rsView - 1), $queryString); ?>" style="cursor:pointer">Previous</a></li><?php } ?>
              <?php if ($pageNum_rsView < $totalPages_rsView) { ?><li><a href="<?php printf("?pageNum_rsView=%d%s", min($totalPages_rsView, $pageNum_rsView + 1), $queryString); ?>" style="cursor:pointer">Next</a></li><?php } ?>
              <?php if ($pageNum_rsView < $totalPages_rsView) { ?><li><a href="<?php printf("?pageNum_rsView=%d%s", $totalPages_rsView, $queryString); ?>" style="cursor:pointer">Last</a></li><?php } ?>
            </ul>
          </nav>
          </div>
        </div>
      </div>-->