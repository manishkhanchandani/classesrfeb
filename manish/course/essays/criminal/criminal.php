<?php

include('../functions.php');
include('config.php');

$subject1 = 'Al';
$subject2 = 'Bobbie';
$subject3 = 'Carl';
$subject4 = 'Ted';

if (!empty($_GET['subject1'])) $subject1 = $_GET['subject1'];
if (!empty($_GET['subject2'])) $subject2 = $_GET['subject2'];
if (!empty($_GET['subject3'])) $subject3 = $_GET['subject3'];
if (!empty($_GET['subject4'])) $subject4 = $_GET['subject4'];

$pageTitle = 'Criminal Law Essay Exam';
?>
<?php include('../../header.php'); ?>
<div class="container">
  <form method="get">
  <div class="row">
    <div class="col-md-6">
          <div class="form-group">
              <label for="subject1">Subject 1</label>
              <input type="text" class="form-control" name="subject1" placeholder="Enter subject 1" value="<?php echo $subject1; ?>">
          </div>
          <div class="form-group">
              <label for="subject2">Subject 2</label>
              <input type="text" class="form-control" name="subject2" placeholder="Enter subject 2" value="<?php echo $subject2; ?>">
          </div>
    </div>
    
    <div class="col-md-6">
          <div class="form-group">
              <label for="subject3">Subject 3</label>
              <input type="text" class="form-control" name="subject3" placeholder="Enter subject 3" value="<?php echo $subject3; ?>">
          </div>
          <div class="form-group">
              <label for="subject4">Subject 4</label>
              <input type="text" class="form-control" name="subject4" placeholder="Enter subject 4" value="<?php echo $subject4; ?>">
          </div>
    </div>
    
  </div>
   <div class="row">
     <div class="col-md-12"><button type="submit" class="btn btn-default form-control">Submit</button></div>
   </div>
    
    </form>
  <div class="row">
    <div class="col-md-4">d</div>
    <div class="col-md-4">d</div>
    <div class="col-md-4">d</div>
  </div>
  
</div>
<?php include('../../footer.php'); ?>