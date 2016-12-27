<?php

include('../functions.php');
include('config.php');

$subject1 = 'Alan';
$subject2 = 'Brian';
$subject3 = 'Carl';

if (!empty($_GET['subject1'])) $subject1 = $_GET['subject1'];
if (!empty($_GET['subject2'])) $subject2 = $_GET['subject2'];
if (!empty($_GET['subject3'])) $subject3 = $_GET['subject3'];

$pageTitle = 'October 2010 Criminal Law Exam';

$callOfQuestion = "What crimes, if any, have $subject1 and $subject2 committed? What defenses can each assert, and will they be successful? Discuss.";


$data = "$subject1, age 18, decided that as a graduation prank he would set fire to the athletics equipment shed at the high school. Late on a Saturday night, $subject1, who had consumed a few beers, told his friend, $subject2, about his plan and asked $subject2 to drive him to the school. “That’s an idiotic idea,” $subject2 told $subject1. “What if somebody’s in there? Somebody might get hurt.” $subject1 replied that he didn’t think it was likely anyone would be there late at night. $subject2 said, “It’s not my business why you want a ride. I’ll give you a lift, and what you do while you’re there is your problem.”

$subject2 drove $subject1 to the school and parked a hundred feet from the athletics shed. The shed was made of wood. $subject1 had brought a single pack of paper matches, but was unable to set the shed aflame. $subject2, watching from a distance, beckoned to $subject1 and offered him his cigarette lighter, saying, “Get this over with so we can get out of here.” $subject1 returned to the shed with the lighter and was able to get the shed to smolder, but not catch fire. After several tries, he gave up. $subject1 and $subject2 left the school. Because of his intoxication, $subject1 did not hear $subject3, a local homeless man, snoring inside the shed.

Unbeknownst to $subject1 or $subject2, the shed was still smoldering. Two hours later, high winds caused the remaining sparks to burst into flame; the resulting fire destroyed the athletics shed. $subject3 was still asleep in the shed and was killed by the fire.


$callOfQuestion";

//get issues and modified data
list($modifiedData, $issueFound) = getIssuesAndModifiedData($issueArray, $data, $issueFound);


$solutionData = "State vs. $subject1

A.  What crimes has $subject1 committed?

{$rulesArray['solicitation']['label']}
{$rulesArray['solicitation']['rule']} 

{$rulesArray['conspiracy']['label']}
{$rulesArray['conspiracy']['rule']} 

{$rulesArray['arson']['label']}
{$rulesArray['arson']['rule']} 

{$rulesArray['homicide']['label']}
{$rulesArray['homicide']['rule']} 

{$rulesArray['murder']['label']}
{$rulesArray['murder']['rule']} 

{$rulesArray['actualCause']['label']}
{$rulesArray['actualCause']['rule']} 

{$rulesArray['proximateCause']['label']}
{$rulesArray['proximateCause']['rule']} 

{$rulesArray['butFor']['label']}
{$rulesArray['butFor']['rule']} 

{$rulesArray['SubstantialFactor']['label']}
{$rulesArray['SubstantialFactor']['rule']} 

{$rulesArray['firstDegreeMurder']['label']}
{$rulesArray['firstDegreeMurder']['rule']} 

{$rulesArray['secondDegreeMurder']['label']}
{$rulesArray['secondDegreeMurder']['rule']} 

{$rulesArray['involuntaryManslaughter']['label']}
{$rulesArray['involuntaryManslaughter']['rule']} 


B.  What crimes has $subject2 committed?


{$rulesArray['conspiracy']['label']}
{$rulesArray['conspiracy']['rule']} 

{$rulesArray['accompliceLiability']['label']}
{$rulesArray['accompliceLiability']['rule']} 

{$rulesArray['pinkertonRule']['label']}
{$rulesArray['pinkertonRule']['rule']} 

{$rulesArray['arson']['label']}
{$rulesArray['arson']['rule']} 

{$rulesArray['homicide']['label']}
{$rulesArray['homicide']['rule']} 

{$rulesArray['murder']['label']}
{$rulesArray['murder']['rule']} 

{$rulesArray['actualCause']['label']}
{$rulesArray['actualCause']['rule']} 

{$rulesArray['proximateCause']['label']}
{$rulesArray['proximateCause']['rule']} 

{$rulesArray['butFor']['label']}
{$rulesArray['butFor']['rule']} 

{$rulesArray['SubstantialFactor']['label']}
{$rulesArray['SubstantialFactor']['rule']} 

{$rulesArray['firstDegreeMurder']['label']}
{$rulesArray['firstDegreeMurder']['rule']} 

{$rulesArray['secondDegreeMurder']['label']}
{$rulesArray['secondDegreeMurder']['rule']} 

C. What are defenses of $subject1?


{$rulesArray['defenses']['voluntaryIntoxication']['label']}
{$rulesArray['defenses']['voluntaryIntoxication']['rule']} 


D. What are defenses of $subject2?

{$rulesArray['defenses']['duress']['label']}
{$rulesArray['defenses']['duress']['rule']}
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
      <h1>October 2010</h1>
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
          <button type="submit" class="btn btn-default">Submit</button>
      </form>
      
      <h3>Question</h3>
      <p><?php echo nl2br($data); ?></p>
    </div>
    <div class="col-md-4">
      <div class="subsection">
        <div class="callQues"><button class="btn btn-default" id="callOfQuestion">What is Call of Question?</button></div>
        <div id="callSoln" style="display: none;"><?php echo nl2br($callOfQuestion); ?>
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