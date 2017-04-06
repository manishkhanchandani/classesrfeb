<?php
$pageTitle = "Create New Community";
if (empty($_COOKIE['uid'])) {
  header("Location: home");
  exit;
}

$recordComplete = array();

function saveToFb($firebase, $defaultFirebasePath, $nodesArray, $uid, $id='')
{
  $arr = $nodesArray;
  if (!empty($id)) {
    $p = '/community/approved/'.$id;
    $firebase->update($defaultFirebasePath . $p, $arr);
  } else {
    $p = '/community/pending/';
    $retJson = $firebase->push($defaultFirebasePath . $p, $arr);
    $return = json_decode($retJson, true);

    if (empty($return['name'])) {
      throw new Exception('could not insert');
    }
    $id = $return['name'];
    $p = '/community/users/pending/'.$uid.'/'.$id;
    $firebase->set($defaultFirebasePath . $p, 1);
  }
  
  return $id;
}

if (!empty($_GET['message'])) {
  $error = $_GET['message'];
}

if (!empty($_POST)) {
  if (empty($_COOKIE['uid'])) {
    header("Location: home");
    exit;
  }
  
  try {
    
    //validation
    if (empty($_POST['name'])) {
      throw new Exception('please fill the name');
    }
    
    if (empty($_POST['terms'])) {
      throw new Exception('please check the terms');
    }
  
    $nodesArray = array();

    $nodesArray['name'] = !empty($_POST['name']) ? $_POST['name'] : '';
    $nodesArray['description'] = !empty($_POST['description']) ? $_POST['description'] : '';
    $nodesArray['image'] = !empty($_POST['image']) ? $_POST['image'] : '';
    $nodesArray['updated_dt'] = date('Y-m-d H:i:s');
    $nodesArray['deleted'] = 0;
    $nodesArray['status'] = !empty($_POST['status']) ? $_POST['status'] : 0;
    $nodesArray['approved'] = 0;
    $nodesArray['uid'] = $_COOKIE['uid'];
    $nodesArray['terms'] = !empty($_POST['terms']) ? $_POST['terms'] : 0;

    $profileArray = array();


    if (!empty($recordComplete['node_id'])) {
      $nodesArray['node_id'] = $recordComplete['node_id'];

      $where = sprintf('node_id = %s', $modelGeneral->qstr($nodesArray['node_id']));
      $modelGeneral->updateDetails('nodes', $nodesArray, $where);
      saveToFb($firebase, $defaultFirebasePath, $nodesArray, $_COOKIE['uid'], $id);
      header("Location: newCommunity?node_id=message=".urlencode($message));
      exit;
    } else {
      $nodesArray['created_dt'] = date('Y-m-d H:i:s');
      $modelGeneral->addDetails('nodes', $nodesArray);
      $id = saveToFb($firebase, $defaultFirebasePath, $nodesArray, $_COOKIE['uid']);
      $nodesArray['node_id'] = $id;
      $message = 'Your post is pending for admin approval.';
      header("Location: newCommunity?message=".urlencode($message));
      exit;
    }//end if
  } catch (Exception $e) {
    $error = $e->getMessage();
  }
  
}

if (!empty($_POST)) {
  $recordComplete = array_merge($recordComplete, $_POST);
}
?>
<script>
angular.module('myApp')

.controller('communityController', ['$scope', function($scope) {

}]);
</script>
<div id="communityController" ng-controller="communityController">
<h3>Create New Community</h3>
<?php if (!empty($error)) { ?>

<div class="alert alert-danger" role="alert">
  <?php echo $error; ?>
</div>
<?php } ?>
<form method="post" action="" name="form1" id="form1">
    
    <div class="form-group">
        <label for="name">Community Name<br />
        For example: it can be anything like table tennis, chess, cricket, etc, Note: if some one has created such community then you cannot create it again.
        </label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Community Name" value="<?php echo isset($recordComplete['name']) ? $recordComplete['name'] : ''; ?>" required>
    </div>
    <div class="form-group">
        <label for="description">Description (Write about your community and what you are looking for in your community.)</label>
        <textarea rows="5" class="form-control" id="description" name="description" placeholder="Enter description"><?php echo isset($recordComplete['description']) ? $recordComplete['description'] : ''; ?></textarea>
    </div>
    <div class="form-group">
        <label for="image">Image URL
        </label>
        <input type="text" class="form-control" id="image" name="image" placeholder="Enter Image URL" value="<?php echo isset($recordComplete['image']) ? $recordComplete['image'] : ''; ?>">
    </div>
    

    
    <div class="checkbox">
        <label>
            <input type="checkbox" id="terms" name="terms" value="1" required <?php if (isset($recordComplete['terms']) && $recordComplete['terms'] == 1) { echo ' checked'; } ?>> I agree to <a href="l/terms" target="_blank">terms & conditions</a> and I agree that I am older than 18 years of age.
        </label>
    </div>
    
    <button type="submit" class="btn btn-default">Submit</button>
</form>

</div>