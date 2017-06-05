<?php
$folder = 'contracts';
include('Rules.php');
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Contracts</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="style.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../scripts/jquery.floatThead.js"></script>

</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top" id="navs">
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
      <div class="table-responsive style="overflow:auto;"">
        <table class="table table-bordered table-striped with-responsive-wrapper">
          <thead> 
            <tr> 
              <th class="year">Year</th> 
              <th class="essay">Essay</th> 
              <th class="th">Call of Question</th>
              <th class="th">Governing Law</th>
              <th class="merchants">Merchants</th>
              <th class="th">Contract Formation</th>
              <th class="th400">Offer</th>
              <th class="th">Termination</th>
              <th class="th300">Rejection</th>
              <th class="th300">Acceptance</th>
              <th class="th300">Differing Terms - UCC 2-207 "Battle of the Forms"</th>
              <th class="th300">Consideration</th>
              <th class="th300">Statute of Frauds</th>
              <th class="th400">Confirmatory Letter between Merchants</th>
              <th class="th300">Constructive Condition of Good Faith and Fair Dealing Between Merchants</th>
              <th class="th300">Breach</th>
              <th class="th300">Parol Evidence Rule</th>
              <th class="th">Remedies</th>
              <th class="th300">Specific Performance</th>
              <th class="th300">Expectation Damages</th>
              <th class="th300">Consequential Damages - Hadley vs Baxendale</th>
              <th class="th300">Incidental Damages</th>
              <th class="th300">Compensation Damages</th>
              <th class="th300"></th> 
            </tr> 
          </thead>
          <tbody> 
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>5</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Q0</td>
              <td>Q0</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Q1</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2016</th>
              <td><?php @include($folder.'/october2016.php'); ?></td>
              <td>1. Is Buyer likely to prevail against Dealer in his suit for breach of contract? Discuss.<br>
              2. If so, is the court likely to grant Buyer&rsquo;s request for specific performance? Discuss</td>
              <td><strong>Rule:</strong> <?php echo Contracts::isUCC; ?><br>
<br>
              <strong>Analysis:</strong> Here, the facts indicate that the deal in question is a handgun in exchange for money.
A handgun is tangible and there is no indication that the handgun in question was
permanently affixed to real estate.
<br>
<br>
              <strong>Conclusion:</strong> The U.C.C. will govern this contract because it is for the sale of goods .</td>
              <td><strong>Rule:</strong> <?php echo Contracts::merchant; ?><br>
<br>
              <strong>Analysis:</strong> Regarding Dealer, the facts indicate that Dealer "operates an antique shop." Since the
item in question is an antique, it seems reasonable to conclude that Dealer is a
merchant. The only factor that may lie against considering Dealer a merchant is that
Dealer needed to research the item before obtaining its true value. Perhaps, Dealer
could argue that this is evidence that he does not possess the requisite expertise to be
qualified as a merchant. However, balancing both sides, Dealer will likely be found to
be a merchant.<br><br>
Regarding Buyer, the facts do not indicate that Buyer is a merchant. We know nothing
of Buyer other than that he agreed to purchase the gun.
<br>
<br>
              <strong>Conclusion:</strong> Dealer will be held to merchant rules while Buyer will be held to non-merchant rules. </td>
              <td><strong>Rule:</strong> <?php echo Contracts::contractFormation; ?></td>
              <td><strong>Rule:</strong> <?php echo Contracts::offer; ?><br>
<br>
              <strong>Analysis:</strong> Here, Dealer showed Buyer pictures of the handgun and the facts state that they came
to an agreement on a price of $2,000. The facts do not clearly identify whether the
$2,000 offer was made by Dealer or Buyer.
 <br>
<br>
              <strong>Conclusion:</strong> An offer was made by either Dealer or Buyer.</td>
              <td> &nbsp;</td>
              <td>&nbsp;</td>
              <td><strong>Rule:</strong> <?php echo Contracts::acceptanceUCC; ?><br>
<br>
              <strong>Analysis:</strong> Here, the facts state that the parties "shook hands on a deal." Traditionally, this is a
