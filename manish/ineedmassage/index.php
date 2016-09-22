<?php
session_name('my_session');
session_start();

define('ROOTDIR', dirname(__FILE__));
define('SITEDIR', ROOTDIR);

define('ENV', 'dev');

$dir = dirname($_SERVER['PHP_SELF']);
if ($dir == '/') $dir = '';

$dir = $dir .'/';

$host = str_replace('www.', '', $_SERVER['HTTP_HOST']);
define('SITENAME', ucwords('MKGalaxy.com'));
define('ROOTDOMAIN', $host);
define('HTTPPATH', 'http://'.$host.$dir);
define('ROOTHTTPPATH', $dir);
define('APIDIR', $dir.'/api');
define('APIHTTPPATH', 'http://'.$host.APIDIR);
define('ADMIN_EMAIL', 'mkgxy@mkgalaxy.com');
define('LOGINURL', 'users/login');
define('PLACESAPIKEY', 'AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw');
define('DEFAULT_LATITUDE', 37.3867);
define('DEFAULT_LONGITUDE', -121.897);
define('ENCRYPTKEY', 'JKjVXtFdY3NNT6Fp6U9uM3m5eeWbtqXWrR5qwWpyM9b8SFSdWVK2vruN');

//more to call class
include_once(SITEDIR.'/conn.php');

//massage types

$massageTypes = array(
                    'type_back' => 
                        array('name' => 'Back', 'description' => 'Back Massage'), 
                    'type_foot' => 
                        array('name' => 'Foot', 'description' => 'Foot Massage'), 
                    'type_body' => 
                        array('name' => 'Body', 'description' => 'Full Body Massage'), 
                    'type_aromatherapy' => 
                        array('name' => 'Aromatherapy', 'description' => 'Aromatherapy massage is massage therapy with adding one or more scented plant oils called essential oils to address specific needs.'), 
                     'type_cranialsacral' => 
                        array('name' => 'Cranial Sacral', 'description' => 'Deep Tissue is similar to Swedish massage, but the technique focuses on the deepest layer of muscles to target knots and release chronic muscle tension.'),
                      'type_deeptissue' => 
                        array('name' => 'Deep Tissue', 'description' => 'Deep Tissue is similar to Swedish massage, but the technique focuses on the deepest layer of muscles to target knots and release chronic muscle tension.'),
                    'type_geriatric' => 
                        array('name' => 'Geriatric', 'description' => 'Geriatric massage relieves anxiety and depression while helping maintain and improve overall health in elderly clients.'), 
                    'type_hotstone' => 
                        array('name' => 'Hot Stone', 'description' => 'Heated, smooth stones are placed on certain points on the body to warm and loosen tight muscles and balance energy centers in the body.'), 
                    'type_nuru' => 
                        array('name' => 'Nuru', 'description' => 'Nuru is an erotic massage technique in which one or more masseuses rubs their body against the clients body after both parties are nude and covered with an odorless and tasteless massage oil. The word originates from the Japanese language and means "slippery/smooth".'), 
                    'type_pregnancy' => 
                        array('name' => 'Pregnancy', 'description' => 'Also called prenatal massage, pregnancy massage is becoming increasingly popular with expectant mothers. Massage therapists who are certified in pregnancy massage know the proper way to position and support the woman\'s body during the massage, and how to modify techniques.'),
                     'type_prenatal' => 
                        array('name' => 'Prenatal', 'description' => 'Deep Tissue is similar to Swedish massage, but the technique focuses on the deepest layer of muscles to target knots and release chronic muscle tension.'), 
                     'type_prostate' =>
                        array('name' => 'Prostate', 'description' => 'Prostate massage is the massage or stimulation of the male prostate gland for sexual stimulation or medical purposes.'),
                     'type_reflexology' => 
                        array('name' => 'Reflexology', 'description' => 'Deep Tissue is similar to Swedish massage, but the technique focuses on the deepest layer of muscles to target knots and release chronic muscle tension.'), 
                     'type_sensuous' =>
                        array('name' => 'Sensuous', 'description' => 'Erotic massage or sensuous massage is the use of massage techniques by a person on another person\'s erogenous zones to achieve or enhance their sexual excitation or arousal and to achieve orgasm.'),
                    'type_shiatsu' => 
                        array('name' => 'Shiatsu', 'description' => 'Shiatsu is a form of Japanese bodywork that uses localized finger pressure in a rhythmic sequence on acupuncture meridians.'), 
                     'type_sports' => 
                        array('name' => 'Sports', 'description' => 'Deep Tissue is similar to Swedish massage, but the technique focuses on the deepest layer of muscles to target knots and release chronic muscle tension.'),
                     'type_tantra' =>
                        array('name' => 'Tantra', 'description' => 'Tantra massage or tantric massage is a form of erotic massage which incorporates elements from the neotantric movement in the Western world.'),
                     'type_swedish' => 
                        array('name' => 'Swedish', 'description' => 'Our most popular therapeutic massage type, the light to medium pressure helps relieve stress, reduce pain, boost mood and promote relaxation.'),   
                    'type_thai' => 
                        array('name' => 'Thai', 'description' => 'Like shiatsu, Thai massage aligns the energies of the body using gentle pressure on specific points. Thai massage also includes compressions and stretches.'), 
                     'type_triggerpoint' => 
                        array('name' => 'Trigger Point', 'description' => 'A trigger point is a tight area within muscle tissue that causes pain in other parts of the body. Trigger Point Therapy is specifically designed to alleviate the source of the pain through cycles of isolated pressure and release.'),
                    );

