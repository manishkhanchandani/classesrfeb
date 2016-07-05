<?php
if (!empty($_POST)) {
  $data = array();
  $data['california_residents'] = $_POST['california_residents'];
  $data['california_residents'] = $_POST['california_residents'];
  $data['california_residents'] = $_POST['california_residents'];
  $data['california_residents'] = $_POST['california_residents'];
  $Models_General->
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<p>First Form Sample</p>
<form id="form1" name="form1" method="post">
  <p>
    <label for="first_name">First Name:</label>
    <input type="text" name="first_name" id="first_name">
  </p>
  <p>
    <label for="last_name">Last Name:</label>
    <input type="text" name="last_name" id="last_name">
  </p>
  <p>
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
  </p>
  <p>Gender</p>
  <p>
    <label>
      <input type="radio" name="gender" value="m" id="gender_0">
    Male</label>
    <br>
    <label>
      <input type="radio" name="gender" value="f" id="gender_1">
      Female</label>
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
    <br>
  </p>
</form>
<p>&nbsp;</p>
</body>
</html>