<?php
log_log(__FILE__.' on line number '.__LINE__);
$pageTitle = 'View 1';
if (!empty($_POST)) {
  pr($_POST);
  exit; 
}
?>
<div class="row">
  <div class="col-md-12">
    <h1>WYSIWYG</h1>
    <form method="post" name="form1" id="form1" onSubmit="return checkForm();">
    <div id="summernote">Hello Summernote</div>
    <input type="submit" class="btn btn-default">Submit</input>
    </form>
  </div>
</div>
<!-- include summernote css/js-->
<link href="utilities/wysiwyg/summernote.css" rel="stylesheet">
<script src="utilities/wysiwyg/summernote.js"></script>
<script language="javascript">
$(document).ready(function() {
  $('#summernote').summernote({
    height: 300,                 // set editor height
    minHeight: null,             // set minimum height of editor
    maxHeight: null,             // set maximum height of editor
    focus: true                  // set focus to editable area after initializing summernote
  });
  
  function checkform() {
    var markupStr = $('#summernote').summernote('code');
    console.log(markupStr); 
    return false; 
  }
});

</script>