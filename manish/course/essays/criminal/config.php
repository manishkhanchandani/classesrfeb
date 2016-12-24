<?php

$issueArray = array(
                'decide' => array('label' => 'decide', 'issue' => 'Intent'),
                'burn' => array('label' => 'burn', 'issue' => 'Arson'),
                'contact' => array('label' => 'contact', 'issue' => 'Solicitation / Conspiracy / Withdrawal / Accomplice'),
                'assist' => array('label' => 'assist', 'issue' => 'Solicitation / Conspiracy / Withdrawal / Accomplice'),
                'kill' => array('label' => 'kill', 'issue' => 'Homicide / Murder / Voluntary Manslaughter / Involuntary Manslaughter'),
              );
$rulesArray = array(
                'solicitation' => array('label' => 'SOLICITATION', 'rule' => 'Solicitation is the intentional asking of another to commit an unlawful act.'),
  
                'conspiracy' => array('label' => 'CONSPIRACY', 'rule' => 'Conspiracy is the intentional agreement between two or more persons to commit an unlawful act.'),
  
                'pinkertonRule' => array('label' => 'PINKERTON RULE', 'rule' => 'The Pinkerton rule provides that coconspirators are guilty for the crimes of their coconspirators that are in furtherance of the intended unlawful act.'),
  
                'withdrawal' => array('label' => 'WITHDRAWAL', 'rule' => 'To withdraw from a conspiracy one must notify the coconspirators of intent to withdraw before the unlawful act is committed.'),
  
                'arson' => array('label' => 'ARSON', 'rule' => 'Arson is the malicious burning of the dwelling house of another.'),
  
                'malicious' => array('label' => 'MALICIOUS', 'rule' => 'Malicious can mean an intent to burn or established by reckless behavior.'),
  
                'burning' => array('label' => 'BURNING', 'rule' => 'Burning means that the dwelling must be at least charred or burned, blackened or smoke damage will not suffice. Modernly, dwelling house has been removed and any structure of another will suffice.'),
  
                'homicide' => array('label' => 'HOMICIDE', 'rule' => 'Homicide is the killing of one human being by another. There must be a causal connection between the killing and the person to be charged.'),
  
                'murder' => array('label' => 'MURDER', 'rule' => 'Murder is the killing of a human being with malice aforethought.'),
  
                'maliceAforethought' => array('label' => 'Malice aforethought', 'rule' => 'Malice aforethought can be established by one of four ways: intent to kill, intent to cause serious bodily injury, wanton and willful misconduct and felony murder.'),
  
                'felonyMurder' => array('label' => 'FELONY MURDER', 'rule' => 'Felony murder is murder that occurs during the commission of an inherently dangerous crime such as arson, rape, robbery, and burglary.'),
  
                'firstDegreeMurder' => array('label' => 'FIRST DEGREE MURDER', 'rule' => 'First degree murder is established by intent to kill by premeditation and deliberation or felony murder.'),
  
                'secondDegreeMurder' => array('label' => 'SECOND DEGREE MURDER', 'rule' => 'Second degree murder is default murder which is not first degree murder.'),
              );

?>