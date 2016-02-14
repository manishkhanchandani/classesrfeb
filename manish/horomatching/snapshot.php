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
    
function currentMatch($params=array()) {
  $url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=continuityLatLng&noOfDays='.$params[8].'&from[dob]='.urlencode($params[2]).'&from[lat]='.$params[3].'&from[lng]='.$params[4].'&to[dob]='.urlencode($params[5]).'&to[lat]='.$params[6].'&to[lng]='.$params[7];
  $string = curlget($url);
  $return = json_decode($string, 1);
  $data = array();
  $data['params'] = $params;
  $data['results'] = $return['data'];
  $data['title'] = $params[1]."'s Good & Bad Days";
  $data['description'] =  $data['title'];
  return $data;
}

$data = array();
$data['title'] = 'Horo Match Making';
$data['description'] = 'Vedic Astrology has an excellent and proven method of horoscope matching based on nakshatras (Lunar Constellations), which is called Ashtakoot milan or simply guna milap. This kundali matching method assigns points for factors that influence marriage. More the points, more chances of success of the marriage. Though this method is not restricted to marriage only and can be used for compatibility analysis between boy and girl with slight modification.';
if (!empty($_GET['q'])) {
  $arr = explode('/', $_GET['q']);
  if ($arr[0] === 'currentMatch') {
    $data = currentMatch($arr); 
  }
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
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<meta name="description" content="<?php echo $data['description']; ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
  
</head>

<body>

<?php if ($arr[0] === 'currentMatch') { ?>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      
        <h1><?php echo $data['title']; ?></h1>
    
    
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      
        <ul class="list-group">
          <?php foreach ($data['results'] as $v) { ?>
          <li class="list-group-item">
            <strong>Date:</strong> <?php echo $v['date']; ?>
            <br />
            <strong>Points:</strong> <?php echo $v['result']['points']; ?> (<strong><?php echo $v['result']['results']; ?></strong>)
          </li>
          <?php } ?>
        </ul>
    
    
    </div>
  </div>
</div>
<?php } ?>


</body>
</html>