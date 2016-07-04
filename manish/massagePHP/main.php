<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Business Theme</title>
<base href="<?php echo $dirName; ?>">
<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/style.css" rel="stylesheet" type="text/css">

<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<style type="text/css">
  
.jumbotron {
  background: url(<?php echo $resultDomain['background_image']; ?>) no-repeat; 
}
</style>
</head>

<body>
  <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href=""><?php echo $resultDomain['title']; ?></a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li class="<?php if ($page === 'home.php') { ?>active<?php } ?>"><a href="home">Home <span>Main Page</span></a></li>
            <li class="<?php if ($page === 'about.php') { ?>active<?php } ?>"><a href="about">About <span>Who Are We?</span></a></li>
            <li class="<?php if ($page === 'services.php') { ?>active<?php } ?>"><a href="services">Services <span>What Do We Do?</span></a></li>
            <li class="<?php if ($page === 'contact.php') { ?>active<?php } ?>"><a href="contact">Contact <span>Get In Touch?</span></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    
<?php if (!empty($content_for_url)) echo $content_for_url; ?>

<footer>
  <p>Business Theme Copyright &copy; 2016 - <a href="#">Terms</a> &middot; <a href="#">Privacy</a></p>
</footer>


</body>
</html>
