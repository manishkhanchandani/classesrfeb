<?php require_once('../../../Connections/connClassesMain.php'); ?>
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
  $_POST['options'] = json_encode($_POST['options']);
}


if ((isset($_POST["MM_update"])) && ($_POST["MM_update"] == "form1")) {
  $updateSQL = sprintf("UPDATE lawcourse_mbe_quiz SET subject=%s, topic=%s, question=%s, options=%s, correct_option=%s, explanation=%s, flag=%s WHERE id=%s",
                       GetSQLValueString($_POST['subject'], "text"),
                       GetSQLValueString($_POST['topic'], "text"),
                       GetSQLValueString($_POST['question'], "text"),
                       GetSQLValueString($_POST['options'], "text"),
                       GetSQLValueString($_POST['correct_option'], "int"),
                       GetSQLValueString($_POST['explanation'], "text"),
                       GetSQLValueString($_POST['flag'], "int"),
                       GetSQLValueString($_POST['id'], "int"));

  mysql_select_db($database_connClassesMain, $connClassesMain);
  $Result1 = mysql_query($updateSQL, $connClassesMain) or die(mysql_error());
}

$colname_rsView = "-1";
if (isset($_GET['id'])) {
  $colname_rsView = $_GET['id'];
}
mysql_select_db($database_connClassesMain, $connClassesMain);
$query_rsView = sprintf("SELECT * FROM lawcourse_mbe_quiz WHERE id = %s", GetSQLValueString($colname_rsView, "int"));
$rsView = mysql_query($query_rsView, $connClassesMain) or die(mysql_error());
$row_rsView = mysql_fetch_assoc($rsView);
$totalRows_rsView = mysql_num_rows($rsView);
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<p>Edit Question</p>
<p><a href="index.php">Back</a></p>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
  <p>
    <label for="subject">Subject:</label>
    <select name="subject" id="subject">
      <option value="Contracts" <?php if (!(strcmp("Contracts", $row_rsView['subject']))) {echo "selected=\"selected\"";} ?>>Contracts</option>
      <option value="Criminal" <?php if (!(strcmp("Criminal", $row_rsView['subject']))) {echo "selected=\"selected\"";} ?>>Criminal</option>
      <option value="Torts" <?php if (!(strcmp("Torts", $row_rsView['subject']))) {echo "selected=\"selected\"";} ?>>Torts</option>
    </select>
  </p>
  <p>
    <label for="topic">Topic:</label>
    <input name="topic" type="text" id="topic" value="<?php echo $row_rsView['topic']; ?>" size="45">
  </p>
  <p>
    <label for="question">Question:</label>
    <br>
    <textarea name="question" cols="45" rows="5" id="question"><?php echo $row_rsView['question']; ?></textarea>
  </p>
  <?php $options = json_decode($row_rsView['options'], 1); ?>
  <p>
    <label for="options[]">Option 1:</label>
    <input name="options[]" type="text" id="options[]" value="<?php echo $options[0]; ?>" size="60">
  </p>
  <p>
    <label for="options[]">Option 2:</label>
    <input name="options[]" type="text" id="options[]" value="<?php echo $options[1]; ?>" size="60">
  </p>
  <p>
    <label for="options[]">Option 3:</label>
    <input name="options[]" type="text" id="options[]" value="<?php echo $options[2]; ?>" size="60">
  </p>
  <p>
    <label for="options[]">Option 4:</label>
    <input name="options[]" type="text" id="options[]" value="<?php echo $options[3]; ?>" size="60">
  </p>
  <p>
    <label for="correct_option">Correct Option:</label>
    <input name="correct_option" type="text" id="correct_option" value="<?php echo $row_rsView['correct_option']; ?>">
  </p>
  <p>
    <label for="explanation">Explanation:</label>
    <br>
    <textarea name="explanation" cols="45" rows="5" id="explanation"><?php echo $row_rsView['explanation']; ?></textarea>
  </p>
  <p>
    <label for="flag">Flag:</label>
    <input name="flag" type="text" id="flag" value="<?php echo $row_rsView['flag']; ?>" size="45">
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
    <input name="id" type="hidden" id="id" value="<?php echo $row_rsView['id']; ?>">
  </p>
  <p></p>
  <input type="hidden" name="MM_update" value="form1">
</form>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($rsView);
?>
