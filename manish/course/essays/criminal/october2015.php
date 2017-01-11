<?php

include('../functions.php');
include('config.php');

$subject1 = 'Al';
$subject2 = 'Bobbie';
$subject3 = 'Ted';
$subject4 = 'Brad';

if (!empty($_GET['subject1'])) $subject1 = $_GET['subject1'];
if (!empty($_GET['subject2'])) $subject2 = $_GET['subject2'];
if (!empty($_GET['subject3'])) $subject3 = $_GET['subject3'];
if (!empty($_GET['subject4'])) $subject4 = $_GET['subject4'];

$pageTitle = 'October 2011 Criminal Law Exam';

$callOfQuestion = "";

$workOn = '';


$data = "

$callOfQuestion";

//get issues and modified data
list($modifiedData, $issueFound) = getIssuesAndModifiedData($issueArray, $data, $issueFound);


$solutionData = "$subject1's Crimes

{$rulesArray['solicitation']['label']}
{$rulesArray['solicitation']['rule']} After $subject1 decided he wanted to burn down the laundromat he contacted $subject3, who is known for doing \"odd jobs\", to burn down his laundromat. The facts are clear that $subject1 intentionally asked $subject3 to do any unlawful act (burning down a laundromat to collect insurance proceeds) and has committed the crime of solicitation.
";
?>
<?php include('../../header.php'); ?>


<script>
$( document ).ready(function() {
  $("#callOfQuestion").click(function(){
    $('#callSoln').show();
  });
  $("#issuesQuestion").click(function(){
    $('#issuesSoln').show();
  });
  $("#solnQuestion").click(function(){
    $('#solnSoln').show();
  });
});  
  
</script>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>October 2011</h1>
    </div>
    </div>
  <div class="row">
    <div class="col-md-4">
      <form method="get">
          <div class="form-group">
              <label for="subject1">Subject 1</label>
              <input type="text" class="form-control" name="subject1" placeholder="Enter subject 1" value="<?php echo $subject1; ?>">
          </div>
          <div class="form-group">
              <label for="subject2">Subject 2</label>
              <input type="text" class="form-control" name="subject2" placeholder="Enter subject 2" value="<?php echo $subject2; ?>">
          </div>
          <div class="form-group">
              <label for="subject3">Subject 3</label>
              <input type="text" class="form-control" name="subject3" placeholder="Enter subject 3" value="<?php echo $subject3; ?>">
          </div>
          <div class="form-group">
              <label for="subject4">Subject 4</label>
              <input type="text" class="form-control" name="subject4" placeholder="Enter subject 4" value="<?php echo $subject4; ?>">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
      </form>
      
      <h3>Question</h3>
      <p><?php echo nl2br($data); ?></p>
    </div>
    <div class="col-md-4">
      <div class="subsection">
        <div class="callQues"><button class="btn btn-default" id="callOfQuestion">What is Call of Question?</button></div>
        <div id="callSoln" style="display: none;"><?php echo nl2br($callOfQuestion); ?>
        <br />
        <?php echo $workOn; ?>
        </div>
      </div>
        
      <div class="subsection">
        <div class="issues"><button class="btn btn-default" id="issuesQuestion">Find Issues?</button></div>
        <div id="issuesSoln" style="display: none;"><?php echo nl2br($modifiedData); ?>
          <br><br>
          <div>
            <?php foreach ($issueFound as $issues) {
              ?>
              <b><?php echo $issues['label']; ?>:</b> <?php echo $issues['issue']; ?><br>
              <?php
            }
            ?>
          </div>
        </div>
      </div>
      
    </div>
    
    
    <div class="col-md-4">
      <div class="subsection">
        <div class="issues"><button class="btn btn-default" id="solnQuestion">Complete Solution</button>
        
        </div>
        <div id="solnSoln" style="display: none;"><?php echo nl2br($solutionData); ?>
        </div>
      </div>
      
    </div>
    
  </div>
  
</div>

<?php include('../../footer.php'); ?>