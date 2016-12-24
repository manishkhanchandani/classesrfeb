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

$callOfQuestion = "With what crimes, if any, could $subject1 be charged and what defenses, if any, could he assert? Discuss.";

$workOn = 'We need to work on Crime and Defenses';


$data = "$subject1 and his wife $subject2 owned a laundromat and lived in an apartment above it. They were having significant financial difficulties because the laundromat had been losing money.

Unbeknownst to $subject2, $subject1 decided to burn the laundromat down in order to obtain insurance proceeds. He contacted $subject3, who had a reputation for being available to do “odd jobs.” $subject3 agreed to set fire to the laundromat the next day for 20 percent of the insurance proceeds. $subject1 told him that he would call him once everyone was out of the building. 

The next day, $subject1 invited $subject2 out for a walk. While she was getting ready, he checked the laundromat, found no one there, and called $subject3. While $subject1 and $subject2 were out walking, $subject2 mentioned that, just as she was leaving, her brother $subject4 had come by the apartment unexpectedly and was napping on their couch. $subject1 rushed to call $subject3. When he could not reach him, he made an anonymous call to 911 to report a possible fire at the laundromat.

In the meantime, $subject3 started a fire that quickly engulfed the laundromat and the apartment, and killed $subject4. After learning of $subject4’s death, $subject1 decided not to file a claim for insurance proceeds.

$callOfQuestion";

//get issues and modified data
list($modifiedData, $issueFound) = getIssuesAndModifiedData($issueArray, $data, $issueFound);


$solutionData = "$subject1's Crimes

{$rulesArray['solicitation']['label']}
{$rulesArray['solicitation']['rule']} After $subject1 decided he wanted to burn down the laundromat he contacted $subject3, who is known for doing \"odd jobs\", to burn down his laundromat. The facts are clear that $subject1 intentionally asked $subject3 to do any unlawful act (burning down a laundromat to collect insurance proceeds) and has committed the crime of solicitation.

MERGER
The crime of solicitation will merge with the crime of conspiracy. As shown below, $subject1 will be shown to have entered into a conspiracy. He will not be charged with solicitation, but conspiracy a stronger crime.

{$rulesArray['conspiracy']['label']}
{$rulesArray['conspiracy']['rule']} Many modern law jurisdictions require an overt step. $subject3 agreed to set fire to the laundromat; thus, $subject1 and $subject3 formed an agreement with intent to commit the unlawful act of burning down the laundromat. $subject3 actually committed the arson (overt step) and it will not merge with conspiracy. $subject1 and $subject3 can be charged with conspiracy plus and crimes in furtherance (foreseeable).

{$rulesArray['pinkertonRule']['label']}
{$rulesArray['pinkertonRule']['rule']} $subject1 and $subject3 are coconspirators and $subject1 can be charged with any crimes committed by $subject3 in furtherance of the conspiracy. As shown below, $subject1 can be charged with the murder.

{$rulesArray['withdrawal']['label']}
{$rulesArray['withdrawal']['rule']} A reasonable person standard is used to determine if the withdrawal is effective. If withdrawal is effective, the person will still be charged with conspiracy, but not any acts in furtherance.

Here, $subject1 has learned that his conspiracy will endanger his brother in law. He tries to withdraw the plan, but cannot reach his coconspirator. He attempts to save brother in law by calling 911, but the attempt is futile. Since $subject1 was not able to communicate his intent to withdraw before $subject3 starts the fire he has not successfully withdrawn from the conspiracy.

{$rulesArray['arson']['label']}
{$rulesArray['arson']['rule']} {$rulesArray['malicious']['rule']} {$rulesArray['burning']['rule']} 

Because $subject3 has started a fire that quickly engulfed the laundromat, it can be shown
that $subject3 acted with the required intent to burn the structure of another.

