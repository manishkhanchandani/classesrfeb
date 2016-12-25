<?php pr($_GET); 

if (empty($_GET['id'])) {
  header("Location: /");
  ext;
}

$googleUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='.$_GET['id'].'&key='.PLACESAPIKEY;



$Biz = new Biz();

$rs = $Biz->detailBiz($_GET['id'], 0);

pr($rs);

if (empty($rs['details'])) {
  echo $googleUrl;

  $res = curlget($googleUrl);
  $results = json_decode($res, true);

  pr($results);
} else {
  
}



?>