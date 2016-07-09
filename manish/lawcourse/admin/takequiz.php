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

$qs = http_build_query($_GET);
if ((isset($_GET['id'])) && ($_GET['id'] != "")) {
  $updateSQL = sprintf("UPDATE lawcourse_mbe_quiz SET flag = 1 WHERE id=%s",
                       GetSQLValueString($_GET['id'], "int"));

  mysql_select_db($database_connClassesMain, $connClassesMain);
  $Result1 = mysql_query($updateSQL, $connClassesMain) or die(mysql_error());
  
  unset($_GET['id']);
  unset($_GET['totalRows_rsView']);
  unset($_GET['pageNum_rsView']);
  $qs = http_build_query($_GET);
  header("Location: takequiz.php?".$qs);
  exit;
}
if ((isset($_GET['start'])) && ($_GET['start'] != "")) {
  $updateSQL = "UPDATE lawcourse_mbe_quiz SET flag = 0";

  mysql_select_db($database_connClassesMain, $connClassesMain);
  $Result1 = mysql_query($updateSQL, $connClassesMain) or die(mysql_error());
  
  unset($_GET['start']);
  $qs = http_build_query($_GET);
  header("Location: takequiz.php?".$qs);
  exit;
}

$search = '';
if (!empty($_GET['subject'])) {
  $search .= ' AND subject = '.GetSQLValueString($_GET['subject'], 'text');
}
if (!empty($_GET['topic'])) {
  $search .= ' AND topic LIKE '.GetSQLValueString('%'.$_GET['topic'].'%', 'text');
}
if (!empty($_GET['kw'])) {
  $search .= ' AND (question LIKE '.GetSQLValueString('%'.$_GET['kw'].'%', 'text').' OR options LIKE '.GetSQLValueString('%'.$_GET['kw'].'%', 'text').' OR explanation LIKE '.GetSQLValueString('%'.$_GET['kw'].'%', 'text').')';
}

mysql_select_db($database_connClassesMain, $connClassesMain);
$query_rsSubject = "SELECT DISTINCT subject FROM lawcourse_mbe_quiz ORDER BY subject ASC";
$rsSubject = mysql_query($query_rsSubject, $connClassesMain) or die(mysql_error());
$row_rsSubject = mysql_fetch_assoc($rsSubject);
$totalRows_rsSubject = mysql_num_rows($rsSubject);

$maxRows_rsView = 10;
$pageNum_rsView = 0;
if (isset($_GET['pageNum_rsView'])) {
  $pageNum_rsView = $_GET['pageNum_rsView'];
}
$startRow_rsView = $pageNum_rsView * $maxRows_rsView;

mysql_select_db($database_connClassesMain, $connClassesMain);
$query_rsView = "SELECT * FROM lawcourse_mbe_quiz WHERE flag = 0 $search ORDER BY id ASC";
$query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
$rsView = mysql_query($query_limit_rsView, $connClassesMain) or die(mysql_error());
$row_rsView = mysql_fetch_assoc($rsView);

if (isset($_GET['totalRows_rsView'])) {
  $totalRows_rsView = $_GET['totalRows_rsView'];
} else {
  $all_rsView = mysql_query($query_rsView);
  $totalRows_rsView = mysql_num_rows($all_rsView);
}
$totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;


