<?php

$issueArray = array(
                'decide' => array('label' => 'decide', 'issue' => 'Intent'),
                'burn' => array('label' => 'burn', 'issue' => 'Arson'),
                'contact' => array('label' => 'contact', 'issue' => 'Solicitation / Conspiracy / Withdrawal / Accomplice / Pinkerton’s rule / Misprision of a felony'),
                'assist' => array('label' => 'assist', 'issue' => 'Solicitation / Conspiracy / Withdrawal / Accomplice / Pinkerton’s rule / Misprision of a felony'),
                'ask' => array('label' => 'ask', 'issue' => 'Solicitation / Conspiracy / Withdrawal / Accomplice / Pinkerton’s rule / Misprision of a felony'),
                'kill' => array('label' => 'kill', 'issue' => 'Homicide / Murder / Voluntary Manslaughter / Involuntary Manslaughter / Actual Cause / Proximate Cause'),
                'fire' => array('label' => 'fire', 'issue' => 'Arson / Actual Cause / Proximate Cause'),
                'burn' => array('label' => 'burn', 'issue' => 'Arson / Actual Cause / Proximate Cause'),
              );
$rulesArray = array(
                'solicitation' => array('label' => 'SOLICITATION', 'rule' => 'Solicitation is the intentional asking of another to commit an unlawful act.'),
  
                'conspiracy' => array('label' => 'CONSPIRACY', 'rule' => 'Conspiracy is the intentional agreement between two or more persons to commit an unlawful act.'),
  
                'accompliceLiability' => array('label' => 'ACCOMPLICE LIABILITY', 'rule' => 'Any person who aids, abets, or assists a principal in committing a crime with the specific intent that the crime be carried out will be held liable for accomplice liability.'),
  
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
  
                'proximateCause' => array('label' => 'PROXIMATE CAUSE', 'rule' => 'Proximate cause is a natural and foreseeable consequence of one’s act where there are no unforeseeable intervening factors.'),
  
                'actualCause' => array('label' => 'ACTUAL CAUSE', 'rule' => 'An act whose direct result is the plaintiff’s harm, and which satisfies the “But For" or Substantial Factor Test.'),
  
                'butFor' => array('label' => 'BUT FOR', 'rule' => 'An act or circumstance that causes an event, where the event would not have happened had the act or circumstance not occurred.'),
  
                'SubstantialFactor' => array('label' => 'SUBSTANTIAL FACTOR', 'rule' => 'The principle by which two or more defendants will be liable if their joint actions caused the plaintiff’s harm but their individual actions alone would have resulted in the same harm.'),
  
                'manslaughter' => array('label' => 'MANSLAUGHTER', 'rule' => 'The principle by which two or more defendants will be liable if their joint actions caused the plaintiff’s harm but their individual actions alone would have resulted in the same harm.'),
  
                'voluntaryManslaughter' => array('label' => 'VOLUNTARY MANSLAUGHTER', 'rule' => 'An intentional killing reduced from murder to manslaughter because of adequate provocation of the defendant.'),
  
                'involuntaryManslaughter' => array('label' => 'INVOLUNTARY MANSLAUGHTER', 'rule' => 'Homicide that is committed without the intent to kill, but with criminal recklessness or negligence; or a death that results during the commission of or flight from a misdemeanor or felony that is not encompassed by the felony-murder rule.'),
  
                'defenses' => array(
                      'infancy' => array('label' => 'infancy', 'rule' => ''),
                      'insanity' => array('label' => 'insanity', 'rule' => ''),
                      'specificIntent' => array('label' => 'specificIntent', 'rule' => ''),
                      'generalIntent' => array('label' => 'generalIntent', 'rule' => ''),
                      'involuntaryIntoxication' => array('label' => 'involuntaryIntoxication', 'rule' => ''),
                      'voluntaryIntoxication' => array('label' => 'VOLUNTARY INTOXICATION', 'rule' => 'Voluntary intoxication can be used to negate the intent required to commit a crime. Thus, most jurisdictions allow a defendant to use voluntary intoxication as a defense to specific intent crimes only. Therefore if the defendant is charged with a general intent crime, he cannot use voluntary intoxication as a defense at all. '),
                      'mistakeOfFact' => array('label' => 'mistakeOfFact', 'rule' => ''),
                      'mistakeOfLaw' => array('label' => 'mistakeOfLaw', 'rule' => ''),
                      'necessity' => array('label' => 'necessity', 'rule' => ''),
                      'duress' => array('label' => 'DURESS', 'rule' => 'The compelling of a person to undertake an action against his or her will by the threat of physical or economic harm. '),
                      'entrapment' => array('label' => 'entrapment', 'rule' => ''),
                      'consent' => array('label' => 'consent', 'rule' => ''),
                      'selfDefense' => array('label' => 'selfDefense', 'rule' => ''),
                      'defenseOfOther' => array('label' => 'defenseOfOther', 'rule' => ''),
                      'defenseOfProperty' => array('label' => 'defenseOfProperty', 'rule' => ''),
                    )
  
              );

?>