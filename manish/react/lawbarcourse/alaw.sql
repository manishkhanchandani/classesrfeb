-- phpMyAdmin SQL Dump
-- version 3.1.5
-- http://www.phpmyadmin.net
--
-- Host: remote-mysql4.servage.net
-- Generation Time: Jun 05, 2017 at 08:08 PM
-- Server version: 5.0.85
-- PHP Version: 5.2.42-servage30

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `alaw`
--

-- --------------------------------------------------------

--
-- Table structure for table `essay_answers`
--

CREATE TABLE IF NOT EXISTS `essay_answers` (
  `answer_id` int(11) NOT NULL auto_increment,
  `question_id` int(11) default NULL,
  `rule_id` int(11) default NULL,
  `analysis` text,
  `conclusion` text,
  `sorting` int(11) default NULL,
  `call_of_question` int(11) NOT NULL default '0',
  PRIMARY KEY  (`answer_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `essay_answers`
--

INSERT INTO `essay_answers` (`answer_id`, `question_id`, `rule_id`, `analysis`, `conclusion`, `sorting`, `call_of_question`) VALUES
(1, 1, 1, NULL, NULL, 1, 0),
(2, 1, 2, NULL, NULL, 2, 0),
(3, 1, 3, NULL, NULL, 3, 1),
(4, 1, 4, NULL, NULL, 4, 1),
(5, 1, 7, NULL, NULL, 5, 1),
(6, 1, 9, NULL, NULL, 6, 1),
(7, 1, 22, NULL, NULL, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `essay_questions`
--

CREATE TABLE IF NOT EXISTS `essay_questions` (
  `question_id` int(11) NOT NULL auto_increment,
  `exam_subject` enum('Contracts Law','Criminal Law','Torts Law') default NULL,
  `exam_year` varchar(50) default NULL,
  `exam_question` text,
  PRIMARY KEY  (`question_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `essay_questions`
--

INSERT INTO `essay_questions` (`question_id`, `exam_subject`, `exam_year`, `exam_question`) VALUES
(1, 'Contracts Law', 'OCTOBER 2016', 'Dealer operates an antique shop. While traveling, she buys a Union cavalry officerâ€™s handgun for $1,500 from Seller. Dealer takes several photos of the handgun and Seller agrees to ship it to Dealerâ€™s shop. When Dealer arrives home, she immediately shows the photos of the handgun to Buyer. The parties shake hands on a deal to sell the handgun to Buyer for $2,000, payment upon delivery.\r\nThe next day, Buyer regrets agreeing to the deal without first having an opportunity to actually examine the handgun. Buyer tells Dealer that he will not pay the $2,000 unless she first allows him to have the handgun examined by an expert appraiser. Dealer becomes angry and tells Buyer, â€œA dealâ€™s a deal. Iâ€™ll expect my money when the handgun is delivered to you.â€\r\nWhen the handgun arrives at Dealerâ€™s shop, she does some internet research and discovers that the handgun was issued to a general who played a prominent role at the Battle of Gettysburg, which increases the value of the handgun by a factor of ten. The next day, Dealer receives a letter from Buyer stating, â€œSorry. Youâ€™re right. A dealâ€™s a deal.â€ The envelope contains a check for $2,000. Dealer sends the check back to Buyer with a note stating, â€œBuyer: Because you backed out of our deal, I will not sell you the handgun. //Signed// Dealer.â€\r\nA few weeks later, Buyer learns that Dealer is offering the handgun for sale at her shop for $20,000 because of its connection to the Civil War general. Buyer brings suit against Dealer for breach of contract, requesting specific performance.\r\n1. Is Buyer likely to prevail against Dealer in his suit for breach of contract? Discuss.\r\n2. If so, is the court likely to grant Buyerâ€™s request for specific performance? Discuss'),
(2, 'Contracts Law', 'OCTOBER 2016', 'Owner wants to turn her warehouse into a restaurant. She decides to install an innovative solar heating system, which Contractor agrees to install at a cost of $50,000. Contractorâ€™s son (â€œSonâ€) wants to use two parking spaces in the warehouse parking lot for his (Sonâ€™s) business. If Owner agrees to designate two parking spaces for Sonâ€™s use for five years, Contractor will drop the price to $35,000.\r\nOn November 13th, the parties agree to the latter arrangement in a valid written contract in which Contractor promises to start the job on November 17th and to complete it by January 1st. The contract includes a recital stating, â€œTimely performance by Contractor is important to avoid any delay in the opening of Ownerâ€™s restaurant.â€\r\nState law requires that all installations of the new solar systems be done by a certified solar technician. On November 15th, the only certified technician who works for Contractor, Tech, is injured in a car accident. Contractor immediately notifies Owner and advises her that the start of the work will be delayed because of Techâ€™s accident. Owner replies, â€œYou know that on-time performance is crucial. Yesterday, the city announced special tax breaks for businesses that open by the end of the year. Can you still finish by then?â€ Contractor says, â€œI donâ€™t know when we can start. It depends on how quickly Tech recovers.â€ Owner tells Contractor that she is terminating the contract.\r\nOwner finds an alternative supplier of a similar system at a cost of $60,000, but he canâ€™t start work immediately and the restaurant opens in February of the following year. Owner misses the deadline for the city tax break.\r\nOwner sues Contractor for breach of contract. Son sues Owner for breach of contract, seeking damages for Ownerâ€™s failure to provide the two parking spaces.\r\n1. Can Owner prevail in her lawsuit against Contractor? Discuss.\r\n2. If so, can Owner recover\r\na. The $10,000 in increased costs for the heating system? Discuss. b. The lost profits for the delay in opening the restaurant? Discuss. c. The value of the tax reduction? Discuss.\r\n3. Can Son prevail in his lawsuit against Owner? Discuss.');

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE IF NOT EXISTS `rules` (
  `rule_id` int(11) NOT NULL auto_increment,
  `rule` varchar(255) default NULL,
  `description` text,
  `rule_subject` enum('Contracts Law','Criminal Law','Torts Law') default NULL,
  PRIMARY KEY  (`rule_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`rule_id`, `rule`, `description`, `rule_subject`) VALUES
(1, 'Is UCC', 'The Uniform Commercial Code (UCC) applies to the sale of goods, which are tangible, movable personal property identified to the contract at the time of formation.', 'Contracts Law'),
(2, 'Merchant', 'A merchant is a person who regularly deals in these kinds of goods or who otherwise holds themself out as having special knowledge as to these goods.', 'Contracts Law'),
(3, 'Contract Formation', 'Contract formation requires a valid offer, a valid acceptance, consideration, and no valid defenses.', 'Contracts Law'),
(4, 'Offer', 'An offer is the outward manifestation of present contractual intent, using definite and certain terms, communicated to the offeree.  Under the common law, an offer must sufficiently describe the parties, the subject matter, the quantity, the price, and the time of delivery. Under the U.C.C., however, price and time may be omitted and a court will substitute reasonable terms for those that are missing.', 'Contracts Law'),
(5, 'Termination', 'Termination can happen in one of three ways; either by rejection, revocation, or destruction of subject matter.', 'Contracts Law'),
(6, 'Rejection', 'A rejection is a manifestation by the offeree that he or she does not intend to accept the offer nor to give it further consideration.', 'Contracts Law'),
(7, 'Acceptance', 'An acceptance under common law is an unequivocal assent to the terms of an offer. An acceptance under the UCC is any seasonable expression of acceptance.', 'Contracts Law'),
(8, 'Mailbox Rule', 'Under the Mailbox Rule, established in the case of Adams v. Lindsell, an acceptance of an offer for a bilateral contract, dispatched by an authorized mode of communication, is effective when mailed.', 'Contracts Law'),
(9, 'Consideration', 'Consideration is that which is bargained for and given in exchange for a promise.', 'Contracts Law'),
(10, 'Differing Terms Battle Of Forms', 'Where a merchant sends a letter of confirmation containing different or added terms that adds to, varies or materially alters a contract the different or added terms will be "knocked out" and only the agreed upon terms will be retained within the contract unless the other party fails to reject the added terms in a reasonable amount of time, typically within 10 days of receipt.', 'Contracts Law'),
(11, 'Statute Of Fraud', 'The statute of frauds state that certain contracts must be in writing to be enforceable.', 'Contracts Law'),
(19, 'Incidental Damage', 'A non-breaching party can recover incidental damages for out-of-pocket expenses naturally flowing from the breach; i.e. hiring a broker, placing an ad, etc.', 'Contracts Law'),
(13, 'Confirmatory Letter', 'There are, however, exceptions to the Statute of Frauds that when satisfied will take a contract "out of" the Statute of Frauds. Once such exception is a confirmatory letter between merchants: a letter confirming a prior agreement to enter into a contract typically within the statute of frauds. The Defendant has 10 days to object to the confirmatory letter after which it becomes binding as a matter of law.', 'Contracts Law'),
(14, 'Merchant Constructive Condition', 'Merchants are held to a higher standard of good faith and fair dealing under an implied constructive condition.', 'Contracts Law'),
(15, 'Breach', 'A failure to perform under the obligations of the contract.', 'Contracts Law'),
(16, 'Parol Evidence Rule', 'Any oral or written communication made prior to or contemporaneous with a fully integrated writing will be barred by the parol evidence rule.', 'Contracts Law'),
(17, 'Remedies', 'Where a party has breached their contractual duties the aggrieved party is able to recover damages that naturally flow from the breach.', 'Contracts Law'),
(18, 'Expected Damage', 'An aggrieved party to a contract may recover for damages they expected under the contract. The formula utilized by the court is the fair market value of the subject manner minus the contract price.', 'Contracts Law'),
(20, 'Special Performance', 'Specific performance is an equitable remedy whereby a court requires a party to perform under the contract. Specific performance is typically awarded if monetary damages are inadequate to make the aggrieved party whole or where the subject matter is particularly unique.', 'Contracts Law'),
(21, 'Compensation Damage', 'Compensation damages must be reasonably foreseeable and the plaintiff must mitigate.', 'Contracts Law'),
(22, 'U.C.C. Merchant''s Confirmatory Memorandum', 'A contract that would otherwise be unenforceable under the Statute of Frauds may still be enforceable if a merchant seller issues a signed writing confirming the deal.', 'Contracts Law');
