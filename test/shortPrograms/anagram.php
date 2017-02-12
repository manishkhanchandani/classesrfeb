<?php

function pr($d) {
  echo '<pre>';
  print_r($d);
  echo '</pre>';
}
class Programs
{
  public static function areStringsAnagrams($a, $b) {
    $return = array();
    try {
      $return['success'] = 1;
      $return['a'] = $a;
      $return['b'] = $b;
      if (count($a) !== count($b)) {
        throw new Exception('count mismatch');
      }
      
      $a = strtolower($a);
      $b = strtolower($b);
      
      $a = str_split($a);
      
      $test = array();
      $compare = array();
      
      // go through the $a and count each key and put it in compare array
      foreach ($a as $key) {
        if (!in_array($key, $test)) {
          array_push($test, $key);
          $compare[$key] = 1;
        } else {
          $compare[$key] += 1;
        }
      }
      
      //loop through compare
      $return['test'] = array();
      foreach ($compare as $key => $value) {
        //echo $key.' = '.$value.'='.$cnt;
        //echo '<br>';
        $cnt = substr_count($b, $key);
        if ($value !== $cnt) {
            throw new Exception ('word count is not match: '.$key.' = '.$value.'='.$cnt);
        }
        $return['test'][] = $key.' = '.$value.'='.$cnt;
      }
      
      $return['error'] = '';
      $return['message'] = 'Words are anagram';
    } catch(Exception $e) {
      $return['success'] = 0;
      $return['error'] = $e->getMessage();
      $return['message'] = 'Words are not anagram';
    }
    
    return $return;
  }//end function
}//end class
//Listen, Silent
//anagram, nagaram
$a = 'anagram';
$b = 'nagaram';
$return = Programs::areStringsAnagrams($a, $b);
pr($return);

?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Anagram Test</title>
<script>
function areStringsAnagrams(a, b) {
  var res = {};
  res.success = 1;
  res.error = '';
  res.message = 'both are anagram';
  a = a.toLowerCase();
  b = b.toLowerCase();
  res.a = a;
  res.b = b;
  
  if (a.length != b.length) {
    res.success = 0;
    res.error = 'length does not matches';
    res.message = 'both are not anagram';
    return res;
  }
  
  var newA = a.split('');
  var newB = b.split('');
  var test = [];
  var compare = {};
  var compare2 = {};
  
  var i;
  for (i = 0; i < newA.length; i++) {
    if (!compare[newA[i]]) {
      compare[newA[i]] = 1;
    } else {
      compare[newA[i]] += 1;
    }
  }
  
  for (i = 0; i < newB.length; i++) {
    if (!compare2[newB[i]]) {
      compare2[newB[i]] = 1;
    } else {
      compare2[newB[i]] += 1;
    }
  }
  console.log('newA: ', newA);
  console.log('compare: ', compare);
  console.log('newB: ', newB);
  console.log('compare2: ', compare2);
  
  res.test = []
  for (var prop in compare) {
    res.test.push('obj.' + prop + '=' + compare[prop] + '=' + compare2[prop]);
    console.log('obj.' + prop, '=', compare[prop] + '=' + compare2[prop]);
    if (compare[prop] !== compare2[prop]) {
      res.success = 0;
      res.error = 'comparison fails';
      res.message = 'both are not anagram';
      return res;
    }
  }
  
  return res;
}
var a = 'anagram';
var b = 'nagaram';
var ret = areStringsAnagrams(a, b);
console.log(ret);
</script>
</head>

<body>
<h1>PHP Anagram Program</h1>
<pre>


class Programs<br>{<br>  public static function areStringsAnagrams($a, $b) {<br>    $return = array();<br>    try {<br>      $return['success'] = 1;<br>      if (count($a) !== count($b)) {<br>        throw new Exception('count mismatch');<br>      }<br>      <br>      $a = strtolower($a);<br>      $b = strtolower($b);<br>      <br>      $a = str_split($a);<br>      <br>      $test = array();<br>      $compare = array();<br>      <br>      // go through the $a and count each key and put it in compare array<br>      foreach ($a as $key) {<br>        if (!in_array($key, $test)) {<br>          array_push($test, $key);<br>          $compare[$key] = 1;<br>        } else {<br>          $compare[$key] += 1;<br>        }<br>      }<br>      <br>      //loop through compare<br>      $return['test'] = array();<br>      foreach ($compare as $key =&gt; $value) {<br>        //echo $key.' = '.$value.'='.$cnt;<br>        //echo '&lt;br&gt;';<br>        $cnt = substr_count($b, $key);<br>        if ($value !== $cnt) {<br>            throw new Exception ('word count is not match: '.$key.' = '.$value.'='.$cnt);<br>        }<br>        $return['test'][] = $key.' = '.$value.'='.$cnt;<br>      }<br>      <br>      $return['error'] = '';<br>      $return['message'] = 'Words are anagram';<br>    } catch(Exception $e) {<br>      $return['success'] = 0;<br>      $return['error'] = $e-&gt;getMessage();<br>      $return['message'] = 'Words are not anagram';<br>    }<br>    <br>    return $return;<br>  }//end function<br>}//end class
</pre>

<h2>Javascript Anagram Program</h2>
<pre>
&lt;script&gt;<br>function areStringsAnagrams(a, b) {<br>  var res = {};<br>  res.success = 1;<br>  res.error = '';<br>  res.message = 'both are anagram';<br>  a = a.toLowerCase();<br>  b = b.toLowerCase();<br>  res.a = a;<br>  res.b = b;<br>  <br>  if (a.length != b.length) {<br>    res.success = 0;<br>    res.error = 'length does not matches';<br>    res.message = 'both are not anagram';<br>    return res;<br>  }<br>  <br>  var newA = a.split('');<br>  var newB = b.split('');<br>  var test = [];<br>  var compare = {};<br>  var compare2 = {};<br>  <br>  var i;<br>  for (i = 0; i &lt; newA.length; i++) {<br>    if (!compare[newA[i]]) {<br>      compare[newA[i]] = 1;<br>    } else {<br>      compare[newA[i]] += 1;<br>    }<br>  }<br>  <br>  for (i = 0; i &lt; newB.length; i++) {<br>    if (!compare2[newB[i]]) {<br>      compare2[newB[i]] = 1;<br>    } else {<br>      compare2[newB[i]] += 1;<br>    }<br>  }<br>  console.log('newA: ', newA);<br>  console.log('compare: ', compare);<br>  console.log('newB: ', newB);<br>  console.log('compare2: ', compare2);<br>  <br>  res.test = []<br>  for (var prop in compare) {<br>    res.test.push('obj.' + prop + '=' + compare[prop] + '=' + compare2[prop]);<br>    console.log('obj.' + prop, '=', compare[prop] + '=' + compare2[prop]);<br>    if (compare[prop] !== compare2[prop]) {<br>      res.success = 0;<br>      res.error = 'comparison fails';<br>      res.message = 'both are not anagram';<br>      return res;<br>    }<br>  }<br>  <br>  return res;<br>}<br>var a = 'anagram';<br>var b = 'nagaram';<br>var ret = areStringsAnagrams(a, b);<br>console.log(ret);<br>&lt;/script&gt;
</pre>
</body>
</html>