<?php ?>
<?php include('../header.php'); ?>
<?php include('rules.php'); ?>
<div class="container">
  <div class="row">
    <div class="col-md-12">
       <h1>October 2015</h1>
    </div>
  </div>
  <div class="row">
<div class="col-md-12">
     <div>
      <h3>QUESTION 1</h3>
      <p>Painter and Developer entered into a contract under the terms of which Painter was to paint the interior of Developer’s new apartment building for a price of $40,000. The contract called for work to begin on June 1 and to be completed on July 1.<br>
      Painter was ready to start work on June 1, but Developer told Painter that because of problems with the drywall contractor, Painter could not start work until June 15. To avoid the possibility of losing her employees, who might quit if forced to take a two-week layoff, Painter took another job, which was not completed until June 20, at which time Painter started work on Developer’s building.<br>
      On July 15, Painter informed Developer that she would not be able to complete the project until August 15. Developer told her he would lose substantial rental income if the project was not completed by August 1, when university students, his prime market, began moving in. He asked her to hire additional help, but she refused, saying the job would be finished on August 15 or not at all. In an attempt to get the job completed sooner, Developer fired Painter and looked for another painting contractor.<br>
      The best price Developer could get to have another painting contractor finish the job was $30,000. Before firing Painter, Developer had paid Painter one-half of the contract price. Because the painting was completed late, Developer lost $10,000 in rental income. This rental income would not have been lost if the painting had been completed by August 1.<br>
      At the time Painter was fired, she was out-of-pocket for $5,000 in materials. She expected a profit of $5,000 had she been allowed to complete the contract.<br>
      Developer has sued Painter for breach of contract. Painter cross-complained against Developer for breach of contract.<br>
      1. Who breached the contract? Discuss.<br>
      2. Assuming Painter breached the contract, what damages, if any, would Developer be entitled to? Discuss.<br>
      3. Assuming Developer breached the contract, what damages, if any, would Painter be entitled to? Discuss.<br>
      
      </p>
      <h3>Solution</h3>
      <div class="row">
        <div class="col-md-12">
          <strong>1) Who breached the contract? Discuss.</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <p>What is GOVERNING LAW?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['governing_law']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, the subject matter of the contract is the painting of an apartment building. Painting is a service, something that requires labor as opposed to a sale of goods.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, the common law applies to this contract.</p>
        </div>
      </div>
      
      <hr />
      <div class="row">
        <div class="col-md-2">
          <p>Is it a Valid Contract?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['valid_contract']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here the facts state that there was a contract between Painter and Developer. Also we have the quantity - 1 apartment building to be painted, time - painting to take place between June 1 and July 1, parties - Painter and Developer, price - $40,000, and subject matter - painting of the apartment building have been identified. </p>
        </div>
        <div class="col-md-2">
          <p>Therefore, there is valid contract exist between the parties.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there an valid defense like Statute of Frauds?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo nl2br($rules['contract']['statute_of_frauds']); ?>
          </p>
        </div>
        <div class="col-md-5">
          <p>The facts do not state whether the contract was made in writing. Here, none of these items apply to this contract. The contract performance time is just 1 month (June 1 to July 1), and although the contract involves painting work on a building, which is real estate, painting is a service, not a transfer of any title interest.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, the statute of frauds will not prevent enforcement of this contract.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any condition of contract?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['condition_of_contract']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, in order for the painting of the building to commence, there is an implied condition that the drywall must be completed, as drywall is a lower layer on a wall, and the paint is applied to the top of the drywall.<br>
          Performance:<br>
The contract stated that the painting was to commence on June 1, and Painter was ready to start painting on June 1; however, Developer was not ready for the building to be painted, 
         </p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Painter was unable to begin painting on June 1.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any breach?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['breach']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Painter will argue that Developer breached the contract on June 1 through an unequivocal statement that the building would not be ready for painting (drywall not ready) until June 15.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore Developer breached the contract.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any Materiality of Breach?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['materiality_of_breach']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Developer's failure to have the building drywalled by June 1 as agreed to was a material breach, as this could cause a substantial loss of staff, who would have to take a two week layoff; had Painter known prior to contract formation that Developer wasn't going to be ready for painting until June 15</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Painter likely would have attempted to find other work for his staff prior to Developer's breach.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any excuse of condition?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['excuse_of_condition']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Developer's breach of his covenant (supra) to have the drywall prepared by June 1 was an excuse of the Painter's conditional performance to paint the building, because absent the drywall completion, the painting could not commence because paint must be applied to the drywall, not to the studs in the walls.</p>
        </div>
        <div class="col-md-2">
          <p>So Painter is excused for his delaying work of painting.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there proper Course of Performance?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['course_of_performance']; ?></p>
        </div>
        <div class="col-md-5">
          <p>While Developer breached the condition of having drywall ready in time, Painter did not treat this breach as a full repudiation of the contract, but rather commenced work on the painting work on June 15.<br>