$queryString_rsView = "";
if (!empty($_SERVER['QUERY_STRING'])) {
  $params = explode("&", $_SERVER['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_rsView") == false && 
        stristr($param, "totalRows_rsView") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString_rsView = "&" . htmlentities(implode("&", $newParams));
  }
}
$queryString_rsView = sprintf("&totalRows_rsView=%d%s", $totalRows_rsView, $queryString_rsView);


?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Quiz</title>
<script src="../js/jquery-1.11.3.min.js"></script>
<script>
var count = 0;
function checkOption(id) {
  if ($('input[name=options_'+id+']:checked').val() == $('#correct_option_'+id).val()) {
    count++;
    alert('correct answer. your total score is ' + count);
    showExplanation(id);
  } else {
    alert('incorrect answer. your total score is ' + count);
  }
}

function showExplanation(id) {
  $('#explanation_'+id).toggle(); 
}
$( document ).ready(function() {
    
});
</script>
</head>

<body>
<p>Take Quiz</p>
<p><a href="index.php">Back</a> | <a href="takequiz.php?start=1">Start Again</a></p>
<form id="form1" name="form1" method="get">
  <label for="subject">Subject:</label>
  <select name="subject" id="subject">
    <option value="Select" <?php if (!(strcmp("Select", $_GET['subject']))) {echo "selected=\"selected\"";} ?>>Select</option>
    <?php
do {  
?>
    <option value="<?php echo $row_rsSubject['subject']?>"<?php if (!(strcmp($row_rsSubject['subject'], $_GET['subject']))) {echo "selected=\"selected\"";} ?>><?php echo $row_rsSubject['subject']?></option>
    <?php
} while ($row_rsSubject = mysql_fetch_assoc($rsSubject));
  $rows = mysql_num_rows($rsSubject);
  if($rows > 0) {
      mysql_data_seek($rsSubject, 0);
	  $row_rsSubject = mysql_fetch_assoc($rsSubject);
  }
?>
  </select>
  <label for="topic">Topic:</label>
  <input name="topic" type="text" id="topic" value="<?php echo $_GET['topic']; ?>">
  <label for="kw">Keyword:</label>
  <input name="kw" type="text" id="kw" value="<?php echo $_GET['kw']; ?>">
  <input type="submit" name="submitSearch" id="submitSearch" value="Submit">
</form>
<hr>
<?php if ($totalRows_rsView > 0) { // Show if recordset not empty ?>
  <?php do { ?>
    <p><strong>Subject:</strong><br>
      <?php echo $row_rsView['subject']; ?></p>
    <p><strong>Topic:</strong><br>
      <?php echo $row_rsView['topic']; ?></p>
    <p><strong>Question:</strong><br>
      <?php echo nl2br($row_rsView['question']); ?></p>
    <p><strong>Options:</strong><br>
      <?php $options = json_decode(stripslashes($row_rsView['options']), 1);
       ?>
      <?php foreach ($options as $k => $v) { ?>
      <input type="radio" name="options_<?php echo $row_rsView['id']; ?>" id="options_<?php echo ($k + 1); ?>" value="<?php echo ($k + 1); ?>" onChange="checkOption('<?php echo $row_rsView['id']; ?>');">
      <?php echo $v; ?><br />
      <?php } ?>
    </p>
    <p id="explanation_<?php echo $row_rsView['id']; ?>" style="display:none;"><strong>Explanation:</strong><br>
      <?php echo nl2br($row_rsView['explanation']); ?></p>
    <p>
      <input type="hidden" name="correct_option_<?php echo $row_rsView['id']; ?>" id="correct_option_<?php echo $row_rsView['id']; ?>" value="<?php echo $row_rsView['correct_option']; ?>">
      <input type="button" name="submit" id="submit" value="Check" onClick="checkOption('<?php echo $row_rsView['id']; ?>')">
      <input type="button" name="submitExp" id="submitExp" value="Show/Hide Explanation" onClick="showExplanation('<?php echo $row_rsView['id']; ?>')">
      <br><br><br>
      <a href="takequiz.php?<?php echo $qs; ?>&id=<?php echo $row_rsView['id']; ?>">Mark this quiz as read</a> |
      <a href="edit_mbe.php?id=<?php echo $row_rsView['id']; ?>">Edit</a>
    </p>
    <hr>
    <?php } while ($row_rsView = mysql_fetch_assoc($rsView)); ?>
  <p><?php echo ($startRow_rsView + 1) ?> To <?php echo min($startRow_rsView + $maxRows_rsView, $totalRows_rsView) ?> of <?php echo $totalRows_rsView ?></p>
  <table border="0">
    <tr>
      <td><?php if ($pageNum_rsView > 0) { // Show if not first page ?>
          <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, 0, $queryString_rsView); ?>">First</a>
          <?php } // Show if not first page ?></td>
      <td><?php if ($pageNum_rsView > 0) { // Show if not first page ?>
          <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, max(0, $pageNum_rsView - 1), $queryString_rsView); ?>">Previous</a>
          <?php } // Show if not first page ?></td>
      <td><?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
          <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, min($totalPages_rsView, $pageNum_rsView + 1), $queryString_rsView); ?>">Next</a>
          <?php } // Show if not last page ?></td>
      <td><?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
          <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, $totalPages_rsView, $queryString_rsView); ?>">Last</a>
          <?php } // Show if not last page ?></td>
    </tr>
  </table>
  <?php } // Show if recordset not empty ?>
<?php if ($totalRows_rsView == 0) { // Show if recordset empty ?>
  <p>No Record Found.</p>
  <?php } // Show if recordset empty ?>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($rsSubject);

mysql_free_result($rsView);
?>
