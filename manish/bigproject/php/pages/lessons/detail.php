<div class="container">
  <div class="row">
    <div class="col-md-5">
      <div ng-if="results.mainImage"><img ng-src="<?php echo $mainImage; ?>" class="img-responsive img-thumbnail"></div>
      <div class="row">
        <?php if (!empty($details['details']['images'])) { ?>
            <?php foreach ($details['details']['images'] as $image) {?>
              <div class="col-md-3" style="min-height: 120px;">
                <img src="<?php echo $image; ?>" class="img-responsive img-thumbnail">
              </div>
          <?php } ?>
        <?php } ?>
      </div>
    </div>
    <div class="col-md-4">
      <h3><?php echo $details['title']; ?></h3>
      <p><?php echo $details['description']; ?></p>
      <p><a href="http://maps.google.com/maps?q=loc:<?php echo $details['location']['latitude']; ?>,<?php echo $details['location']['longitude']; ?>" target="_blank"><?php echo $details['details']['location']; ?></a></p>
      <p><strong>Created on:</strong> <?php echo date('Y-m-d', $details['timestamp'] / 1000); ?></p>
      <p ng-if="results.details.gender"><strong>Gender:</strong> <?php echo $details['details']['gender']; ?></p>
      <?php if (!empty($details['details']['age'])) { ?><p><strong>Age:</strong> <?php echo $details['details']['age']; ?></p><?php } ?>
      <?php if (!empty($details['details']['email'])) { ?><p><strong>Email:</strong> <?php echo $details['details']['email']; ?></p><?php } ?>
      <?php if (!empty($details['details']['phone'])) { ?><p><strong>Phone:</strong> <?php echo $details['details']['phone']; ?></p><?php } ?>
      <?php if (!empty($details['details']['pref_email'])) { ?><p><strong>Contact By:</strong> <span>Email</span></p><?php } ?>
      <?php if (!empty($details['details']['pref_phone_text'])) { ?><p><strong>Contact By:</strong> <span>Phone Messaging</span></p><?php } ?>
      <?php if (!empty($details['details']['pref_phone_call'])) { ?><p><strong>Contact By:</strong> <span>Phone Call</span></p><?php } ?>
      <p><strong>Share:</strong> <span>
                    <a href="http://twitter.com/intent/tweet?status=<?php echo $details['title']; ?> <?php echo $details['tags']; ?> Tutor <?php echo $details['details']['location']; ?>%20http://ineedtutor.us/lessons/detail/<?php echo $id; ?>" id="share_tw" onclick="share('tw');return false" rel="nofollow"><img src="images/twitter.png" alt="twitter"></a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://ineedtutor.us/lessons/detail/<?php echo $id; ?>" id="share_fb" onclick="share('fb');return false" rel="nofollow"><img src="images/facebook.png" alt="facebook"></a>
                    <a href="https://plus.google.com/share?url=http://ineedtutor.us/lessons/detail/<?php echo $id; ?>" id="share_gp" onclick="share('gp');return false" rel="nofollow"><img src="images/google_plus.png" alt="facebook"></a>
				</span></p>
      
      <!-- youtube urls -->
      <div class="row" ng-if="youtubeUrls">
        <h3 class="text-center">Youtube Video's</h3>
        <div class="col-md-12 text-center" ng-repeat="url in youtubeUrls">
          <div class="embed-responsive embed-responsive-4by3">
            <youtube-video video-url="url"></youtube-video>
          </div>
        </div>
      </div>
      <!-- youtube urls -->
      
      <!-- links -->
      <div class="row" ng-if="linkUrls">
        <h3 class="text-center">External Link's</h3>
        <ul class="list-group">
          <li class="list-group-item" ng-repeat="url in linkUrls"><a href="{{url}}" target="_blank">{{url}}</a></li>
        </ul>
      </div>
      <!-- links -->
      
      
    </div>
    <div class="col-md-3">
    
    </div>
  </div>
</div>