//massage types ends

define('CLIENTID', '754890700194-4p5reil092esbpr9p3kk46pf31vkl3ub.apps.googleusercontent.com');
define('CLIENTSECRET', '8uvHeE3vQU1HQU0JoA1mRQTK');
define('DEVELOPERKEY', 'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs');

ini_set("include_path", '/home/consultlawyers/php:/home/consultlawyers/public_html/libraries:' . ini_get("include_path") );

require_once('FirePHPCore/FirePHP.class.php');
$firephp = FirePHP::getInstance(true);
$firephp->setEnabled(true);
//my autoloader
function myautoload($class_name) {
    $classPath = SITEDIR.'/api/help/MkGalaxy/'.implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);

function log_error($message, $key='')
{
  global $firephp;
  $firephp->error($message, $key);
  $firephp->trace('Trace');
}

function log_log($message, $key='')
{
  if (ENV === 'prod') {
    return;
  }
  global $firephp;
  $firephp->log($message, $key);
}

function log_info($message, $key='')
{
  global $firephp;
  $firephp->info($message, $key);
}


function log_warn($message, $key='')
{
  global $firephp;
  $firephp->warn($message, $key);
}

include_once('functions.php');
include_once('general.php');

if (isset($_GET['clearSession'])) {
  $_SESSION['location'] = '';
}

if (empty($_SESSION['location']['ipDetails'])) {
  $ipDetails = curlget('http://api.mkgalaxy.com/ip.php?ip='.$_SERVER['REMOTE_ADDR']);
  $tmp = json_decode($ipDetails, true);
  $_SESSION['location']['ipDetails'] = !empty($tmp['data']['result']) ? $tmp['data']['result'] : '';
}

if (empty($_SESSION['location']['nearby'])) {
  $lat = !empty($_SESSION['location']['ipDetails']['lat']) ? $_SESSION['location']['ipDetails']['lat']: '';
  $lng = !empty($_SESSION['location']['ipDetails']['lng']) ? $_SESSION['location']['ipDetails']['lng']: '';
  if (!empty($lat) && !empty($lng)) {
    $location = curlget('http://api.mkgalaxy.com/api.php?action=nearby&lat='.$lat.'&lng='.$lng);
    $tmp = json_decode($location, true);
    $_SESSION['location']['nearby'] = !empty($tmp['data']) ? $tmp['data'] : '';
  }
}
log_log($_SESSION['location']);
$modelGeneral = new Models_General($connMainAdodb);

log_log(__FILE__.' on line number '.__LINE__);

$defaultPage = 'location';
$page = $defaultPage;
$p = $defaultPage;

//override
if (!empty($_GET['q']['action'])) {
  $_GET['p'] = $_GET['q']['action'];
}
//end override

if (!empty($_GET['p'])) {
  $page = $_GET['p'];
  $p = $_GET['p'];
}
$page .= '.php';
$pageTitle = 'Some Page Title';

ob_start();
if (file_exists($page)) {
  include($page);
} else {
  include($defaultPage.'.php');
}

$contentForTemplate = ob_get_clean();

include('template.php');
?>