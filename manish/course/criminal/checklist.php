<?php

function showHideText($id, $linkText, $content='', $link='') {
  $string = '<a data-toggle="collapse" href="#'.$id.'" aria-expanded="false" aria-controls="'.$id.'">
            '.$linkText.'
          </a>
          <div class="collapse" id="'.$id.'">
            '.$content;
        if (!empty($link)) {
          $string .= ' <a href="'.$link.'" target="_blank">More Info</a>';
        }
  $string .= '
          </div>';
  
  return $string;
}
?>
<?php include('../header.php'); ?>
<style type="text/css">
  .rule {
    font-weight: bold;
  }
</style>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Checklist</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4">
      <h3>Criminal Checklist</h3>
      <ol>
        <li>Fundamental Observations
          <ol type="a">
            <li>Actus Reus/Mens Rea</li>
            <li>Accomplice Liability</li>
            <li>Vicarious Liability</li>
          </ol>
        </li>
        <li>Inchoate Crimes
          <ol type="a">
            <li>Solicitation
              <?php echo showHideText('SolicitationRule', '(Rule)', '<span class="rule">Intent to induce another to commit a crime</span>'); ?>
            </li>
            <li>Attempt
              <?php echo showHideText('AttemptRule', '(Rule)', '<span class="rule">A substantial act towards perpetration of an intended crime.</span>'); ?>
            </li>
            <li>Conspiracy
              <?php echo showHideText('ConspiracyRule', '(Rule)', '<span class="rule">Agreement between two or more persons to commit an unlawful act.</span>'); ?>
              <div><?php echo showHideText('ConspiracyMoreInfo', 'More Info', '<div>Overt Act is required</div><div>Withdrawal - common law: no defense, model penal code: valid defense if timely communicated</div><div>Impossibility No defense</div>'); ?></div>
              
              <div>Pinkerton's Rule
              <?php echo showHideText('PinkertonRule', '(Rule)', '<span class="rule">Each member of a conspiracy is chargeable with all crimes in furtherance of or the natural and probable consequence of the unlawful act (foreseeable).</span>'); ?> 
              <?php echo showHideText('PinkertonRule2', '(Rule2)', '<span class="rule">Each member of the conspiracy is responsible for actions of co-conspirators of which they have knowledge with the intent that these additional crimes may occur.</span>'); ?>
              </div>
            </li>
          </ol>
        </li>
        <li>Crimes Against the person
          <ol type="a">
            <li>Homicide
              <?php echo showHideText('HomicideRule', '(Rule)', '<span class="rule">Killing of a human being by another human being.</span>'); ?>
               
              <ol type="i">
                <li>Justification</li>
                <li>Excuse</li>
                <li>Mitigation</li>
              </ol>
            </li>
            <li>Defenses
              <ol type="i">
                <li>Justification</li>
                <li>Excuse</li>
                <li>Mitigation</li>
              </ol>
             </li>
            <li>Non-Homicide Crimes</li>
          </ol>
        </li>
        <li>Crime Against Habitation
          <ol type="a">
            <li>Burglary</li>
            <li>Arson</li>
          </ol>
        </li>
        <li>Theft Crimes
          <ol type="a">
            <li>Larceny / Larceny By Trick</li>
            <li>Embezzlement</li>
            <li>False Pretenses</li>
            <li>Robbery</li>
            <li>Receiving Stolen Property</li>
          </ol>
        </li>
        <li>Crimes Against Property Interests
          <ol type="a">
            <li>Forgery</li>
            <li>Uttering</li>
            <li>Extortion</li>
          </ol>
        </li>
        <li>Miscellaneous Crimes
          <ol type="a">
            <li>Misprison</li>
            <li>Compounding</li>
            <li>Breach of the peace</li>
            <li>Malicious Mischief</li>
          </ol>
        </li>
      </ol>
      <p><strong>Criminal Checklist 2</strong></p>
      <ol>
        <li>Formation
          <ol>
            <li>Actus Reus / Mens Rea / Concurrence</li>
            <li>Accomplice Liability
              <ol>
                <li>Intent</li>
                <li>Knowledge</li>
                <li>Active Assistance</li>
              </ol>
            </li>
            <li>Vicarious Liability</li>
          </ol>
        </li>
        <li>Inchoate Crimes
          <ol>
            <li>Solicitation</li>
            <li>Attempt</li>
            <li>Conspiracy </li>
          </ol>
        </li>
        <li>Crimes against the Person
          <ol>
            <li>Homicide
              <ol>
                <li>IRAC Homicide</li>
                <li>Causation
                  <ol>
                    <li>Actual</li>
                    <li>Proximate</li>
                  </ol>
                </li>
                <li>Murder
                  <ol>
                    <li>Malice is the key</li>
                  </ol>
                </li>
                <li>First Degree Murder</li>
                <li>Second Degree Murder</li>
                <li>Justification</li>
                <li>Excuse (3 i's)</li>
                <li>Mitigation
                  <ol>
                    <li>Voluntary Manslaughter</li>
                  </ol>
                </li>
                <li>Involuntary Manslaughter</li>
              </ol>
            </li>
            <li>Non-Homicide
              <ol>
                <li>Assault</li>
                <li>Battery</li>
                <li>False Imprisonment</li>
                <li>Kidnapping</li>
                <li>Mayhem</li>
                <li>Rape</li>
              </ol>
            </li>
          </ol>
        </li>
        <li>Crimes against Habitation
          <ol>
            <li>Burglary
              <ol>
                <li>Common Law</li>
                <li>Statutory</li>
              </ol>
            </li>
            <li>Arson</li>
          </ol>
        </li>
        <li>Crimes against Property
          <ol>
            <li>Larceny</li>
            <li>Larceny by Trick</li>
            <li>False Pretenses</li>
            <li>Embezzlement</li>
            <li>Robbery</li>
            <li>Receiving Stolen Property</li>
          </ol>
        </li>
        <li>Crimes against Property Interests
          <ol>
            <li>Forgery</li>
            <li>Uttering</li>
            <li>Extortion</li>
          </ol>
        </li>
        <li>Miscellaneous Crimes
          <ol>
            <li>Misprision</li>
            <li>Compounding</li>
            <li>Riot</li>
            <li>Rout</li>
            <li>Unlawful Assembly</li>
            <li>Malicious Mischief</li>
            <li>Breach of Peace</li>
          </ol>
        </li>
        <li>Defenses and Justifications
          <ol>
            <li>Defenses
              <ol>
                <li>Self Defense</li>
                <li>Defense of Others</li>
                <li>Defense of Property</li>
                <li>Prevention of Crime</li>
                <li>Public Authority</li>
                <li>Domestic Authority</li>
                <li>Necessity</li>
              </ol>
            </li>
            <li>Justification
              <ol>
                <li>Mistake of Law</li>
                <li>Mistake of Fact</li>
                <li>Consent</li>
                <li>Duress</li>
                <li>Entrapment </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <div class="col-md-4">
      <h3>Torts Checklist</h3>
      <h3>Torts Checklist 2</h3>
      <ol>
        <li><strong>Intentional Torts</strong>
<ol>
            <li>Intentional Torts
              <ol>
                <li>Assault</li>
                <li>Battery</li>
                <li>False Imprisonment</li>
                <li>Intentional Infliction of Mental Distress
                  <?php echo showHideText('IIOMD', '(Rule)', '<span class="rule">It’s the intentional outrageous conduct that intends to inflict emotional distress and does cause severe emotional distress.</span>'); ?>
                </li>
                <li>Trespass to Land</li>
                <li>Trespass to Chattel</li>
                <li>Conversion</li>
              </ol>
            </li>
            <li>Defenses to Intentional Torts
              <ol>
                <li>Consent</li>
                <li>Self-Defense</li>
                <li>Defense of Others
                  <ol>
                    <li>Step-In-Shoes Jurisdictions</li>
                    <li>Reasonable Appearances Jurisdictions</li>
                  </ol>
                </li>
                <li>Defense of Property
                  <?php echo showHideText('DefenseOfProperty', '(Rule)', '<span class="rule">Defense of property allows the reasonable use of force to defend one\'s property.</span>'); ?>
                </li>
                <li>Prevention of Crime</li>
                <li>Recapture of Property
                  <ol>
                    <li>Re-entry Upon Land</li>
                    <li>Recapture of Chattel</li>
                    <li>Shopkeeper's Rule</li>
                  </ol>
                </li>
                <li>Legal Authority</li>
                <li>Necessity
                  <ol>
                    <li>Public Necessity</li>
                    <li>Private Necessity </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Negligence</strong>
<ol>
            <li>Duty
             <?php echo showHideText('Duty', '(Rule)', '<span class="rule">A duty is simply a legal obligation. In order to be sued for Negligence, the Defendant must have owed a duty to the Plaintiff.</span>'); ?>
              <ol>
                <li>General</li>
                <li>Special
                  <ol>
                    <li>Negligence Per Se</li>
                    <li>Cars / Autos</li>
                    <li>Omission</li>
                    <li>Rescuers / Samaritans</li>
                    <li>Parents</li>
                    <li>Landowner / Occupier</li>
                    <li>Duties of Lessors</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>Breach
               <?php echo showHideText('Breach', '(Rule)', '<span class="rule">A breach is a violation of a law or duty. The Defendant must breach his duty in order to be liable for negligence.</span>'); ?>
               <?php echo showHideText('Breach2', '(Rule 2)', '<span class="rule">A breach is the failure to perform one\'s duty.</span>'); ?>
              <ol>
                <li>Direct / Circumstantial
                <?php echo showHideText('DirectEvidence', '(Rule Direct Evidence)', '<span class="rule">Breach is proved by direct or circumstantial evidence. Direct Evidence: Evidence which clearly shows that a negligent act took place.(more over Evidence which believe establishes that breach occured.)</span>', 'https://nationalparalegal.edu/public_documents/courseware_asp_files/torts/negligence1/breachOfDuty1.asp'); ?>
               <?php echo showHideText('CircumstantialEvidence', '(Rule Circumstantial Evidence)', '<span class="rule">Breach is proved by direct or circumstantial evidence. Circumtantial evidence: Evidence which a jury can use to reasonably infer negligence on the part of the defendant. </span>', 'https://nationalparalegal.edu/public_documents/courseware_asp_files/torts/negligence1/breachOfDuty1.asp'); ?></li>
                <li>Res Ipsa Loquitur</li>
              </ol>
            </li>
            <li>Causation
               <?php echo showHideText('Cause', '(Rule)', '<span class="rule">The breach of duty must have caused harm to the Plaintiff.</span>'); ?>
              <ol>
                <li>Actual
                   <?php echo showHideText('ActualCause', '(Rule)', '<span class="rule">An act whose direct result is the plaintiff’s harm.</span>'); ?>
                  <ol>
                    <li>&quot;But For&quot;
                      <?php echo showHideText('ButFor', '(Rule)', '<span class="rule">The method of determining the cause without which the plaintiff’s harm would not have occurred.</span>'); ?>
                    </li>
                    <li>Substantial Factor
                      <?php echo showHideText('SubstantialFactor', '(Rule)', '<span class="rule">The principle by which two or more defendants will be liable if their joint actions caused the plaintiff’s harm but their individual actions alone would have resulted in the same harm. </span>'); ?>
                    </li>
                  </ol>
                </li>
                <li>Other Terms
                  <ol>
                    <li>Concurrent Liability Rule
                      <?php echo showHideText('ConcurrentLiabilityRule', '(Rule)', '<span class="rule">The rule establishing that separate negligent acts of more than one defendant that combine to cause a single injury will result in liability for both defendants.</span>'); ?>
                    </li>
                    <li>Tortfeasor
                      <?php echo showHideText('Tortfeasor', '(Rule)', '<span class="rule">An individual who commits a tort.</span>'); ?>
                    </li>
                    <li>Alternative Liability
                      <?php echo showHideText('AlternativeLiability', '(Rule)', '<span class="rule">Liability arising from the tortious acts of two or more people – when the plaintiff proves that one of the defendants has caused harm but cannot prove which one caused it – resulting in a shifting of the burden of proof to each defendant.</span>'); ?>
                    </li>
                  </ol>
                </li>
                
                <li>Proximate
                   <?php echo showHideText('Proximate', '(Rule)', '<span class="rule">Cause that is legally sufficient to result in liability.</span>'); ?><br>
                    <strong>Foreseeability:</strong><br>
                      An expected outcome of the defendant's acts. <br><br>

                    <strong>Eggshell Plaintiff:</strong><br>
                      A plaintiff who, either because of a physical ailment or extreme sensitivity, suffers harm that most people would not have suffered.<br><br>

                    <strong>Contributing Factors:</strong><br>
                      Factors which are already in operation when the defendant acts (a physical disability).<br>
                  <ol>
                    <li>Watch the time line!</li>
                    <li>Direct</li>
                    <li>Intervening Acts
                      <ol>
                        <li>Independent</li>
                        <li>Dependent</li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>Damages
               <?php echo showHideText('Damages', '(Rule)', '<span class="rule">The Plaintiff must suffer harm in order to sue for negligence. If he suffers no harm, he cannot sue.</span>'); ?>
              <ol>
                <li>Physical Harm Needed</li>
                <li>NIED</li>
              </ol>
            </li>
            <li>Defenses
              <ol>
                <li>Contributory Negligence
                  <?php echo showHideText('ContributoryNegligence', '(Rule)', '<span class="rule">Conduct on the part of the plaintiff that contributes to the events leading to his injuries. <br><br> The basis for this defense is that everybody has a duty to avoid injury at the hands of another and, if you fail to protect your own safety, you may be barred from recovering for your injuries. Contributory negligence is a complete bar to recovery.</span>', 'https://nationalparalegal.edu/public_documents/courseware_asp_files/torts/defNegSpecDut/contributoryNegligence.asp'); ?>
                </li>
                <li>Comparative Negligence
                  <?php echo showHideText('ComparativeNegligence', '(Rule)', '<span class="rule">The principle that reduces a plaintiff’s recovery proportionally to the plaintiff’s degree of fault in causing the damage.<br><br>There are two types of comparative negligence that are used when assessing liability: Pure comparative negligence and partial comparative negligence.<br><br>Pure comparative negligence allows the plaintiff to recover even if his negligence is greater than defendant’s negligence. For example, where plaintiff has suffered $100,000 worth of damage, but his own negligence contributed to 90% of his injuries, plaintiff will be allowed to collect $10,000 under a pure comparative negligence theory. <br><br>Partial comparative negligence, which most jurisdictions apply, completely bars recovery if plaintiff’s negligence exceeds a certain threshold.<br><br>Some states will deny the plaintiff recovery if his negligence is equal to or greater than the defendant’s negligence. Therefore, if a jury finds that the plaintiff is either 50% responsible for his injuries or more, the plaintiff will be completely barred from recovery. Anything less than 50% responsibility and the plaintiff will be entitled to recover that percentage of the damage. </span>', 'https://nationalparalegal.edu/public_documents/courseware_asp_files/torts/defNegSpecDut/ComparativeNegligence.asp'); ?>
                </li>
                <li>Last Clear Chance</li>
                <li>Assumption of the Risk
                <?php echo showHideText('AssumptionofRisk', '(Rule)', '<span class="rule">Where the plaintiff has either explicitly or implicitly consented to the actions for which he is suing the defendant.</span>'); ?>
                </li>
              </ol>
            </li>
            <li>Multiple Defendant Issues
              <ol>
                <li>Joint, Concurrent, Successive</li>
                <li>Joint &amp; Several Liability</li>
                <li>Contribution &amp; Indemnity</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Miscellaneous Torts Concepts</strong>
<ol>
            <li>Wrongful Death</li>
            <li>Survival Statutes</li>
            <li>Statute of Limitations</li>
            <li>Immunities
              <ol>
                <li>Husband / Wife</li>
                <li>Parent / Child</li>
                <li>Charities</li>
                <li>Government</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Strict Liability</strong>
<ol>
            <li>Animals</li>
            <li>Abnormally Dangerous Activities</li>
          </ol>
        </li>
        <li><strong>Vicarious Liability</strong>
        <?php echo showHideText('VicariousLiability', '(Rule)', '<span class="rule">Liability that a supervisory party bears for the actionable conduct of a subordinate or associate because of the relationship between the two parties.</span>'); ?>
<ol>
            <li>Employment Relationship - Respondeat Superior
              <ol>
                <li>Scope of Employment</li>
                <li>To / From Home</li>
                <li>Frolic and Detour</li>
              </ol>
            </li>
            <li>Independent Contractors</li>
            <li>Joint Enterprise</li>
            <li>Bailor / Bailee</li>
            <li>Vehicle Ownership
              <ol>
                <li>Family Purpose Doctrine</li>
                <li>Consent Statutes</li>
              </ol>
            </li>
            <li>Parent / Child</li>
          </ol>
        </li>
        <li><strong>Products Liability</strong>
<ol>
            <li>General Rule</li>
            <li>Defect Type</li>
            <li>Theory
              <ol>
                <li>Intentional (rare)</li>
                <li>Negligence</li>
                <li>Breach of Warranty</li>
                <li>Strict Liability in Tort</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Crossovers</strong>
<ol>
            <li>Misrepresentation
              <ol>
                <li>Intentional: Deceit / Fraud</li>
                <li>Negligent</li>
                <li>Damages</li>
              </ol>
            </li>
            <li>Nuisance
              <ol>
                <li>Private Nuisance</li>
                <li>Public Nuisance</li>
              </ol>
            </li>
            <li>Wrongful Litigation
              <ol>
                <li>Malicious Prosecuation</li>
                <li>Abuse of Process</li>
              </ol>
            </li>
            <li>Business Torts
              <ol>
                <li>Disparagement</li>
                <li>Interference with Economic Relationship</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Defamation</strong> <?php echo showHideText('Defamation', '(Rule)', '<span class="rule">DEFAMATION is the publication to a third party of information "of and concerning the plaintiff" that is false and harms the plaintiff\'s reputation.</span>'); ?>
<ol>
            <li>General Rule</li>
            <li>Slander / Slander per se</li>
            <li>Libel / Libel per se</li>
            <li>Damages</li>
            <li>Priviliges</li>
          </ol>
        </li>
        <li><strong>Invasion of Privacy</strong>
<ol>
            <li>Appropriation of Likeness</li>
            <li>Intrusion upon Seclusion</li>
            <li>False Light</li>
            <li>Public Disclosure of Private Facts</li>
          </ol>
        </li>
        <li><strong>Tort Damages</strong>
<ol>
            <li>Special</li>
            <li>General</li>
            <li>Punitive</li>
            <li>Avoidable Consequence Rule</li>
            <li>Collateral Source Rule</li>
          </ol>
        </li>
      </ol>
    </div>
    <div class="col-md-4">
      <h3>Contracts Checklist</h3>
      <ol>
        <li>Formation
          <ol>
            <li>Applicable Law - Common Law / UCC - Sale of Goods / Merchants</li>
            <li>Offer</li>
            <li>Termination</li>
            <li>Revocation</li>
            <li>Rejection</li>
            <li>Acceptance</li>
            <li>Consideration</li>
            <li>Defenses</li>
          </ol>
        </li>
        <li>Third Party Rights
          <ol>
            <li>Third Party Beneficiary - Does Public Intercourse Cause V.D?
            <?php echo showHideText('ThirdPartyBeneficiary', '(Rule)', '<span class="rule">A third party beneficiary contract is one wherein performance by a promissor will benefit a third party.</span>'); ?>
            </li>
            <li>Assignments / Delegation</li>
          </ol>
        </li>
        <li>Performance - Covenants / Conditions
          <ol>
            <li>Type Conditions</li>
            <li>Satisfy / Excuse - Swap Drive</li>
          </ol>
        </li>
        <li>Discharge - I'm for SANDI</li>
        <li>Breach
          <ol>
            <li>Major / Minor</li>
          </ol>
        </li>
        <li>Remedies
          <ol>
            <li>Damages
              <ol>
                <li>General</li>
                <li>Special - Consequential</li>
                <li>Liquidated Damages</li>
                <li>Reliance Damages</li>
                <li>Avoidable Consequence Rule</li>
                <li>Quasi Contract</li>
              </ol>
            </li>
            <li>Rescission / Restitution</li>
            <li>Reformation</li>
            <li>Specific Performance</li>
            <li>Injunction</li>
          </ol>
        </li>
      </ol>
      <h3>Contracts Checklist 2</h3>
      <ol>
        <li><strong>Formation</strong>
<ol>
            <li>Governing Law (Common or UCC)</li>
            <li>Valid Contract
              <ol>
                <li>Mutual Assent
                  <ol>
                    <li>Offer
                      <ol>
                        <li>Definite Terms (Q-Tips)</li>
                        <li>Termination</li>
                        <li>Revocation</li>
                        <li>Rejection</li>
                      </ol>
                    </li>
                    <li>Acceptance
                      <?php echo showHideText('Acceptance', '(Rule)', '<span class="rule">Acceptance is the manifest willingness to be presently bound to a valid offer. It can be express or implied. Under the UCC acceptance can occur by a means stipulated by the offer, or if no such means is provided, in any reasonable manner.</span>'); ?>
                      <?php echo showHideText('Acceptance2', '(Rule 2)', '<span class="rule">An acceptance is unequivocal assent to the terms of an offer.</span>'); ?>
                    </li>
                  </ol>
                </li>
                <li>Consideration
                <?php echo showHideText('Consideration', '(Rule)', '<span class="rule">Something of value (either a promise, an act or an object) that a promisor receives from a promisee in return for his promise. Essentially, consideration is simply what you give up in the deal for what you get out of the deal.</span>'); ?>
                </li>
              </ol>
            </li>
            <li>Defenses of Formation (Pammi said fu)
              <ol>
                <li>Parol Evidence Rule</li>
                <li>Adhesion Contracts</li>
                <li>Mistake</li>
                <li>Misrepresentation (Neg)</li>
                <li>Incapacity (Legal / Mental)</li>
                <li>Statute of Frauds</li>
                <li>Ambiguity</li>
                <li>Illegality</li>
                <li>Duress</li>
                <li>Fraud</li>
                <li>Unconscionability</li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Third Party Rights</strong>
<ol>
            <li>Third Party Beneficiary (Does Public Intercourse Cause VD?)
              <ol>
                <li>Define</li>
                <li>Privity</li>
                <li>Intent to Benefit</li>
                <li>Classification</li>
                <li>Vesting</li>
                <li>Divide Lawsuits if Necessary</li>
              </ol>
            </li>
            <li>Assignment</li>
            <li>Delegation</li>
          </ol>
        </li>
        <li><strong>Conditions to Performance</strong>
<ol>
            <li>Covenant / Promise v. Condition</li>
            <li>Type
              <ol>
                <li>Precedent</li>
                <li>Concurrent</li>
                <li>Subsequent</li>
                <li>Express</li>
                <li>Implied
                  <ol>
                    <li>Implied in Fact</li>
                    <li>Implied in Law</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>Were Plaintiff's Conditions Satisfied?
              <ol>
                <li>Substantial Performance (Constructive)</li>
                <li>Divisibility</li>
              </ol>
            </li>
            <li>Were Plaintiff's Conditions Excused?
              <ol>
                <li>Waiver</li>
                <li>Anticipatory Repudiation</li>
                <li>Prevention</li>
                <li>Impossibility of Performance</li>
                <li>Voluntary Disablement</li>
                <li>Estoppel </li>
              </ol>
            </li>
          </ol>
        </li>
        <li><strong>Discharge of Defendant's Duty to Perform</strong>
<ol>
            <li>Merger</li>
            <li>Substitute Contract</li>
            <li>Modification</li>
            <li>Amendment and Restatement of Contract</li>
            <li>Novation</li>
            <li>Accord and Satisfaction</li>
            <li>Rescission (mutual)</li>
            <li>Release</li>
            <li>Waiver</li>
            <li>Condition Subsequent</li>
            <li>Impossibility of Performance</li>
            <li>Frustration of Purpose</li>
            <li>Commercial or Economic Impracticability</li>
            <li>Supervening Illegality</li>
            <li>Failure of Consideration</li>
            <li>Defenses to Formation</li>
          </ol>
        </li>
        <li><strong>Breach</strong>
<ol>
            <li>Major</li>
            <li>Minor</li>
          </ol>
        </li>
        <li><strong>Remedies</strong>
<ol>
            <li>Legal vs Equitable Remedies (Lively Cats Find Mice Darn Nice)</li>
            <li>Damages
              <ol>
                <li>General Damages</li>
                <li>Special Damages</li>
                <li>Compensatory Damages
                  <ol>
                    <li>Expectation Damages</li>
                    <li>Reliance Damages</li>
                    <li>Restitution Damages</li>
                  </ol>
                </li>
                <li>Liquidated Damages</li>
                <li>Punitive Damages (NOT)
                  <ol>
                    <li>Exceptions</li>
                  </ol>
                </li>
                <li>Nominal Damages</li>
                <li>Avoidable Consequence Rule</li>
                <li>Collateral Source Rule</li>
              </ol>
            </li>
            <li>Quasi Contract</li>
            <li>Rescission</li>
            <li>Restitution</li>
            <li>Reformation</li>
            <li>Injunction
              <ol>
                <li>Specific Performance (Charles Atlas Earns Much Cash Delivering Elephants)</li>
              </ol>
            </li>
            <li>UCC Remedies for Buyer and Seller </li>
          </ol>
        </li>
      </ol>
    </div>
  </div>
</div>


<?php include('../footer.php'); ?>