<?php
if (!function_exists('curlget')) {
        function curlget($url, $post=0, $POSTFIELDS='') {
            $https = 0;
            if (substr($url, 0, 5) === 'https') {
                $https = 1;
            }
    
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);  
            if (!empty($post)) {
                curl_setopt($ch, CURLOPT_POST, 1); 
                curl_setopt($ch, CURLOPT_POSTFIELDS,$POSTFIELDS);
            }
    
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
            curl_setopt($ch, CURLOPT_COOKIEJAR,COOKIE_FILE_PATH);
            if (!empty($https)) {
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            }
    
            $result = curl_exec($ch); 
            curl_close($ch);
            return $result;
        }
    }
    
    
    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
        }
    }
    
$url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDiseaseAll';
$string = curlget($url);
$return = json_decode($string, 1);
$hom = $return['data']['hom'];
$diseases = $return['data']['diseases'];
if (!empty($_GET['q'])) {
  $arr = explode('/', $_GET['q']);
  if (!empty($arr[1])) {
    $disease_id = $arr[1];
    $resultDiseaseHom = $hom[$disease_id];
    $resultDisease = $diseases[$disease_id];
  }
  
  if (!empty($arr[2])) {
    $id = $arr[2];
    $resultHom = $hom[$disease_id][$id];
  }
}

$data = array();
$data['title'] = 'HomeopathyRx';
$data['description'] = 'Homeopathy (homeopathic medicine) is a system of medicine founded in the early 19th century by a German physician, Dr. Samuel Christian Hahnemann (1775-1843). Classical homeopathy and homeopathic medicine rests on three principles: The law of similars states that a disease is cured by a medicine that creates symptoms similar to those the patient is experiencing. Hence, an important part of the prescription of a homeopathic medicine is a lengthy interview to determine all the symptoms. The homeopathic physician then prescribes the medicine that best matches the symptoms. The principle of the single remedy states that a single medicine should cover all the symptoms the patient is experiencing: mental, emotional and physical. The principle of the minimum dose has two parts. First, the homeopathic doctor prescribes only a small number of doses of the homeopathic medicine and waits to see what effect the medicine has. Second, the medicine is given in an infinitesimal dose.';

if (!empty($resultDisease)) {
  $data['title'] .= ' :: '.$resultDisease['disease'];
  $data['description'] = 'Homeopathic Treatment of '.$resultDisease['disease'];
}

if (!empty($resultHom)) {
  $data['title'] = 'Homeopathic Remedy For Disease '.$resultDisease['disease'].' With Tongue and Pulse of '.$resultHom['title'];
  $data['description'] = 'Homeopathic Remedy For Disease '.$resultDisease['disease'].' With Tongue and Pulse of '.$resultHom['title'].' is '.implode(', ', $resultHom['remedies']);
}

$dirName = dirname($_SERVER['PHP_SELF']).'/';
if (empty($dirName)) {
  $dirName = '/'; 
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title><?php echo $data['title']; ?></title>
<meta property="og:title" content="<?php echo $data['title']; ?>" />
<meta property="og:type" content="website" />
<meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST']; ?><?php echo $_SERVER['REQUEST_URI']; ?>" />
<meta property="og:description" content="<?php echo $data['description']; ?>" />
<meta property="og:image" content="http://homeopathyrx.tk/img/hom.jpg" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<meta name="description" content="<?php echo $data['description']; ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
  
</head>

<body>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      
        <h1><?php echo $data['title']; ?></h1>
    
    
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
        <?php if (!empty($resultHom)) { ?>
        <h3>Remedy Prescribed: <?php echo implode(', ', $resultHom['remedies']); ?></h3>
        <hr><br><br>
        <?php } ?>
        
        <?php if (!empty($resultDiseaseHom)) { ?>
        <h3>Choose Tongue and Pulse For Disease "<?php echo $resultDisease['disease']; ?>"</h3>
        <ul class="list-group">
          <?php foreach ($resultDiseaseHom as $k => $v) { ?>
          <li class="list-group-item">
            <a href="<?php echo $dirName; ?>rx/<?php echo $v['disease_id']; ?>/<?php echo $v['id']; ?>"><?php echo $v['title']; ?></a>
          </li>
          <?php } ?>
        </ul>
        <?php } ?>
        
        <h3>List of Diseases</h3>
        <ul class="list-group">
          <?php foreach ($diseases as $k => $v) { ?>
          <li class="list-group-item">
            <a href="<?php echo $dirName; ?>rx/<?php echo $k; ?>"><?php echo $v['disease']; ?></a>
          </li>
          <?php } ?>
        </ul>
    
    
    </div>
  </div>
</div>

<?php

pr($resultDisease);
pr($resultHom);
pr($resultDiseaseHom);
pr($_GET);
pr($return);
exit;
?>
</body>
</html>