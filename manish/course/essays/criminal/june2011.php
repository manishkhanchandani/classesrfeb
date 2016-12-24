<?php

include('../functions.php');
include('config.php');

$subject1 = 'Mel';
$subject2 = 'Brent';
$subject3 = 'Herb';

if (!empty($_GET['subject1'])) $subject1 = $_GET['subject1'];
if (!empty($_GET['subject2'])) $subject2 = $_GET['subject2'];
if (!empty($_GET['subject3'])) $subject3 = $_GET['subject3'];

$pageTitle = 'June 2011 Criminal Law Exam';

$callOfQuestion = "1. Are $subject1 and/or $subject2 guilty of:
a. Murder? Discuss.
b. Attempted murder? Discuss.
c. Conspiracy to commit murder? Discuss.
2. Does $subject1 have a defense of insanity? Discuss.";


$data = "$subject1 suffers from a mental disorder that gives rise to a subconscious desire to commit homicide. Under the influence of the mental disorder, $subject1 formulated a plan to kill $subject3 by breaking into $subject3’s house and shooting him to death while he was asleep.

$subject2, who had never met or communicated with $subject1, learned of $subject1’s plan. $subject2 knew when and where $subject1 intended to kill $subject3, and he desired to assist $subject1 in the crime.

On the night $subject1 intended to kill $subject3, unbeknownst to $subject1, $subject2 forced open the front door to $subject3’s house so as to effectuate $subject1’s entry and facilitate his killing of $subject3. $subject1 arrived at $subject3’s house. He discovered the front door open and entered the house. $subject1 tiptoed to the bedroom and sprayed bullets into $subject3’s body. Unbeknownst to either $subject1 or $subject2, $subject3 had died of a heart attack an hour before $subject1 fired the bullets.

$callOfQuestion";

//get issues and modified data
list($modifiedData, $issueFound) = getIssuesAndModifiedData($issueArray, $data, $issueFound);


$solutionData = "State vs. $subject1

A.  Is $subject1 Guilty of Murder?

{$rulesArray['homicide']['label']}
{$rulesArray['homicide']['rule']} 

{$rulesArray['murder']['label']}
{$rulesArray['murder']['rule']}

{$rulesArray['maliceAforethought']['rule']}

Most jurisdictions break murder into two degrees, first-degree murder and second-degree murder. {$rulesArray['firstDegreeMurder']['rule']} {$rulesArray['secondDegreeMurder']['rule']} {$rulesArray['felonyMurder']['rule']}

Here, we are told that $subject1 desired to commit homicide and formulated a plan to kill $subject3. The State will argue that the element of premeditation is present in that $subject1 formulated a plan to kill $subject3 by breaking into his house and shooting him while $subject3 was asleep.

$subject1 will counter that the definition of homicide and murder includes the unlawful killing of a human being. At common law a human being was defined as a person whose major organs, such as the heart, were still functioning. Modern definitions usually state that a person is a human being until their brain ceases to function, even if their organs are still working. Here, we are specifically told that when $subject1 entered $subject3's room and sprayed his body with bullets that $subject3 had already died of a heart attack an hour before $subject1 fired the bullets. Thus, while $subject1 had the requisite intent to kill $subject3, and proceeded to take a substantial step towards killing $subject3 by spraying $subject3's body with bullets, $subject3 no longer met the legal definition of a human being when $subject1 shot him. Thus, since $subject1 did not commit an unlawful killing of [a] human being, as $subject3 was already dead and therefore no longer met the legal definition of a human being, $subject1 is not liable for murder. However, he may be liable for attempted murder (see infra). 

B.  Is $subject1 Guilty of Attempted Murder?

C.  Is $subject1 Guilty of Conspiracy to commit murder?

State vs. $subject2

A.  Is $subject2 Guilty of Murder?

B.  Is $subject2 Guilty of Attempted Murder?

C.  Is $subject2 Guilty of Conspiracy to commit murder?

Q. Does $subject1 have a defense of insanity?
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