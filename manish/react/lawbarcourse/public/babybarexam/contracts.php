<?php
$folder = 'contracts';
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Contracts</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<style type="text/css">
  body {
    padding-top: 50px;
  }  
  .table {
  font-size: 12px;
  font-family: Verdana;
  }
</style>
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
      <a class="navbar-brand" href="#">Project name</a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>

<div class="container">

  <div class="row">
    <div class="col-md-12">
      <h1>Contracts Law</h1>
    </div>
  </div>
  
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive" style="overflow:auto;">
        <table class="table table-bordered table-striped">
          <thead> 
            <tr> 
              <th>Year</th> 
              <th>Essay</th> 
              <th>Call of Question</th> 
              <th>Governing Law</th> 
            </tr> 
          </thead>
          <tbody> 
            <tr> 
              <th scope="row">June 2016</th> 
              <td><?php @include($folder.'/june2016.php'); ?></td> 
              <td>1. Can Bill prevail in his lawsuit? Discuss.<br>
              2. If so, what damages, if any, is Bill entitled to recover? Discuss.</td> 
              <td>&nbsp;</td> 
            </tr>
            <tr> 
              <th scope="row">October 2015</th> 
              <td><?php @include($folder.'/october2015_1.php'); ?></td> 
              <td>1. Who breached the contract? Discuss.<br>
                2. Assuming Painter breached the contract, what damages, if any, would Developer be entitled to? Discuss.<br>
              3. Assuming Developer breached the contract, what damages, if any, would Painter be entitled to? Discuss.</td> 
              <td>&nbsp;</td> 
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</div><!-- /.container -->
</body>
</html>