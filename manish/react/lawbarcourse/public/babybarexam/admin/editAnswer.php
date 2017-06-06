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

if ((isset($_POST["MM_update"])) && ($_POST["MM_update"] == "form1")) {
  $updateSQL = sprintf("UPDATE essay_answers SET rule_id=%s, analysis=%s, conclusion=%s, sorting=%s, call_of_question=%s WHERE answer_id=%s",
                       GetSQLValueString($_POST['rule_id'], "int"),
                       GetSQLValueString($_POST['analysis'], "text"),
                       GetSQLValueString($_POST['conclusion'], "text"),
                       GetSQLValueString($_POST['sorting'], "int"),
                       GetSQLValueString($_POST['call_of_question'], "int"),
                       GetSQLValueString($_POST['answer_id'], "int"));

  mysql_select_db($database_connLaw, $connLaw);
  $Result1 = mysql_query($updateSQL, $connLaw) or die(mysql_error());

  $updateGoTo = "exam_issues.php";
  if (isset($_SERVER['QUERY_STRING'])) {
    $updateGoTo .= (strpos($updateGoTo, '?')) ? "&" : "?";
    $updateGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $updateGoTo));
}

$colname_rsEdit = "-1";
if (isset($_GET['answer_id'])) {
  $colname_rsEdit = $_GET['answer_id'];
}
mysql_select_db($database_connLaw, $connLaw);
$query_rsEdit = sprintf("SELECT * FROM essay_answers WHERE answer_id = %s", GetSQLValueString($colname_rsEdit, "int"));
$rsEdit = mysql_query($query_rsEdit, $connLaw) or die(mysql_error());
$row_rsEdit = mysql_fetch_assoc($rsEdit);
$totalRows_rsEdit = mysql_num_rows($rsEdit);

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


?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Answer</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>

<body>
<div class="container">
<h1>Edit Answer</h1>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
  <p>
    <label for="rule_id">Issue:</label>
    <br>
    <select name="rule_id" id="rule_id">
      <option value="" <?php if (!(strcmp("", $row_rsEdit['rule_id']))) {echo "selected=\"selected\"";} ?>>Select Issue</option>
      <?php
do {  
?>
      <option value="<?php echo $row_rsIssues['rule_id']?>"<?php if (!(strcmp($row_rsIssues['rule_id'], $row_rsEdit['rule_id']))) {echo "selected=\"selected\"";} ?>><?php echo $row_rsIssues['rule']?></option>
      <?php
} while ($row_rsIssues = mysql_fetch_assoc($rsIssues));
  $rows = mysql_num_rows($rsIssues);
  if($rows > 0) {
      mysql_data_seek($rsIssues, 0);
	  $row_rsIssues = mysql_fetch_assoc($rsIssues);
  }
?>
    </select>
    <label for="answer_id"><br>
      <br>
      Sorting:</label>
    <input name="sorting" type="text" id="sorting" value="<?php echo $row_rsEdit['sorting']; ?>">
  </p>
  <p>
    <label for="call_of_question">Call of Question:</label>
    <input name="call_of_question" type="number" id="call_of_question" value="<?php echo $row_rsEdit['call_of_question']; ?>">
  </p>
  <p>
    <label for="analysis">Analysis:</label>
  </p>
  <p>
    <textarea name="analysis" cols="70" rows="7" id="analysis"><?php echo htmlspecialchars($row_rsEdit['analysis']); ?></textarea>
  </p>
  <p>
    <label for="conclusion">Conclusion:</label>
  </p>
  <p>
    <textarea name="conclusion" cols="70" rows="5" id="conclusion"><?php echo htmlspecialchars($row_rsEdit['conclusion']); ?></textarea>
  </p>
  <p>&nbsp;</p>
  <p>
    <input type="submit" name="submit" id="submit" value="Update">
    <input name="answer_id" type="hidden" id="answer_id" value="<?php echo $row_rsEdit['answer_id']; ?>">
  </p>
  <input type="hidden" name="MM_update" value="form1">
</form>
<p>&nbsp;</p>

</div>
</body>
</html>
<?php
mysql_free_result($rsEdit);

mysql_free_result($rsQuestion);

mysql_free_result($rsIssues);
?>