Developer will argue that despite the delay in commencement of painting caused by Developer, Painter anticipatorily repudiated the contract by stating that the work would not be done until August 15. The difference in the originally agreed to start date (June 1) and completion date (July 1), was just one month, which would imply an agreed to completion time of one month from the start of painting. Painter completed his other project on June 20, which is approximately 55 days before his new estimated completion date of August 15. 55 days is much more than 1 month; therefore, Developer will argue that through the course of performance that altered the start date and by Painter stating unequivocally that he could not get done until August 15, it was Painter who breached.</p>
        </div>
        <div class="col-md-2">
          <p>Despite Developer's arguments, Developer was the breaching party.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      
      
      
      
      
      
      <div class="row">
        <div class="col-md-12">
          <strong>2) Assuming Painter breached the contract, what damages, if any, would Developer be entitled to? Discuss.</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any Consequential Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['consequential_damages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>As a consequence to the delay in the completion of the painting, Developer would not be able to rent the units in the building at their normal time, and lost $10,000 in income.</p>
        </div>
        <div class="col-md-2">
          <p> Thus, $10,000 in consequential damages may be awarded.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>is there any Expectation Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['expectation_damages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>In reliance on the contract, Developer had paid $15,000 to Painter. In addition, he ultimately had to pay another painter $30,000 to finish the job; thus his total cost of the contract was $45,000, which is $5,000 more than Developer had agreed to pay Painter. Because Developer would not have had to pay the additional $5,000 had Painter fully performed, </p>
        </div>
        <div class="col-md-2">
          <p>Developer may be awarded $5,000 in expectation damages. This would put him back in the position of having only paid a net of ($45,000 minus $5,000 damages) $40,000 in exchange for a painted building.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any Duty to Mitigate Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['mitigate_damages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, Developer fulfilled this duty by soliciting bids and locating another painter to complete the painting job.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore developer took reasonable action to avoid additional injury or loss. </p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      
      
      
      
      <div class="row">
        <div class="col-md-12">
          <strong>3) Assuming Developer breached the contract, what damages, if any, would Painter be entitled to? Discuss.</strong>

        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>
      
      
      <div class="row">
        <div class="col-md-2">
          <p>is there any Expectation Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['expectation_damages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>The facts state that while the contract price was $40,000, Developer only paid Painter $15,000. This is a difference in $25,000. Had the contract been fully performed, Painter would have received the additional $25,000; </p>
        </div>
        <div class="col-md-2">
          <p>Thus, $25,000 in expectation damages may be awarded</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there any Duty to Mitigate Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['contract']['mitigate_damages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Upon hearing that the drywall would not be ready in time for painting, Painter went out and found another painting job for her and her staff to complete; thus by finding other work which would generate income during the waiting period</p>
        </div>
        <div class="col-md-2">
          <p>Therefore Painter fulfilled the duty as a nonbreaching party to mitigate damages. </p>
        </div>
      </div>
      
      
      <hr />
      
      
  ￼</div><!-- end question 1 -->
      <div>
        <h3>QUESTION 2</h3>
        <p>Bob was an underpaid teller at Bank. On his lunch hour one day, he went into a store where he noticed a valuable necklace on the counter. He picked it up and put it in his pocket. Clare, a clerk at the store, approached Bob and asked him to put the necklace back. Bob punched Clare, returned the necklace to the counter, and fled back to Bank where he began waiting on customers.<br>
          <br>
      One customer was Fred, Bob's close friend, who put down a ten-dollar bill and asked Bob for a roll of quarters. Bob then told Fred that he would secretly pass him one hundred dollars if Fred would later give him one-half. Fred agreed and later the two split the cash.<br>
      The next morning when Bob went to work, Marilyn, the bank manager, began questioning him in her office. Alarmed at this, Bob grabbed a letter opener and stabbed Marilyn in her arm. Then Bob fled outside, jumped in a car, and drove to the house of Gina, his girlfriend. He told Gina what had happened. Gina decided to call the police, but Bob knocked her unconscious, put her in his car and went to Fred's house to hide her.<br>
      <br>
      Finding the door to Fred’s house locked, Bob broke in the door and hid Gina inside. At that point Fred appeared and protested to Bob. Bob struck Fred, pushing him down. As Fred fell, he knocked over a lamp and started a fire. Bob panicked and ran out of the house. The house began to burn. Fred got out alive, but Gina died in the fire.<br>
  What crimes, if any, did Bob commit? Discuss.</p>
       
       
       
       
      <h3>Solution</h3>
      <div class="row">
        <div class="col-md-12">
          <strong>Crime's of Bob</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Did bob do Larceny of Necklace?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['larceny']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, there was a "taking" when Bob put the necklace in his pocket from the store counter. There was a "carrying away" because he "moved" the necklace from its original location and he had the intent to permanently deprive because he put it in his pocket to steal a "valuable necklace" and when he got caught by the store clerk, he "returned the necklace to the counter and fled" back to his work.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will be charged with larceny of the necklace.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Is there Battery to Clare?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['battery']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Clare approached Bob and told him to put the necklace back, Bob punched Clare. He intended to punch her and commit battery on her because she caught him stealing the necklace. </p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will be charged with battery on Clare.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Was there a Solicitation of Fred for embezzlement?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['solicitation']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob told Fred that he would "secretly pass him a one hundred dollar bill" instead of the roll of quarters that he requested, Bob was soliciting, "urging" Fred to commit a crime of accepting stolen property that he was embezzling from the bank.  (reconsider this, something is not right)</p>
        </div>
        <div class="col-md-2">
          <p>Because the "urging" was completed, Bob will be charged with the solicitation of Fred for the crime of embezzlement.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Was there Conspiracy with Fred for Embezzlement?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['conspiracy']; ?></p>
        </div>
        <div class="col-md-5">
          <p>
Here, when Bob told Fred that he would secretly pass him the $100 and they would split it AND when Fred "agreed" and later split the cash with Bob, there was an "agreement" between Bob and Fred to steal / embezzle the $100 from the bank, an illegal goal.
</p>
        </div>
        <div class="col-md-2">
          <p>Bob will be charged with a separate charge of conspiracy with Fred.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Embezzlement of bank $100</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['embezzlement']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob purposely gave Fred the $100 instead of the roll of quarters, he took the money that was "lawfully in his possession" because he was a bank teller and used the money to perform his job. When Bob gave the $100 to Fred for them "to split the money" he intended to permanently deprive the bank of this money and did not intend to return it.
</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will be charged with embezzlement.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Battery of Marilyn?</p>
        </div>
        <div class="col-md-3">
          <p>Supra (<?php echo $rules['criminal']['battery']; ?>)</p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob became alarmed when Marilyn began questioning him about the $100, he stabbed her in the arm with a letter opener. Because his "intent" was to cause her bodily harm and he stabbed her that is, he committed a "harmful and offensive touching" to Marilyn.
</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will be charged with the battery of Marilyn.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Larceny of Car</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['larceny']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob fled outside the bank, because he "jumped in a car", it is presumed that it was not his car. If in fact, the car was not his or he did not have permission to use, a larceny may have been committed (grand theft) since he "took and carried” (drove away) the car of someone else. If Bob had the intent to NOT return the car, but to keep it or discard it when he was done with it, then there was an "intent to permanently deprive" and the elements of larceny are met.<br><br>
If, however, Bob was just "borrowing" the car in his moment of panic to flee the bank because he had just stabbed Marilyn in the arm, then this element may not be met if he did not have the "intent to permanently deprive" the rightful owner. Additionally, it must also be considered that Bob's fleeing may be considered part of the chain of events from the stabbing of Marilyn since he had not yet reached a place of relative safety.
</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob may be charged with larceny of the car.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Kidnapping of Gina (girlfriend)</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['kidnapping']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, because Bob knocked Gina unconscious and took her and put her in his car against her will because she was going to call the police, Bob "wrongfully took" Gina and "confined" her to the car when she was unconscious.
</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will be charged with the kidnapping of Gina.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Battery of Gina?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['battery']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob knocked Gina unconscious, he committed assault and battery on her. </p>
        </div>
        <div class="col-md-2">
          <p>He will also be charged with battery in addition to kidnapping Gina.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Will Bob be charged with Burglary of Fred's house?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['burglary']; ?></p>
        </div>
        <div class="col-md-5">
          <p>In this case, Bob went to Fred's house to hide Gina whom he had kidnapped. Because Fred's house was "locked", Bob "broke the door and hid Gina inside" without Fred's permission or knowledge. Therefore, Bob both under common law and modernly committed "breaking and entering". However, the facts do not indicate the time of day. If it was during daytime the common law element would not be met. However, modernly this requirement is waived. Because Bob entered "Fred's house" this is the dwelling house of another. Bob intended to break into Fred's house to "hide Gina who had kidnapped", which is a felony.<br><br>
The defense may argue that Bob had already committed the kidnapping when he knocked Gina unconscious and put her in the car, so the requirement to commit a felony inside of Fred's house is not met because he had already committed that crime. However, the prosecution will argue that Bob was still in the commission of committing the crime of kidnapping which would last the entire duration of her illegal confinement including when he took her to Fred's house to "hide her".
</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, it is likely that Bob will be charged modernly with Burglary of Fred's house.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Battery of Fred?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['battery']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, when Bob struck Fred when he "protested to Bob", and Bob "pushed him down", Bob committed assault and battery of Fred.</p>
        </div>
        <div class="col-md-2">
          <p>He will also be charged with battery to Fred.</p>
        </div>
      </div>
      
      
      <hr />
      
      <div class="row">
        <div class="col-md-2">
          <p>Arson of Fred's house?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['arson']; ?></p>
        </div>
        <div class="col-md-5">
          <p>In this case, because Fred fell and knocked over the lamp and started the fire, Bob did not intend to commit arson as he did not want or intend to start a fire.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will not be charged with the arson for the burning of Fred's house.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Homicide / Murder of Gina in Fire?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['homicide']; ?> <?php echo $rules['criminal']['murder']; ?> <?php echo $rules['criminal']['maliceAforethought']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, as discussed supra, Bob may be charged with both burglary and kidnapping and therefore the death of Gina occurred during the commission of an inherently dangerous felony and therefore malice is presumed for a charge of first-degree murder.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will likely be charged with first-degree murder under the Felony Murder Doctrine for the death of Gina in the fire.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>FIRST-DEGREE MURDER</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['firstDegreeMurder']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here the facts do not support that Bob intended the death of anyone and he did not plan in advance the death of Gina or anyone else.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob will not be charged with first-degree murder because there was no premeditation or specific intent to kill.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>SECOND-DEGREE MURDER</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['secondDegreeMurder']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, it can be argued that Bob's actions were wanton and reckless in that "he panicked and ran out of the house as it began to burn".
However, although a strong case can be made for second-degree murder, </p>
        </div>
        <div class="col-md-2">
          <p>Bob will be charged with first-degree murder under felony murder.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>AFFIRMATIVE DUTY TO ACT</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['affirmativeDutyToAct']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, because Bob knocked Gina unconscious, kidnapped her and took her to Fred's house which caught on fire, he had a duty to assist her in her peril and to attempt to save her. Because Bob fled and did not attempt to assist Gina out of the burning fire when he had an affirmative duty because he placed her in peril, </p>
        </div>
        <div class="col-md-2">
          <p>Bob will be charged with the murder of Gina.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>VOLUNTARY MANSLAUGHTER</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['voluntaryManslaughter']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, there is not evidence to support that a reasonable person would have been provoked to act as Bob did under the same circumstances.</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, Bob does not have a mitigating defense of adequate provocation and voluntary manslaughter will not apply.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      
      
      <div class="row">
        <div class="col-md-2">
          <p>INVOLUNTARY MANSLAUGHTER</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['criminal']['inVoluntaryManslaughter']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, because Bob did not intend to kill Gina, but his acts were extremely reckless, </p>
        </div>
        <div class="col-md-2">
          <p>Bob would at a minimum be charged with involuntary manslaughter if the felony murder charge did not hold up.</p>
        </div>
      </div>
      
      
      <hr />
      
  </div><!-- end question 2 -->

    
  <div>
      <p><strong>QUESTION 3</strong><br>
        David owns a herd of dairy animals from which he produces and sells milk and cheese. The animals in his herd are the product of cross-breeding domestic goats and a wild breed of sheep. They have the appearance and size of large goats, but have the much more aggressive character of bighorn sheep. In fact, the males have large curved horns similar to those of the bighorn and become aggressive when agitated.<br>
        One of the locks on a gate into a pen that held 40 of these animals was beginning to pull free from the wooden support post to which the lock was attached; a close inspection would have revealed that the wood was rotting around the screws that attached the lock to the 10-year-old post. Unfortunately, David failed to examine the gate support post when he performed his regular semi-annual inspection of the fencing on his land. Eventually the lock in fact pulled out, the gate swung open, and the animals wandered onto neighboring land.<br>
        Peter, David’s next-door neighbor, found most of the animals on his land. Peter attempted to herd the animals back onto David’s land, using an electric cattle prod to deliver shocks to them when they wouldn’t move as he wished. When Peter shocked one of the larger horned males, it turned and rammed him, knocking him to the ground. After Peter was driven to the ground, the animal continued butting him, striking Peter quite a few times in the head and upper body. The attack left Peter with a serious concussion and broken bones.<br>
        Peter went to the local hospital emergency room (ER), where his broken bones were set. Even though Peter mentioned having a headache, the ER doctor and nurses didn’t examine him for concussion or other head injury. Peter failed to report to them that the animal had directly struck his head. Later that day, Peter suffered a cerebral hemorrhage (bleeding in the brain), with paralysis in his upper limbs.<br>
        1. What tort causes of action, if any, can Peter reasonably assert against David? Discuss.<br>
        2. What defenses, if any, can David reasonably raise? Discuss.<br>
        3. What damages, if any, will Peter be able to obtain against David? Discuss.</p>
    
      
      <h3>Solution</h3>
      <div class="row">
        <div class="col-md-12">
          <strong>1. What tort causes of action, if any, can Peter reasonably assert against David? Discuss.</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>  
      
      <div class="row">
        <div class="col-md-2">
          <p>Strict Liability</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['strictLiability']; ?><br><br>
            <?php echo $rules['tort']['strictLiabilityAnimals']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Here, David owned a herd of dairy animals. Although goats are domestic animals, they were cross-bred with a wild breed of sheep. In addition, they have the aggressive character of bighorn sheep, which is known to the owner. Peter was driven to the ground by one of the larger horned males which escaped the farm. The animal rammed Peter, knocking him to the ground and butted him. Animal acted based on its nature and known dangerous propensities making David strictly liable for Peter's injuries. Peter sustained a concussion and broken bones, which are foreseeable outcomes of being rammed by a wild bighorn sheep.
</p>
        </div>
        <div class="col-md-2">
          <p>David will be strictly liable for injuries sustained by Peter.</p>
        </div>
      </div>
      
      
      <hr />
      
      <div class="row">
        <div class="col-md-2">
          <p>Negligence?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligence']; ?></p>
        </div>
        <div class="col-md-5">
        </div>
        <div class="col-md-2">
          <p></p>
        </div>
      </div>
      
      <hr />
      
      <div class="row">
        <div class="col-md-2">
          <p>Duty</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligenceDuty']; ?></p>
        </div>
        <div class="col-md-5">
          <p>
David owed a duty of care of a reasonably prudent person to avoid subjecting others to unreasonable risk of harm. Owning cross-bred animals, the standard of care would be to exercise care to ensure securing the animals. This would include inspection and maintenance of the lock of the gate and fences. Although he conducted semi-annual inspection of the fencing of his land, he failed to examine the gate support. David owed a duty to all foreseeable plaintiffs. Under Palsgraf case, the majority Cardozo view imposed duty on all plaintiffs within the zone of danger. Peter was a next- door neighbor and was therefore within the zone of danger under Cardozo view. Under Andrews view, which was the minority view, the duty of care is owed to everyone.
</p>
        </div>
        <div class="col-md-2">
          <p>David owed a duty of care to Peter.</p>
        </div>
      </div>
      
      <hr />
      
      <div class="row">
        <div class="col-md-2">
          <p>Breach of Duty</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligenceBreach']; ?></p>
        </div>
        <div class="col-md-5">
          <p>
Breach occurs when defendant's act falls below the standard of care established. Here, the standard of care was that of a reasonably prudent farmer, one that would exercise care to keep his animals within his farm. His duty included securing the lock of the gate which, as facts stipulate, David failed to do.

</p>
        </div>
        <div class="col-md-2">
          <p>David breached his duty to Peter by failure to examine the gate.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Actual cause- "But-for"</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligenceActualCause']; ?></p>
        </div>
        <div class="col-md-5">
          <p>
David's breach was the actual cause of Peter's injuries since but for David's failure to examine the gate and secure it, keeping the animals within the farm, Peter would not be injured by the bighorn sheep. David was also a substantial factor for Peter's injuries sustained by ER doctor's failure to examine for concussion.


</p>
        </div>
        <div class="col-md-2">
          <p>Therefore, David was the actual cause of Peter's injuries.</p>
        </div>
      </div>
      
      
      <hr />
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Proximate Cause</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligenceProximateCause']; ?></p>
        </div>
        <div class="col-md-5">
          <p>
David's failure to examine the gate was the proximate cause of Peter's injuries. Proximate cause has to pass the foreseeability test. It was foreseeable that had the gate lock failed to be secured or properly supported, the animals would escape and injure someone. David was also the proximate cause of injuries sustained by ER doctor's failure to examine as it was a natural and foreseeable consequence, since he created the peril. Although the ER's failure to examine was an intervening cause, it was foreseeable and both tortfeasors contributed to Peter's injuries.



</p>
        </div>
        <div class="col-md-2">
          <p>David was the proximate cause of Peter's injuries.</p>
        </div>
      </div>
      
      
      <hr />
      
        
      
      
      <div class="row">
        <div class="col-md-2">
          <p>Damages?</p>
        </div>
        <div class="col-md-3">
          <p><?php echo $rules['tort']['negligenceDamages']; ?></p>
        </div>
        <div class="col-md-5">
          <p>Peter sustained head injury, concussion and broken bones. He will recover both for pain and suffering and for medical bills incurred.</p>
        </div>
        <div class="col-md-2">
          <p>conclusion</p>
        </div>
      </div>
      
      
      <hr />
      
      
    <div class="row">
        <div class="col-md-12">
          <strong>2. What defenses, if any, can David reasonably raise? Discuss.</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>  
      
      
      <div class="row">
        <div class="col-md-12">
          <strong>3. What damages, if any, will Peter be able to obtain against David? Discuss.</strong>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <strong>Issue</strong>
        </div>
        <div class="col-md-3"><strong>Rule</strong></div>
        <div class="col-md-5"><strong>Analysis</strong></div>
        <div class="col-md-2"><strong>Conclusion</strong></div>
      </div>  
    
    
  </div><!-- end question 3 -->
  
    <div><strong>QUESTION 4</strong><br>
    Jack, a retiree, plans to build a new home on his vacant property. He decided to use a particular product called “Austin Brown Stone” for the exterior walls, and estimated he would need about 100 tons of stone.<br>
    Jack drafted a contract to present to Stone-Co, a local stone distributor, in which Jack agreed: (i) to buy all the Austin Brown Stone he needs to build the exterior walls of his house, (ii) at a price of $200 per ton, (iii) to be delivered to his property in 5-ton lots within 10 days following each request for 5 tons, (iv) to be paid for upon delivery. To ensure timely deliveries, Jack included a liquidated damages clause which provided that Stone-Co would pay $5,000 per day for each day that any requested delivery is late.<br>
    Jack signed and dropped off the contract to Stone-Co for its review and signature. That evening, the Stone-Co salesperson, knowing that Austin Brown Stone is often not easily obtained, wrote the following just below Jack’s liquidated damages clause: “Notwithstanding the foregoing, if Stone-Co has difficulty getting Austin Brown Stone, Stone-Co may substitute Austin White Stone.”<br>
    The Stone-Co salesperson then signed the contract and returned it to Jack the next day. Jack did not read the modified contract or see the term added by Stone-Co.<br>
    One week later, Jack made a request for the first 5 tons of Austin Brown Stone, and Stone-Co started looking for a supplier. Stone-Co quickly discovered that Austin Brown Stone was not available in the United States. Although it could be imported from Canada, importing it would add $25 per ton to Stone-Co’s expenses and reduce its profit margin.<br>
    Ten days after Jack’s order, Stone-Co delivered Austin White Stone with a note stating that Austin Brown Stone was not available in the U.S., and a demand for payment at the new price of $225 per ton. Jack immediately called the Stone-Co salesperson, stating he would not accept the substitution because Austin White Stone is a completely different product.<br>
    Jack contracted with another supplier for Austin Brown Stone at $225 per ton. Jack thereafter filed a lawsuit against Stone-Co seeking damages for breach of contract and liquidated damages.<br>
    1. What is Jack’s likelihood of success in his lawsuit and what damages, if any, would he be entitled to? Discuss.<br>
  2. What defenses, if any, can Stone-Co reasonably assert? Discuss.</div><!-- end question 4 -->
</div>
<?php include('../footer.php'); ?>