ATTEMPTED INSURANCE FRAUD
Attempt is the specific intent to commit an unlawful crime, but due to a factual impossibility cannot occur. If the actor takes a substantial step in furtherance of the crime though he may have changed his mind, he will be charged with attempt of that crime.

Insurance fraud is the misrepresentation of fact to collection on an insurance policy.

$subject1 did not file an insurance claim for proceeds of his burned laundromat. However, he had the specific intent to commit the crime and set the plan in motion by entering a conspiracy that led to the burning of the building he intended to collect on. He will argue that he did not file a claim and thus a factual impossibility existed, but the substantial step was taken along with the intent and factual impossibility is not a defense to attempt. $subject1 will be charged with attempted insurance fraud.

{$rulesArray['homicide']['label']}
{$rulesArray['homicide']['rule']}

Here, $subject4, $subject1's brother in law, has died because $subject3 set fire to $subject1's laundromat that was below the apartment that $subject1 lived and $subject4 was visiting/napping. A homicide has occurred and is connected to $subject3. As mentioned supra and will be shown below that $subject1 can be charged because the killing occurred in furtherance of the intent to commit insurance fraud.

{$rulesArray['murder']['label']}
{$rulesArray['murder']['rule']} {$rulesArray['maliceAforethought']['rule']}

WANTON AND WILLFUL MISCONDUCT
$subject3 and $subject1 did not have intent to harm anyone. Their plan was to be conducted when no one was home. Therefore, they will not be charged with intent to kill or intent to cause serious injury. 

However, because the homicide occurred due to the arson conspiracy of the laundromat and apartment that led to the killing, it can be demonstrated that $subject1 and $subject3 acted with wanton and willful misconduct. The laundromat is a place of business that could have led to killing of customers who were 
visiting outside and an apartment could have been visited by a landlord, which shows that $subject1 and $subject3 acted with a serious high risk of disregard to human life and could be prosecuted for wanton and willful misconduct.

{$rulesArray['felonyMurder']['label']}
{$rulesArray['felonyMurder']['rule']} Here, $subject4 died because of the arson. The defendants will argue that the arson was completed; however, the murder is collateral to the felony and will not avoid prosecution for felony murder.

VICARIOUS LIABILITY AS ACCOMPLICE
As stated supra, because $subject1 is a coconspirator and even though not present at the crime scene he will be treated as an accomplice and charged with the murder of $subject4 that was in furtherance on the conspiracy.


{$rulesArray['firstDegreeMurder']['label']}
{$rulesArray['firstDegreeMurder']['rule']} If the prosecution achieves a conviction beyond a reasonable doubt for felony murder, than $subject1 will be charged with first degree murder.

{$rulesArray['secondDegreeMurder']['label']}
{$rulesArray['secondDegreeMurder']['rule']} If $subject1 is convicted of wanton and willful misconduct that he will be charged with second degree murder.

MITIGATION TO MANSLAUGHTER
Murder can be mitigated to manslaughter if it can be shown that one acted in a heat of passion or had an imperfect defense (a mistake that was unreasonable but in good faith), known as voluntary manslaughter or involuntary manslaughter (misdemeanormanslaughter or criminal negligence).

$subject1 did not demonstrate anything to lessen his chances of receiving first or second degree murder. See below for further defense arguments by $subject1.

JUSTIFICATION
Crime Prevention
$subject1 may try to argue that he called 911 and to avoid a crime of murder, but this is not applicable. Crime prevention by citizen involves responding in the to apprehend a felon. He was only trying to provide a rescue by firefighter or paramedic of his brother since he only reported a fire at the laundromat. $subject1 will not succeed in justification and has no other justifications such as self defense, defense of others or a reasonable good-faith mistake. $subject1 cannot argue insanity, intoxication or youth. $subject1 may try to argue duress since he was having financial difficulties, but duress will not be applicable since he is not trying to substantial save others. Therefore, $subject1 has no further defenses and can be charged with all of the crimes mentioned above.";
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