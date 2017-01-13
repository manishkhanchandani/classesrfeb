<?php
/*
$pagination_start = $return['start'];
$pagination_totalRows = $return['totalRows'];
$pagination_max = $return['max'];
$pagination_pageNum = $return['pageNum'];
$pagination_pageNumKey = 'pageNum_rsView'
$pagination_queryString = $return['queryString'];
$pagination_totalPages = $return['totalPages'];
*/
?>
<div class="row">
  <div class="col-md-12">
    <hr>
    <div class="">
    <p class="text-center"> Records <strong><?php echo ($pagination_start + 1) ?></strong> to <strong><?php echo min($pagination_start + $pagination_max, $pagination_totalRows) ?></strong> of <strong><?php echo $pagination_totalRows ?></strong></p>
    <nav>
      <ul class="pager">
        <?php if ($pagination_pageNum > 0) { ?><li><a href="<?php printf("?$pagination_pageNumKey=%d%s", 0, $pagination_queryString); ?>" style="cursor:pointer">First</a></li><?php } ?>
        <?php if ($pagination_pageNum > 0) { ?><li><a href="<?php printf("?$pagination_pageNumKey=%d%s", max(0, $pagination_pageNum - 1), $pagination_queryString); ?>" style="cursor:pointer">Previous</a></li><?php } ?>
        <?php if ($pagination_pageNum < $pagination_totalPages) { ?><li><a href="<?php printf("?$pagination_pageNumKey=%d%s", min($pagination_totalPages, $pagination_pageNum + 1), $pagination_queryString); ?>" style="cursor:pointer">Next</a></li><?php } ?>
        <?php if ($pagination_pageNum < $pagination_totalPages) { ?><li><a href="<?php printf("?$pagination_pageNumKey=%d%s", $pagination_totalPages, $pagination_queryString); ?>" style="cursor:pointer">Last</a></li><?php } ?>
      </ul>
    </nav>
    </div>
  </div>
</div>