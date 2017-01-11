<?php

$issueArray = array(
                'decide' => array('label' => 'decide', 'issue' => 'Intent'),
              );
$rulesArray = array(
'contract' => array('label' => 'CONTRACT', 'rule' => 'A contract is a legally binding or valid agreement between two parties.'),
'valid_contract' => array('label' => 'VALID CONTRACT', 'rule' => 'The law will consider a contract to be valid if the agreement contains all of the following elements:

1. offer and acceptance;
2. intention;
3. consideration to be paid for the promise made;
4. capacity of the parties in terms of age and mental ability
5. legally enforceable terms and conditions
  '),
'governing_law' => array('label' => 'GOVERNING LAW', 'rule' => 'The sale of goods, those items moveable and tangible at the time of identification to the contract are governed by the UCC. All other contracts are governed by the common law.'),
'anticipatory_breach' => array('label' => 'ANTICIPATORY BREACH', 'rule' => 'A breach of contract caused by a party’s unequivocally repudiating the contract, i.e. indicating that he will not perform when performance is due.', 'rule2' => 'ANTICIPATORY BREACH is the unequivocal communication of a repudiation of a contract duty before that duty is due to be performed. The act allows the non-breaching party to treat as a BREACH and immediately take all legal remedies and seek to mitigate.', 'rule3' => 'An anticipatory breach occurs when one party to a contract makes it clear prior to the time performance is due that he or she will not perform.'),
'breach' => array('label' => 'BREACH', 'rule' => 'BREACH is a non-performance of a required contract duty.', 'rule2' => 'A breach of contract is a failure of one party to a contract to perform his/her duties under the contract.', 'rule3' => 'A breach of contract occurs when one party to a contract fails to perform pursuant to the terms of the contract.'),
'material_breach' => array('label' => 'MATERIAL BREACH', 'rule' => 'A substantial breach of contract usually excusing the harmed party from further performance and giving him the right to sue for damages.', 'rule2' => 'A MATERIAL BREACH is where the non-breaching party is deprived of the substantial benefit of the bargain.'),
'minor_breach' => array('label' => 'MINOR BREACH', 'rule' => 'Also referred to as partial breach, it is a breach of contract that is less severe than a material breach and it gives the harmed party the right to sue for damages but does not usually excuse him from further performance.', 'rule2' => 'A MINOR BREACH is where the contract is substantially performed but not completely.'),
  
'liquidated_damages' => array('label' => 'LIQUIDATED DAMAGES', 'rule' => 'Liquidated damages are those damages that are agreed to in a con­tract in advance of any breach of contract and will be enforced by the courts if deemed reasonable.'),
'compensatory_damages' => array('label' => 'COMPENSATORY DAMAGES', 'rule' => 'Compensatory damages are those damages that are awarded to the non-breaching party to place that party back into the same position that he or she would have been in had the contract been performed as agreed to.'),
'consequential_damages' => array('label' => 'CONSEQUENTIAL DAMAGES', 'rule' => 'Consequential Damages arises when a contract is broken by a breach of contract by one party to the contract.'),
'nominal_damages' => array('label' => 'NOMINAL DAMAGES', 'rule' => 'Nominal damages are those damages that are given by the court to a non-breaching party who has suffered no damages or who has been unable to prove such damages at the trial, but who nevertheless have been wronged and is entitled to a judgment for technical breach of contract.'),

);

function contract_formation($parties, $price, $quantity, $subject, $date) {
  $string = "CONTRACT FORMATION
Here, a contract exists because certain and definite terms have been agreed including Parties ($parties), Price ($price), Quantity ($quantity), Subject ($subject), Performance Date ($date).";
  return $string;
}
?>