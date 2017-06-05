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
  $insertSQL = sprintf("INSERT INTO essay_questions (exam_subject, exam_year, exam_question) VALUES (%s, %s, %s)",
                       GetSQLValueString($_POST['exam_subject'], "text"),
                       GetSQLValueString($_POST['exam_year'], "text"),
                       GetSQLValueString($_POST['exam_question'], "text"));

  mysql_select_db($database_connLaw, $connLaw);
  $Result1 = mysql_query($insertSQL, $connLaw) or die(mysql_error());

  $insertGoTo = "exams.php";
  if (isset($_SERVER['QUERY_STRING'])) {
    $insertGoTo .= (strpos($insertGoTo, '?')) ? "&" : "?";
    $insertGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $insertGoTo));
}

$maxRows_Recordset1 = 200;
$pageNum_Recordset1 = 0;
if (isset($_GET['pageNum_Recordset1'])) {
  $pageNum_Recordset1 = $_GET['pageNum_Recordset1'];
}
$startRow_Recordset1 = $pageNum_Recordset1 * $maxRows_Recordset1;

mysql_select_db($database_connLaw, $connLaw);
$query_Recordset1 = "SELECT * FROM essay_questions ORDER BY question_id ASC";
$query_limit_Recordset1 = sprintf("%s LIMIT %d, %d", $query_Recordset1, $startRow_Recordset1, $maxRows_Recordset1);
$Recordset1 = mysql_query($query_limit_Recordset1, $connLaw) or die(mysql_error());
$row_Recordset1 = mysql_fetch_assoc($Recordset1);

if (isset($_GET['totalRows_Recordset1'])) {
  $totalRows_Recordset1 = $_GET['totalRows_Recordset1'];
} else {
  $all_Recordset1 = mysql_query($query_Recordset1);
  $totalRows_Recordset1 = mysql_num_rows($all_Recordset1);
}
$totalPages_Recordset1 = ceil($totalRows_Recordset1/$maxRows_Recordset1)-1;
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Exams</title>
<style type="text/css">
  body {
    font-family: Verdana;
    font-size: 11px;
  }
</style>
</head>

<body>
<h1>Examination</h1>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
   <p><strong>Year
       <label for="exam_year">:</label>
   </strong>
     <input type="text" name="exam_year" id="exam_year">
   </p>
   <p><strong>Exam Subject:
     </strong>
     <select name="exam_subject" id="exam_subject">
       <option>Choose Subject</option>
       <option value="Contracts Law" selected>Contracts Law</option>
       <option value="Criminal Law">Criminal Law</option>
       <option value="Torts Law">Torts Law</option>
     </select>
   </p>
   <p><strong>Essay Question:</strong><br>
<textarea name="exam_question" cols="60" rows="10" id="exam_question"></textarea>
   </p>
   <p>
     <input type="submit" name="submit" id="submit" value="Submit">
   </p>
   <input type="hidden" name="MM_insert" value="form1">
</form>
<?php if ($totalRows_Recordset1 > 0) { // Show if recordset not empty ?>
  <h3>View Exam Questions</h3>
  <table width="100%" border="1" cellspacing="0" cellpadding="5">
    <tbody>
      <tr>
        <td valign="top"><strong>Question ID</strong></td>
        <td valign="top"><strong>Subject</strong></td>
        <td valign="top"><strong>Year</strong></td>
        <td valign="top"><strong>Question</strong></td>
        <td valign="top"><strong>Issues</strong></td>
      </tr>
      <?php do { ?>
        <tr>
          <td valign="top"><?php echo $row_Recordset1['question_id']; ?></td>
          <td valign="top"><?php echo $row_Recordset1['exam_subject']; ?></td>
          <td valign="top"><?php echo $row_Recordset1['exam_year']; ?></td>
          <td valign="top"><?php echo nl2br($row_Recordset1['exam_question']); ?></td>
          <td valign="top"><a href="exam_issues.php?question_id=<?php echo $row_Recordset1['question_id']; ?>">Issues</a></td>
        </tr>
        <?php } while ($row_Recordset1 = mysql_fetch_assoc($Recordset1)); ?>
    </tbody>
  </table>
  <?php } // Show if recordset not empty ?>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($Recordset1);
?>
