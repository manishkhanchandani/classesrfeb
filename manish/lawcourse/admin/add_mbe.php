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

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
  $_POST['options'] = json_encode($_POST['options']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
  $insertSQL = sprintf("INSERT INTO lawcourse_mbe_quiz (subject, topic, question, options, correct_option, explanation) VALUES (%s, %s, %s, %s, %s, %s)",
                       GetSQLValueString($_POST['subject'], "text"),
                       GetSQLValueString($_POST['topic'], "text"),
                       GetSQLValueString($_POST['question'], "text"),
                       GetSQLValueString($_POST['options'], "text"),
                       GetSQLValueString($_POST['correct_option'], "int"),
                       GetSQLValueString($_POST['explanation'], "text"));

  mysql_select_db($database_connClassesMain, $connClassesMain);
  $Result1 = mysql_query($insertSQL, $connClassesMain) or die(mysql_error());
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Add MBE</title>
</head>

<body>
<p>Add MBE Quiz Question</p>
<p><a href="index.php">Back to Admin</a></p>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
  <p>
    <label for="subject">Subject:</label>
    <select name="subject" id="subject">
      <option value="Contracts" <?php if (!(strcmp("Contracts", $_POST['subject']))) {echo "selected=\"selected\"";} ?>>Contracts</option>
      <option value="Criminal" <?php if (!(strcmp("Criminal", $_POST['subject']))) {echo "selected=\"selected\"";} ?>>Criminal</option>
      <option value="Torts" <?php if (!(strcmp("Torts", $_POST['subject']))) {echo "selected=\"selected\"";} ?>>Torts</option>
    </select>
  </p>
  <p>
    <label for="topic">Topic:</label>
    <input name="topic" type="text" id="topic" size="45">
  </p>
  <p>
    <label for="question">Question:</label>
    <br>
    <textarea name="question" cols="45" rows="5" id="question"></textarea>
  </p>
  <p>
    <label for="options[]">Option 1:</label>
    <input name="options[]" type="text" id="options[]" size="60">
  </p>
  <p>
    <label for="options[]">Option 2:</label>
    <input name="options[]" type="text" id="options[]" size="60">
</p>
  <p>
    <label for="options[]">Option 3:</label>
    <input name="options[]" type="text" id="options[]" size="60">
</p>
  <p>
    <label for="options[]">Option 4:</label>
    <input name="options[]" type="text" id="options[]" size="60">
  </p>
  <p>
    <label for="correct_option">Correct Option:</label>
    <input type="text" name="correct_option" id="correct_option">
  </p>
  <p>
    <label for="explanation">Explanation:</label>
    <br>
    <textarea name="explanation" cols="45" rows="5" id="explanation"></textarea>
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
  </p>
  <p>&nbsp;</p>
  <input type="hidden" name="MM_insert" value="form1">
</form>
<p>&nbsp;</p>
</body>
</html>