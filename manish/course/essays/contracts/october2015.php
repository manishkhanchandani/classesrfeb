<?php

include('../functions.php');
include('config.php');

$subject1 = 'Painter';
$subject2 = 'Developer';

if (!empty($_GET['subject1'])) $subject1 = $_GET['subject1'];
if (!empty($_GET['subject2'])) $subject2 = $_GET['subject2'];

$pageTitle = 'October 2015 Contracts Law Exam';

$callOfQuestion = "1. Who breached the contract? Discuss.

2. Assuming $subject1 breached the contract, what damages, if any, would $subject2 be entitled to? Discuss.

3. Assuming $subject2 breached the contract, what damages, if any, would $subject1 be entitled to? Discuss.";


$data = "$subject1 and $subject2 entered into a contract under the terms of which $subject1 was to paint the interior of $subject2’s new apartment building for a price of $40,000. The contract called for work to begin on June 1 and to be completed on July 1.

$subject1 was ready to start work on June 1, but $subject2 told $subject1 that because of problems with the drywall contractor, $subject1 could not start work until June 15. To avoid the possibility of losing her employees, who might quit if forced to take a two-week layoff, $subject1 took another job, which was not completed until June 20, at which time $subject1 started work on $subject2’s building.

On July 15, $subject1 informed $subject2 that she would not be able to complete the project until August 15. $subject2 told her he would lose substantial rental income if the project was not completed by August 1, when university students, his prime market, began moving in. He asked her to hire additional help, but she refused, saying the job would be finished on August 15 or not at all. In an attempt to get the job completed sooner, $subject2 fired $subject1 and looked for another painting contractor.

The best price $subject2 could get to have another painting contractor finish the job was $30,000. Before firing $subject1, $subject2 had paid $subject1 one-half of the contract price. Because the painting was completed late, $subject2 lost $10,000 in rental income. This rental income would not have been lost if the painting had been completed by August 1.

At the time $subject1 was fired, she was out-of-pocket for $5,000 in materials. She expected a profit of $5,000 had she been allowed to complete the contract.

$subject2 has sued $subject1 for breach of contract. $subject1 cross-complained against $subject2 for breach of contract.

$callOfQuestion";

//get issues and modified data
list($modifiedData, $issueFound) = getIssuesAndModifiedData($issueArray, $data, $issueFound);


$solutionData = "1. Who breached the contract? Discuss.

$subject2 V. $subject1

The rights and remedies of parties to a contract depend on there being a valid contract and the terms and performance thereof. {$rulesArray['contract']['rule']} {$rulesArray['valid_contract']['rule']}

{$rulesArray['governing_law']['label']}
{$rulesArray['governing_law']['rule']}
Here, the agreement calls for painting services, which are not moveable at the time of contract and thus not goods. The agreement is for services, governed by the common law. Therefore, the common law governs.

".contract_formation("$subject1, $subject2", "$40k", "1 job", "Painting", "June 1-July1")."
 There has impliedly been acceptance and the consideration of legally sufficient, bargained-for exchange that induces performance and is a detriment to the promisee of $40,000 has been identified. The STATUTE OF FRAUDS, a requirement of a written expression for certain contract types does not apply here as the provision of painting services is not one of the 5 types (Marriage, Over a Year, Land, Executory, Guarantor). Therefore, there is an impliedly valid contract.

CONTRACT TERMS
Here, the contract specified that performance was to begin June 1 and completed by July 1. There was no EXPRESS TIME IS OF THE ESSENCE clause; however the specificity of the dates of performance implies that time is a MATERIAL TERM.

CONTRACT PERFORMANCE
JUNE 1 - WAIVER OF START?
Here, on June 1, $subject1 was ready to start but an IMPLIED CONDITION PRECEDENT that the drywall be completed first was not satisfied. Therefore, because an IMPLIED CONDITION PRECEDENT was not satisfied, $subject1's start was waived. Further, $subject1 took additional work to be completed June 20.

