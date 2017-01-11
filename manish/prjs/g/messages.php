<?php
$pageTitle = "Messages";
if (empty($_COOKIE['uid'])) {
  header("Location: home");
  exit;
}

$toId = '';

if (!empty($_GET['toId'])) {
  $toId = $_GET['toId'];
}

if ($toId === $_COOKIE['uid']) {
  $toId = '';
}
?>
<script>
angular.module('myApp')

.controller('messagesController', ['$scope', function($scope) {

}]);
</script>
<div ng-controller="messagesController">
  <div messages user-data="userData" to-user-id="<?php echo $toId; ?>" url="<?php echo $siteConfig['MESSAGE_URL']; ?>"></div>
</div>