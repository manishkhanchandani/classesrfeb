<?php

function showHideText($id, $linkText, $content='') {
  $string = '<a data-toggle="collapse" href="#'.$id.'" aria-expanded="false" aria-controls="'.$id.'">
            '.$linkText.'
          </a>
          <div class="collapse" id="'.$id.'">
            '.$content.'
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
      <p>Criminal Checklist 2</p>
      <ol>
        <li></li>
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
                <li>Intentional Infliction of Mental Distress</li>
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
                <li>Defense of Property</li>
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
              <ol>
                <li>Direct / Circumstantial</li>
                <li>Res Ipsa Loquitur</li>
              </ol>
            </li>
            <li>Causation
              <ol>
                <li>Actual
                  <ol>
                    <li>&quot;But For&quot;</li>
                    <li>Substantial Factor</li>
                  </ol>
                </li>
                <li>Proximate
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
              <ol>
                <li>Physical Harm Needed</li>
                <li>NIED</li>
              </ol>
            </li>
            <li>Defenses
              <ol>
                <li>Contributory Negligence</li>
                <li>Comparative Negligence</li>
                <li>Last Clear Chance</li>
                <li>Assumption of the Risk</li>
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
        <li><strong>Defamation</strong>
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
            <li>Third Party Beneficiary - Does Public Intercourse Cause V.D?</li>
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
                    <li>Acceptance</li>
                  </ol>
                </li>
                <li>Consideration</li>
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