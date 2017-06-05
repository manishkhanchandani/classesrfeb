<?php require_once('../../../../../../Connections/connLaw.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
  $insertSQL = sprintf("INSERT INTO essay_answers (question_id, rule_id, sorting, call_of_question) VALUES (%s, %s, %s, %s)",
                       GetSQLValueString($_POST['question_id'], "int"),
                       GetSQLValueString($_POST['rule_id'], "int"),
                       GetSQLValueString($_POST['sorting'], "int"),
                       GetSQLValueString($_POST['call_of_question'], "int"));

  mysql_select_db($database_connLaw, $connLaw);
  $Result1 = mysql_query($insertSQL, $connLaw) or die(mysql_error());

  $insertGoTo = "exam_issues.php";
  if (isset($_SERVER['QUERY_STRING'])) {
    $insertGoTo .= (strpos($insertGoTo, '?')) ? "&" : "?";
    $insertGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $insertGoTo));
}

$colname_rsQuestion = "-1";
if (isset($_GET['question_id'])) {
  $colname_rsQuestion = $_GET['question_id'];
}
mysql_select_db($database_connLaw, $connLaw);
$query_rsQuestion = sprintf("SELECT * FROM essay_questions WHERE question_id = %s", GetSQLValueString($colname_rsQuestion, "int"));
$rsQuestion = mysql_query($query_rsQuestion, $connLaw) or die(mysql_error());
$row_rsQuestion = mysql_fetch_assoc($rsQuestion);
$totalRows_rsQuestion = mysql_num_rows($rsQuestion);

$colname_rsIssues = "-1";
if (isset($row_rsQuestion['exam_subject'])) {
  $colname_rsIssues = $row_rsQuestion['exam_subject'];
}
mysql_select_db($database_connLaw, $connLaw);
$query_rsIssues = sprintf("SELECT * FROM rules WHERE rule_subject = %s", GetSQLValueString($colname_rsIssues, "text"));
$rsIssues = mysql_query($query_rsIssues, $connLaw) or die(mysql_error());
$row_rsIssues = mysql_fetch_assoc($rsIssues);
$totalRows_rsIssues = mysql_num_rows($rsIssues);

$colname_rsAnswer = "-1";
if (isset($_GET['question_id'])) {
  $colname_rsAnswer = $_GET['question_id'];
}
mysql_select_db($database_connLaw, $connLaw);
$query_rsAnswer = sprintf("SELECT * FROM essay_answers INNER JOIN rules ON essay_answers.rule_id = rules.rule_id WHERE question_id = %s ORDER BY sorting ASC, answer_id ASC", GetSQLValueString($colname_rsAnswer, "int"));
$rsAnswer = mysql_query($query_rsAnswer, $connLaw) or die(mysql_error());
$row_rsAnswer = mysql_fetch_assoc($rsAnswer);
$totalRows_rsAnswer = mysql_num_rows($rsAnswer);

$colname_rsMax = "-1";
if (isset($_GET['question_id'])) {
  $colname_rsMax = $_GET['question_id'];
}
mysql_select_db($database_connLaw, $connLaw);
$query_rsMax = sprintf("SELECT MAX(sorting) as maxVal, MAX(call_of_question) as maxCall FROM essay_answers WHERE question_id = %s", GetSQLValueString($colname_rsMax, "int"));
$rsMax = mysql_query($query_rsMax, $connLaw) or die(mysql_error());
$row_rsMax = mysql_fetch_assoc($rsMax);
$totalRows_rsMax = mysql_num_rows($rsMax);

?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Exam Issues</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>

<body>
<div class="container">
  <div class="row">
    <div class="col-md-6">
      
      

<h1>Exam Issues</h1>
<p><strong>Question:</strong> <?php echo $row_rsQuestion['exam_year']; ?> (<?php echo $row_rsQuestion['exam_subject']; ?>)<br>
  <?php echo nl2br($row_rsQuestion['exam_question']); ?><br>
</p>


      
      
      
    </div>
    <div class="col-md-6">
      
      
      
<h3>Add Issue</h3>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
  <p>
    <label for="rule_id">Issue:</label>
    <br>
    <select name="rule_id" id="rule_id">
      <option value="">Select Issue</option>
      <?php
do {  
?>
      <option value="<?php echo $row_rsIssues['rule_id']?>"><?php echo $row_rsIssues['rule']?></option>
      <?php
} while ($row_rsIssues = mysql_fetch_assoc($rsIssues));
  $rows = mysql_num_rows($rsIssues);
  if($rows > 0) {
      mysql_data_seek($rsIssues, 0);
	  $row_rsIssues = mysql_fetch_assoc($rsIssues);
  }
?>
    </select>
    <label for="question_id"><br>
      <br>
      Sorting:</label>
    <input name="sorting" type="text" id="sorting" value="<?php echo $row_rsMax['maxVal'] + 1; ?>">
  </p>
  <p>
    <label for="call_of_question">Call of Question:</label>
    <input name="call_of_question" type="number" id="call_of_question" value="<?php echo $row_rsMax['maxCall']; ?>">
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
    <input name="question_id" type="hidden" id="question_id" value="<?php echo $_GET['question_id']; ?>">
  </p>
  <input type="hidden" name="MM_insert" value="form1">
</form>      
      
      
      
    </div>
  </div>
  
  
  <div class="row">
    <div class="col-md-12">
      <?php if ($totalRows_rsAnswer > 0) { // Show if recordset not empty ?>
        <h3>View Answers </h3>
        <table width="100%" border="1" cellspacing="0" cellpadding="5">
          <tbody>
            <tr>
              <td><strong>Answer ID</strong></td>
              <td><strong>Issue</strong></td>
              <td><strong>Rule</strong></td>
              <td><strong>Analysis</strong></td>
              <td><strong>Conclusion</strong></td>
              <td><strong>Sorting</strong></td>
              <td><strong>Edit</strong></td>
            </tr>
            <?php do { ?>
              <tr>
                <td><?php echo $row_rsAnswer['answer_id']; ?></td>
                <td><?php echo $row_rsAnswer['rule']; ?></td>
                <td><?php echo $row_rsAnswer['description']; ?></td>
                <td><?php echo $row_rsAnswer['analysis']; ?></td>
                <td><?php echo $row_rsAnswer['conclusion']; ?></td>
                <td><?php echo $row_rsAnswer['sorting']; ?></td>
                <td><a href="#">Edit</a></td>
              </tr>
              <?php } while ($row_rsAnswer = mysql_fetch_assoc($rsAnswer)); ?>
          </tbody>
        </table>
        <?php } // Show if recordset not empty ?>
<p>&nbsp;</p>
    </div>
  </div>
  
  
  
</div>
</body>
</html>
<?php
mysql_free_result($rsQuestion);

mysql_free_result($rsIssues);

mysql_free_result($rsAnswer);

mysql_free_result($rsMax);
?>