manifestation of agreement to terms. Since both parties shook hands, both parties
agreed to the terms. It therefore matters not whether the offer was by Dealer for
Buyer's acceptance, or by Buyer for Dealer's acceptance -- either way, it was accepted.
Since the parties immediately prior to the acceptance had verbally negotiated an offer, it
would not appear that the offer was terminated before acceptance. Since the offer did
not include a specified means of acceptance, the method of acceptance must be
reasonable, and there are no facts that would indicate that a handshake was
unreasonable. Indeed, since both offeror and offeree participated in the handshake,
and offeror made no objection, it would seem that the offeror consented to that method
of acceptance.
<br>
<br>
              <strong>Conclusion:</strong> The offer was accepted by the offeree.</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2016 II</th>
              <td><?php @include($folder.'/october2016_2.php'); ?></td>
              <td>1. Can Owner prevail in her lawsuit against Contractor? Discuss.<br>
                2. If so, can Owner recover<br>
                a. The $10,000 in increased costs for the heating system? Discuss.<br>
                b. The lost profits for the delay in opening the restaurant? Discuss.<br>
                c. The value of the tax reduction? Discuss.<br>
              3. Can Son prevail in his lawsuit against Owner? Discuss.</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>11</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
              <td>15</td>
              <td>19</td>
              <td>16</td>
              <td>17</td>
              <td>18</td>
              <td>20</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">&nbsp;</th>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q1</td>
              <td>Q2</td>
              <td>Q2</td>
              <td>Q2</td>
              <td>Q2</td>
              <td>Q2</td>
              <td>Q2</td>
              <td>&nbsp;</td>
            </tr>
            <tr> 
              <th scope="row">June 2016</th> 
              <td><?php @include($folder.'/june2016.php'); ?></td> 
              <td>1. Can Bill prevail in his lawsuit? Discuss.<br>
              2. If so, what damages, if any, is Bill entitled to recover? Discuss.</td>
              <td>
                <strong>Rule:</strong> <?php echo Contracts::isUCC; ?><br>
                <strong>Analysis:</strong> Here, the contract is for the sale of a 1939 Denny Wilson baseball card which is a good.<br>
                <strong>Conclusion:</strong> Therefore, UCC applies.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::merchant; ?><br>
                <br>
                <strong>Sara as Merchant</strong><br>
                <strong>Issue:</strong> Here, Sara is a doctor who collects, buys, sells and trades baseball cards for a profit averaging 15 transactions a week and is a recognized expert in the 1939-50 era. Typically, collectors will not be seen as merchants especially when they make their living by other means, as evidenced here in that Sara is a doctor, but Sara's recognition of being an "expert in the 1939-50 era" along with her frequency of transactions, 15 transactions a week will likely place her in the eyes of the court as a merchant since a typical collector, non-merchant, would not be recognized as an expert nor would they engage in 15 transactions a week. Further Sara's expertise pertains to the contract in question, a 1939 Denny Wilson card.
                  <br>
                  <strong>Conclusion:</strong> Therefore Sara will be seen as a merchant.
                  <br>
                <br>
                <strong>Bill as Merchant</strong><br>
                <strong>Issue:</strong> Bill operates a store that regularly sells baseball cards. Bill's business is that of selling baseball cards and will also be seen as a merchant.<br>
                <strong>Conclusion: </strong>Therefore, both parties will be seen as merchants.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::contractFormation; ?></td>
              <td><strong>Rule:</strong> <?php echo Contracts::offer; ?>
              <br>
              <strong>Issue:</strong> Here Bill will argue that he phoned Sara and offered to buy a 1939 Denny Wilson card for $550. Under the UCC only the quantity is required to establish a valid offer but here we have most of the essential terms as follows:<br><br>
Quantity - 1 baseball card<br>
Identity of parties - Bill and Sara<br>
Price - $550<br>
Subject matter - 1939 Denny Wilson baseball card<br><br>
The only material term which is not given in the facts is that of time for performance; under the UCC a reasonable time will be imputed as a gap filler.<br>
The offer was communicated to Sara, the offeree, by telephone and thus created the power of acceptance.
￼￼<br><br>
Sara will argue that Bill only asked "would you consider taking $550" for the card and that she replied okay send me something in writing, which she will argue would be a written offer as contracts for the sale of goods in excess of $500 need to be in writing.<br><br>
The court will have to decide whether or not Bill's phone call to Sara was in fact an offer or an invitation to negotiate. It is likely that under either party's interpretation of the phone call a valid offer was made because Sara's saying "okay" to Bill's alleged question of "would you consider taking $550" will equate to an acceptance and mere acknowledgement of the Statute of Frauds requirement that it be in writing.
<strong><br>
<br>
Conclusion: </strong>Therefore, valid offer. </td>
              <td><strong>Rule:</strong> <?php echo Contracts::termination; ?></td>
              <td><strong>Rule:</strong> <?php echo Contracts::rejection; ?><br>
                <strong><br>
                Analysis:</strong> Here, Sara will argue that her selling of the baseball card to another party should be seen by the court as a valid rejection to the terms of the offer, selling Bill the same card, and that it was done prior to acceptance.<br><br>
