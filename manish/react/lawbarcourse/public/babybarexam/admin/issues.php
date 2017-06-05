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
  $insertSQL = sprintf("INSERT INTO rules (rule, `description`, rule_subject) VALUES (%s, %s, %s)",
                       GetSQLValueString($_POST['rule'], "text"),
                       GetSQLValueString($_POST['description'], "text"),
                       GetSQLValueString($_POST['rule_subject'], "text"));

  mysql_select_db($database_connLaw, $connLaw);
  $Result1 = mysql_query($insertSQL, $connLaw) or die(mysql_error());

  $insertGoTo = "issues.php";
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
$query_Recordset1 = "SELECT * FROM rules ORDER BY rule_id ASC";
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
<title>Issues / Rules</title>
<style type="text/css">
  body {
    font-family: Verdana;
    font-size: 11px;
  }
</style>
</head>

<body>
<h1>Issues / Rules</h1>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
   <p>Rule
     <label for="rule">:</label>
<input name="rule" type="text" required="required" id="rule" autofocus>
   </p>
   <p>
     <label for="description">Description:<br>
     </label>
     <textarea name="description" cols="35" rows="5" id="description"></textarea>
   </p>
   <p>
     <label for="rule_subject">Subject:</label>
     <select name="rule_subject" id="rule_subject">
       <option>Choose Subject</option>
       <option value="Contracts Law" selected>Contracts Law</option>
       <option value="Criminal Law">Criminal Law</option>
       <option value="Torts Law">Torts Law</option>
     </select>
   </p>
   <p>
     <input type="submit" name="submit" id="submit" value="Submit">
      <input type="hidden" name="MM_insert" value="form1">
   </p>
</form>
<?php if ($totalRows_Recordset1 > 0) { // Show if recordset not empty ?>
  <h3>View Issues/Rules</h3>
  <table width="100%" border="1" cellspacing="0" cellpadding="5">
    <tbody>
      <tr>
        <td valign="top"><strong>Rule Id</strong></td>
        <td valign="top"><strong>Rule</strong></td>
        <td valign="top"><strong>Description</strong></td>
        <td valign="top"><strong>Subject</strong></td>
      </tr>
        <?php do { ?>
      <tr>
          <td valign="top"><?php echo $row_Recordset1['rule_id']; ?></td>
          <td valign="top"><?php echo $row_Recordset1['rule']; ?></td>
          <td valign="top"><?php echo $row_Recordset1['description']; ?></td>
          <td valign="top"><?php echo $row_Recordset1['rule_subject']; ?></td>
      </tr>
          <?php } while ($row_Recordset1 = mysql_fetch_assoc($Recordset1)); ?>
    </tbody>
  </table>
  <p>&nbsp;</p>
  <?php } // Show if recordset not empty ?>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($Recordset1);
?>
