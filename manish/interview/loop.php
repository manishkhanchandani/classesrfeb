<?php 


if (!function_exists('pr')) {
function pr($d){
	echo '<pre>';
	print_r($d);
	echo '</pre>';
}
}




function url_name_v2($name='')
{
	if (empty($name)) {
		return $name;
	}

	$patterns = array();
	$patterns[0] = "/\s+/";
	$patterns[1] = '/[^A-Za-z0-9]+/';
	$replacements = array();
	$replacements[0] = "-";
	$replacements[1] = '-';
	ksort($patterns);
	ksort($replacements);
	$output = preg_replace($patterns, $replacements, $name);
	$output = strtolower($output);
	return $output;
}//end list_name_url()


$files = scandir('leetcode-javascript-master/');
$result = "";
$list = '<table width="100%" border="1" cellspacing="0" cellpadding="5">
    ';
        
foreach($files as $file) {
	if ($file === '.' || $file === '..' || $file === '.gitignore' || $file === 'index.html' || $file === 'README.md') continue;
  //do your work here
  echo "File is $file<br />";
  $content = file_get_contents('leetcode-javascript-master/'.$file);
  $name = url_name_v2($file);
  $list .= '<tr><td valign="top"><a href="#'.$name.'">'.$file.'</a></td><tr>';
  $result .= "<div>
<h3>$file</h3>
<a name=\"$name\"></a>
<pre>
$content
</pre>
<hr />
</div>\n\n";
}
$list .= '</table>';

file_put_contents('sample.txt', $result);
file_put_contents('samplelist.txt', $list);
?>
