<div id="groupDetails">
  <?php include('groups/header.php'); ?>
  <div class="row detailContent">
     <div class="col-md-12">
       <div class="row">
         
          <div class="col-md-2 left-sidecolumn">
            <a href=""><?php echo $groupData['location']; ?></a>
            <br />
            <strong>Founded:</strong> <?php echo date('M j, Y', strtotime($groupData['created_on'])); ?><br /><br />
            <a href="" class="btn btn-default">About Us</a>
            <br />
            <br />
            <a href="" class="btn btn-default">Invite Friends</a>
            <br />
            <br />
            <div class="row leftEachRow">
              <div class="col-md-8">
                Members:
              </div>
              <div class="col-md-4 text-right">
                <?php echo $memberCount['cnt']; ?>
              </div>
            </div>
            <div class="row leftEachRow">
              <div class="col-md-8">
                Upcoming Meetups:
              </div>
              <div class="col-md-4 text-right">
              </div>
            </div>
            <div class="row leftEachRow">
              <div class="col-md-8">
                Past Meetups:
              </div>
              <div class="col-md-4 text-right">
              </div>
            </div>
            <div class="row leftEachRow">
              <div class="col-md-8">
                Our Calendar:
              </div>
              <div class="col-md-4 text-right">
              </div>
            </div>
            <div class="row leftEachRow">
              <div class="col-md-8">
                Organizer:
              </div>
              <div class="col-md-4 text-right">
              </div>
            </div>
            
            
         </div>
          <div class="col-md-8 center-column">
            <?php echo $content_for_group; ?>

          </div>
          <div class="col-md-2 center-column">
            Advertisements
            
            What's new
          </div>
          
          
       </div><!-- end row -->
     </div><!-- end col-md-12 -->
  </div><!-- end row detailContent-->


</div>