Bill will argue that Sara accepted his offer to buy the card for $550 prior to Sara's selling of the baseball card to another party and thus makes the rejection invalid.<br>
<br>
As discussed above, the courts will likely view Bill and Sara's phone conversation as having culminated in a valid acceptance and Sara's argument for rejection will fail.<br>
            <strong><br>
            Conculsion:</strong> Therefore, no rejection. </td>
              <td><strong>Rule:</strong> <?php echo Contracts::acceptanceUCC; ?>, <?php echo Contracts::acceptanceCL; ?><br><br>
              <strong>Analysis: </strong>Bill will argue, as the facts state, that he phoned Sara and offered to buy a 1939 Denny Wilson baseball card for $550 and that Sara accepted.<br><br>
Sara will argue that Bill only asked "would you consider taking $550 for the card" and that she only accepted an invitation to negotiate and not an offer.<br><br>
As discussed supra, it is likely that under either party's interpretation of the phone call a valid offer was made because Sara's saying "okay" to Bill's alleged question of "would you consider taking $550" will equate to an acceptance because she made no reference to needing to think about it or review the terms prior to acceptance and statement "send me something in writing" will equate to a mere acknowledgement of the Statute of Frauds requirement that a contract for the sale of goods in excess of $500 be in writing.<br><br>
<strong>Conclusion:</strong> Therefore, valid acceptance.
              </td>
              <td><strong>Rule:</strong> <?php echo Contracts::differingTermsBattleOfForms; ?><br><br>
              <strong>Analysis:</strong> Here, Bill sent a confirmation letter including the following term: "Seller shall provide a certificate of authenticity from the Baseball Trading Cards Association." This additional term will likely be seen by the court as materially altering the contract because the
￼￼
typical cost of such a certificate is $100, nearly 20% of the original agreed upon price, and would significantly, or materially, alter the value of the card from $550 to $800. Bill and Sara had not discussed the additional term of a certificate of authenticity and thus no agreement had been made.<br><br>
Under UCC 2-207 the additional term would normally not be allowed to enter the contract and the card will be seen to have a fair market value of $550. However, if is found that Sara did not respond to the confirmatory memo within 10 days the added term could enter the contract as she failed to object within a reasonable amount of time.<br><br>
The facts state that "Bill called later" and it is reasonable to infer that the statement means he called later that day and not later that month, i.e. after 10 days. Based on this presumption the added term of a certificate of authenticity will be barred from entering the contract.<br>
<br>
              <strong>Conclusion:</strong> Therefore, no added term.
             </td>
              <td><strong>Rule:</strong> <?php echo Contracts::consideration; ?><br>
<br>
              <strong>Analysis:</strong> Here Bill promised to pay $550 and Sara promised to supply a 1939 Denny Wilson card. <br>
<br>
              <strong>Conclusion:</strong> Therefore, valid consideration.
             </td>
              <td><strong>Rule:</strong> <?php echo Contracts::statuteOfFraud; ?> <br>One such type of contract is that for the sale of goods in excess of $500.<br>
<br>
              <strong>Analysis:</strong> Here, the contract was for the sale of a baseball card for $550 and thus must be in writing. <br>
<br>
              <strong>Conclusion:</strong> Therefore, Statute of Frauds applies.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::confirmatoryLetter; ?><br>
<br>
              <strong>Analysis:</strong>  As discussed above, both Sara and Bill will be seen as merchants in the eyes of the court and thus Bill's unsigned, typed letter confirming the contract and identifying the parties and subject matter written on a letterhead identifying the name of Bill's business will be seen as satisfying the statute of frauds. The fact that the letter was "unsigned" is of no consequence because the letterhead will suffice as the signing and only one party, not the party to be charged needs to sign.
Sara will have 10 days to object to the confirmatory letter after which it becomes binding as a matter of law. The facts state that "Bill called her later" the court will have to decide whether it was later that day or after 10 days had passed.
Sara's argument that the letter of confirmation had no legal effect will be valid if she objected within 10 days of its receipt but the facts state that she "did not respond to it" and the courts are likely to view Sara's failure to respond in a seasonable time to the letter of confirmation satisfying the statute of frauds as matter of law.
<br>
<br>
              <strong>Conclusion:</strong> Therefore, statute of frauds is satisfied.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::merchantConstructiveCondition; ?><br>
<br>
              <strong>Analysis:</strong>  Bill will argue that Sara's failure to respond to the letter of confirmation was a breach of the implied covenant of good faith and fair dealing because a reasonable merchant would let another merchant know of their intent.<br>
<br>
              <strong>Conclusion:</strong> The court will likely view this as a breach of the implied constructive condition under the UCC.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::breach; ?><br>
<br>
              <strong>Analysis:</strong> Here Bill will argue that because Sara sold the card to another party when she was contractually obligated to sell the card to him she is in breach of their contract for the sale of the card for $550. <br>
<br>
              <strong>Conclusion:</strong> The court will view Sara as being in breach of the contract and will hold her liable for all foreseeable damages naturally flowing from her breach absent any valid defenses.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::parolEvidenceRule; ?><br>
