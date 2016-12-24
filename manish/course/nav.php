
    <!-- Fixed navbar -->
    <nav class="navbar navbar-inverse navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Essays <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="dropdown-header">Criminal Law</li>
                <?php $dayArray = range(2002, 2011);
                rsort($dayArray);
                ?>
                <?php
                  foreach ($dayArray as $day) { ?>
                  <li><a href="essays/criminal/october<?php echo $day; ?>.php">October <?php echo $day; ?></a></li>
                  <li><a href="essays/criminal/june<?php echo $day; ?>.php">June <?php echo $day; ?></a></li>
                
                <?php } ?>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Torts Law</li>
                <?php
                  foreach ($dayArray as $day) { ?>
                  <li><a href="essays/torts/october<?php echo $day; ?>.php">October <?php echo $day; ?></a></li>
                  <li><a href="essays/torts/june<?php echo $day; ?>.php">June <?php echo $day; ?></a></li>
                
                <?php } ?>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Contracts Law</li>
                <?php
                  foreach ($dayArray as $day) { ?>
                  <li><a href="essays/contracts/october<?php echo $day; ?>.php">October <?php echo $day; ?></a></li>
                  <li><a href="essays/contracts/june<?php echo $day; ?>.php">June <?php echo $day; ?></a></li>
                
                <?php } ?>
                <li><a href="#">Coming soon</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="../navbar/">Default</a></li>
            <li><a href="../navbar-static-top/">Static top</a></li>
            <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>