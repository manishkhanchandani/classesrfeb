<?php
define('COOKIE_FILE_PATH', '../cache');
include('../functions.php');
include('whitehousepetition.php');
$pageId = 1;
$description = '<p>It has always been in my heart and intent to not harm anyone. This is why I became ahomeopath. To help people. I was helped in my life by this system of healing. For many years I had a hard time asking for money because I held a thought that healing is for everyone and is actually is a free gift to us from the universe. Homeopathy is one way to access that free healing. I have been a homeopath for over 20 years and have come to accept that I need to earn a living to pay for my life.</p>
<p>Over time I began specializing in helping parents navigate the vaccine question. As demand for these services grew so did I access greater finical ease. This is because the powers that be keep adding more vaccines to the schedule and the children are getting sicker and sicker.</p>
<p>There has never been a time more than now that children need homeopathy to help undo the damage vaccines create. Accordingly, I make more and more money. This does not sit right with me. Those manufactures of the vaccines are living in mansions on tropical islands from the millions they have made at the expense of these children&rsquo;s lives. This is wrong through and through. Profit at the expense of humanity.  Even though homeopathy helps and I have become an expert in helping with homeopathy, this is not how I want to make my money.</p>
<p>I have created an organization that promotes the use of homeoprophylaxis so parents do not vaccinate. My practice, as it is, would not be if it were not for the work of the vaccine companies.  How can I reconcile this ? I am like a vulture living in the carrion of a decrepit system.  I did not plan it this way and I am trying figure out another way. It is my goal for my line of work to be in line with the karma of the universe and to bring me solace and redemption in this Existence.</p>
<p>What to do? What to do? My hopes and dreams would be for the pharma companies to wake up one day and realize their lies. But alas I fear they never will despite all the evidence against them. Perhaps I should thank the vaccine manufactures for their ails and shortsightedness.  Perhaps I should give a tithing to them for the profit I make at the expense of the children&rsquo;s sufferings they create?  Perhaps I should apologize to all the families I serve that I have earned a living from their suffering?  All I care about is the children. And I suffer because some of them can not be helped.</p>
<p>When do you stop trying to save the drowning man when the saving is coming at your expense? Pray for me. Pray for these children and the vaccine manufactures because we are all in the same strange pact and somehow working a weird karma out. Forgive me for my part in this. Thank you. </p>
<p>Narrated by one good homeopath</p>
';
$img = 'http://www.homeopathicremediesblog.com/wp-content/uploads/2014/06/Homeopathic-remedy-derived-from2.jpg';
$title = 'Vaccinations Are Wrong. Try Homeopathy Instead';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST']; ?><?php echo $_SERVER['REQUEST_URI']; ?>" />
<meta property="og:description" content="<?php echo $description; ?>" />
<meta property="og:image" content="<?php echo $img; ?>" />
<meta property="og:title" content="<?php echo $title; ?>" />
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Homeopathy And Vaccinations</title>

    <!-- Bootstrap core CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">

<style type="text/css">
body {
 padding-top: 50px; 
}
</style>


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Homeopathy</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/news/">Home</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
        <h1><?php echo $title; ?></h1>
        <?php echo $description; ?>
        </div>
      </div>

    </div><!-- /.container -->





    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
  </body>
</html>