<br>
              <strong>Analysis:</strong> Here Sara may attempt to admit her recollection of the phone conversation to combat the legal effectiveness of the acceptance;  <br>
<br>
              <strong>Conclusion:</strong> however, as discussed above her argument is likely to fail.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::remedies; ?></td>
              <td><strong>Rule:</strong> <?php echo Contracts::specialDamage; ?><br>
<br>
              <strong>Analysis:</strong>  Here, Bill will seek specific performance in order to obtain the 1939 Denny Wilson card. He will argue this item is particularly unique and monetary damages will be inadequate compensation.
<br>
<br>
              <strong>Conclusion:</strong> As the facts stipulate Sara sold the card to another party, if Sara has already tendered the goods and concluded the transaction, it is likely a court would not disrupt an additional contract with a good faith buyer. If Sara has not yet tendered the goods, then a court may award specific performance if the baseball card is deemed unique.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::expectedDamage; ?><br>
<br>
              <strong>Analysis:</strong>  Bill will seek damages in the amount of $250 which he considers his expectation damages under the contract due to the fair market value of the card being $800. However, since that price was conditioned upon a certificate of authenticity and that was an additional term, the court may or may not allow it which would alter his ability to recover.<br><br>
If the court allows the additional term, Bill will be able to recover the $250; but if they bar the additional term under the UCC 2-207 then Bill will likely only recover $25 as evidenced by the fact that Sara sold the card to another party, as-is without a certificate of authenticity, for only $575. The contract price was $550 so the difference between the contract price and the fair market value, $575, would be $25.<br>
<br>
              <strong>Conclusion:</strong> Bill will likely only recover $25.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::consequentialDamage; ?><br>
<br>
              Bill will be able to recover consequential damages if he has any.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::incidentalDamage; ?><br>
<br>
              <strong>Analysis:</strong>  Here the facts do not indicate that Bill has suffered any damages of this kind <br>
<br>
              <strong>Conclusion:</strong> but if he were to he would be able to recover those damages as well.</td>
              <td><strong>Rule:</strong> <?php echo Contracts::compensationDamage; ?></td>
              <td>&nbsp;</td> 
            </tr>
            <tr> 
              <th scope="row">October 2015</th> 
              <td><?php @include($folder.'/october2015_1.php'); ?></td> 
              <td>1. Who breached the contract? Discuss.<br>
                2. Assuming Painter breached the contract, what damages, if any, would Developer be entitled to? Discuss.<br>
              3. Assuming Developer breached the contract, what damages, if any, would Painter be entitled to? Discuss.</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td> 
            </tr>
            <tr>
              <th scope="row">June 2015</th>
              <td><?php @include($folder.'/june2015.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2014</th>
              <td><?php @include($folder.'/october2014.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2014</th>
              <td><?php @include($folder.'/june2014.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2013</th>
              <td><?php @include($folder.'/october2013.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2013</th>
              <td><?php @include($folder.'/june2013.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2012</th>
              <td><?php @include($folder.'/october2012.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2012</th>
              <td><?php @include($folder.'/june2012.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2011</th>
              <td><?php @include($folder.'/october2011.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2011</th>
              <td><?php @include($folder.'/june2011.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2010</th>
              <td><?php @include($folder.'/october2010.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2010</th>
              <td><?php @include($folder.'/june2010.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2009</th>
              <td><?php @include($folder.'/october2009.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2009</th>
              <td><?php @include($folder.'/june2009.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2008</th>
              <td><?php @include($folder.'/october2008.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2008</th>
              <td><?php @include($folder.'/june2008.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2007</th>
              <td><?php @include($folder.'/october2007.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2007</th>
              <td><?php @include($folder.'/june2007.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2006</th>
              <td><?php @include($folder.'/october2006.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2006</th>
              <td><?php @include($folder.'/june2006.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2005</th>
              <td><?php @include($folder.'/october2005.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2005</th>
              <td><?php @include($folder.'/june2005.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2004</th>
              <td><?php @include($folder.'/october2004.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2004</th>
              <td><?php @include($folder.'/june2004.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2003</th>
              <td><?php @include($folder.'/october2003.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2003</th>
              <td><?php @include($folder.'/june2003.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">October 2002</th>
              <td><?php @include($folder.'/october2002.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <th scope="row">June 2002</th>
              <td><?php @include($folder.'/june2002.php'); ?></td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <blockquote>&nbsp;</blockquote>
  </div>

</div><!-- /.container -->

<script type="text/javascript">
  function pageTop(){
    return $("#navs").height();
  }

    $(function(){
        $(".table.with-responsive-wrapper").floatThead({
            top: pageTop,
            responsiveContainer: function($table){
                return $table.closest(".table-responsive");
            }
        });
        $(".table.without-responsive-wrapper").floatThead();
    });
</script>
</body>
</html>