JULY 15 - {$rulesArray['anticipatory_breach']['label']}?
{$rulesArray['anticipatory_breach']['rule2']}
{$rulesArray['breach']['rule']} {$rulesArray['minor_breach']['rule2']} {$rulesArray['material_breach']['rule2']}

Here, there is an ANTICIPATORY BREACH because $subject1 tells $subject2 that \"she would not be able to complete the project until August 15,\" which is a date after which performance was due. The BREACH is a MAJOR BREACH because although $subject1 had commenced performance, the parties had expressly made time a MATERIAL TERM and the substantial change from July 1 to Aug 15 of 6 weeks to finish (longer than the original period of work) would deprive $subject2 of the substantial benefit of the bargain. $subject2 also indicates that his clients are students who begin moving in by August 1. Therefore, $subject1 anticipatorily breached the contract with $subject2 and allowed $subject2 to declare a breach and seek legal remedies and to mitigate.


2. Assuming $subject1 breached the contract, what damages, if any, would $subject2 be entitled to? Discuss.

DAMAGES
Damages are compensation for contract harm and include MONETARY DAMAGES and EQUITABLE RELIEF.

MONETARY DAMAGES
Monetary damages include EXPECTATION DAMAGES, CONSEQUENTIAL and RELIANCE DAMAGES.

EXPECTATION DAMAGES
EXPECTATION DAMAGES give the non-breaching party the \"benefit of the bargain\". Where there is a BREACH, the non-breaching party is allowed to cure. The cure would be the difference between the market price and the contract price for the completion of the contract.

Here, $subject2 would be entitled to EXPECTATION DAMAGES equal to the difference between the market price to finish of $30,000 and the contract price of $40,000 less the amount already paid of $20,000 or $20,000.

CONSEQUENTIAL DAMAGES
Under Hadley-Baxendale, CONSEQUENTIAL DAMAGES that are foreseeable, contemplated at the time of contracting, certain and mitigated are awarded as compensation.

Here, at the time of contracting, it was not known to $subject1 that $subject2 intended to rent his apartment to students by Aug 1. Because it was not contemplated, such consequential damages even if foreseeable and certain (rental income is certain) would not be awarded.

RELIANCE DAMAGES
RELIANCE DAMAGES are amounts spent in reliance on the contract that would be awarded as if the contract had never happened.

Here, because $subject1 had spent $5,000 in materials for the job that had not been applied to the job, $subject1 would receive and $subject2 would owe $5,000 in reliance damages. Therefore, $subject2 would owe $subject1 $5,000 in reliance damages.

Therefore, if $subject1 BREACHED, $subject2 would receive a net $15,000 from $subject1 for completion of the job.

EQUITABLE RELIEF
Based on QUANTUM MERUIT, if there is inequity as a result of an award, EQUITABLE RELIEF may be sought to better value the damages.

Here, if $subject1's work was largely complete, QUANTUM MERUIT might suggest that EQUITABLE RELIEF be used to adjust the damages to reflect the value of the work completed by $subject1 prior to the breach.

3. Assuming $subject2 breached the contract, what damages, if any, would $subject1 be entitled to? Discuss.

DAMAGES. Supra.

EXPECTATION DAMAGES. Supra.

Here, if $subject2 has breached, $subject1 would be entitled to the \"benefit of the bargain\" or the $5,000 in expected profits. Therefore, $subject1 would be entitled to $5,000 in expectation damages.

CONSEQUENTIAL DAMAGES. Supra.
Here, if $subject2 has breached, $subject1 would be required to pay any consequential damages because $subject2 was the breaching party.

RELIANCE DAMAGES. Supra.
Here, if $subject2 has breached, $subject1 would still be entitled to the $5,000 in materials for the job in addition. Therefore, $subject1 would receive $5,000 in reliance damages.

Therefore, if $subject2 BREACHED, $subject1 would receive a net $10,000 from $subject2 for leaving the job.
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