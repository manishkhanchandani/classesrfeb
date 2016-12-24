<div class="jumbotron text-center">
     <a title="Group <?php echo $groupData['name']; ?>" href="/<?php echo $groupData['url']; ?>/details" class="avatarLink">
			<img alt="Group <?php echo $groupData['name']; ?>" src="<?php echo $mainImg; ?>" class="avatarImg">
		</a>
    <h2>Group <?php echo $groupData['name']; ?></h2>
  </div>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
        <a class="navbar-brand" href="/<?php echo $groupData['url']; ?>/details"><?php echo $groupTitle; ?></a></div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="defaultNavbar1">
        <ul class="nav navbar-nav">
          <li class="<?php if ($activeMenu === 'members') echo 'active'; ?>"><a href="#">Members<span class="sr-only">(current)</span></a></li>
          <li class="<?php if ($activeMenu === 'photos') echo 'active'; ?>"><a href="#">Photos</a></li>
          <li class="<?php if ($activeMenu === 'videos') echo 'active'; ?>"><a href="#">Videos</a></li>
          <li class="<?php if ($activeMenu === 'links') echo 'active'; ?>"><a href="#">Links</a></li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Search Group</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Group Tools<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Schedule an Event</a></li>
              <li><a href="#">Email Members</a></li>
              <li><a href="#">Group Settings</a></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Profile<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">View Profile</a></li>
              <li><a href="#">Email and Notifications</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Step Down as Organizer</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
