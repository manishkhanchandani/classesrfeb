<?php
$rules = array(
  'contract' => array(
    'governing_law' => 'The common law applies to contracts for the provision of services. The sale of goods, those items moveable and tangible at the time of identification to the contract are governed by the UCC.',
    'valid_contract' => 'Valid contract consists of Q-Tips, i.e. Quantity, Time, Identity of Parties, Price, Subject matter.',
    'statute_of_frauds' => 'The statute of frauds requires that certain contracts be written in order to be enforceable like
          1. contracts for the sale of an interest in land
          2. contracts for the sale of goods for $500 or more (under the U.C.C.), </li>
          3. contracts in consideration of marriage, </li>
          4. contracts that cannot be performed within one year of the contract being made and,</li>
          5. contracts of suretyship.',
    'condition_of_contract' => 'A condition to performance is some event or action that must occur in order for the party to be charged to be found in breach.',
    'breach' => 'A breach of contract is a failure of one party to a contract to perform his/her duties under the contract.',
    'materiality_of_breach' => 'A material breach is one that substantially negatively impacts the non-breaching party.',
    'excuse_of_condition' => 'There is usually no duty to perform a contract unless the express condition has been fulfilled. However, there are situations in which conditions may be excused so that the duty to perform is there even though the condition has not been met.',
    'course_of_performance' => 'Course of performance refers to actions conducted by either party to the contract which will demonstrate what the parties actually agreed to.',
    'consequential_damages' => 'Consequential damages are awarded to compensate the non-breaching party for losses sustained as a consequence of the breach.',
    'expectation_damages' => 'Expectation damages are awarded to place the non-breaching party in the condition they would have been in had the contract not been breached.',
    'mitigate_damages' => 'When a party to a contract breaches, the non-breaching party has a duty to mitigate damages.',
  ),
  'criminal' => array(
    'larceny' => 'Larceny is the trespassory taking and carrying away of the property of another with the intent to permanently deprive.',
    'battery' => 'The harmful or offensive touching of another person',
    'conspiracy' => 'An agreement between two or more parties to commit a crime. Modernly, an overt act is required in furtherance of the commission of the crime / conspiracy goal. The crime of conspiracy does not "merge" with other crimes so the defendant may be charged with both the crime of conspiracy as well as the completed crimes that are also committed.',
    'solicitation' => 'Solicitation is the urging of another person to commit a crime. The crime of solicitation is completed once the urging occurs and it does not matter if the person urged actually completes the crime or not. The crime of solicitation merges with the urged crime, if completed, and the person is vicariously liable for those crimes under the theory of accomplice liability.',
    'embezzlement' => 'Embezzlement is the taking of money with the intent to permanently deprive or putting at substantial risk, money or items that are lawfully in your possession that legally belong to someone else.',
    'kidnapping' => 'Under criminal law, kidnapping is the wrongful taking or confinement of another person against their will. Under common law, it was required that the victim be transported across state lines. However, modernly that requirement has been dropped and is no longer required.',
    'burglary' => 'Under common law, burglary is the breaking and entering the dwelling house of another at nighttime with the intent to commit a felony inside. Modernly, the rule has been extended to include any structure at any time of day and includes larceny as the intended crime, even if it is not a felony by statute.',
    'arson' => 'Under common law, Arson is the malicious burning of the dwelling of another. Modernly, the rule has been extended to include any structure and malice means "with wrongful intent". The burning must include more than smoke and must include damage to include charring and actual burning.',
    'homicide' => 'Homicide is the unlawful killing of another, which includes murder and manslaughter.',
    'murder' => 'Murder is the unlawful killing of another with malice aforethought.',
    'maliceAforethought' => 'Malice aforethought can be accomplished in one of four ways: 1) intent to kill, 2) intent to cause severe bodily injury, 3) an extremely reckless disregard for an unjustifiably high risk to human life or 4) through the Felony Murder Rule.',
    'felonyMurderRule' => 'The felony murder rule applies a first-degree murder charge to the defendant if the death occurred as a result of the commission of an independent inherently dangerous felony (burglary, arson, rape, robbery and / or kidnapping).',
    'firstDegreeMurder' => 'First-degree murder is murder that requires premeditation, deliberation and a specific intent to kill.',
    'secondDegreeMurder' => 'All murder other than first-degree murder is second-degree murder, which requires a wanton or reckless disregard or an unjustifiable risk to human life.',
    'affirmativeDutyToAct' => 'A person generally does not have a duty to assist others unless the person created that person\'s peril.',
    'voluntaryManslaughter' => 'Under criminal law, voluntary manslaughter is the intentional killing of another person that would be murder but for the existence of legally adequate provocation.',
    'inVoluntaryManslaughter' => 'Under criminal law, involuntary manslaughter is the unintentional killing of another person by means of gross criminal negligence, a deliberate breach of a pre-existing duty to protect others from risk of harm OR by recklessness, a deliberate creation of risk to others.'
  ),
  'tort' => array(
    'strictLiability' => 'Strict liability is liability without fault.',
    'strictLiabilityAnimals' => 'Strict Liability for wild animals or domesticated animals with known dangerous propensities arises when damages or injuries are caused by either wild animals or domesticated animals.<br><br>As long as plaintiff can show causation and damages resulting from actions of above referenced animals and the damages caused resulted from the nature which makes such animals dangerous, plaintiffs are entitled to recover.',
    'dangerousPropensity' => 'The predisposition of an animal to inflict harm.',
    'abnormalDangerousPropensity' => 'A predisposition which is not typical for a particular type of animal.',
    'oneFreeBiteRule' => 'A doctrine which insulates a dog owner for strict liability in the event that his dog has bitten someone but has never bitten anyone before.',
    'negligence' => 'Liability for negligence requires proof of a duty of care owed by the defendant to the plaintiff, a breach of that duty, and that the breach was the actual and proximate cause of damages suffered by the plaintiff.',
    'negligenceDuty' => 'The outcomes of some negligence cases depend on whether the defendant owed a duty to the plaintiff. Such a duty arises when the law recognizes a relationship between the defendant and the plaintiff, and due to this relationship, the defendant is obligated to act in a certain manner toward the plaintiff. ',
    'negligenceBreach' => 'A defendant is liable for negligence when the defendant breaches the duty that the defendant owes to the plaintiff. A defendant breaches such a duty by failing to exercise reasonable care in fulfilling the duty.',
    'negligenceActualCause' => 'A plaintiff must prove that the defendant\'s actions actually caused the plaintiff\'s injury. This is often referred to as "but-for" causation. In other words, but for the defendant\'s actions, the plaintiff\'s injury would not have occurred. ',//this rule can be changed
    'negligenceProximateCause' => 'Proximate cause relates to the scope of a defendant\'s responsibility in a negligence case. A defendant in a negligence case is only responsible for those harms that the defendant could have foreseen through his or her actions. If a defendant has caused damages that are outside of the scope of the risks that the defendant could have foreseen, then the plaintiff cannot prove that the defendant\'s actions were the proximate cause of the plaintiff\'s damages.',//this rule can be changed
    'negligenceDamages' => 'A plaintiff in a negligence case must prove a legally recognized harm, usually in the form of physical injury to a person or to property.',
  
  )

);

?>