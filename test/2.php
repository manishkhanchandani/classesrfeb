<?php
function reverse_number($number)
{
    
   /* Typecast the number into string. */
 
    $snum = (string) $number;
 
    /* Reverse the string. */
 
    $revstr = strrev($snum);
 
    /* Typecast string into int. */
 
    $reverse = (int) $revstr;
 
     return $reverse;
}
 
 echo reverse_number(210);
echo '<br>';
$num = 3245;
$revnum = 0;
while ($num != 0)
{
  echo 'one: '.($num % 10).'<br>';
  $revnum = $revnum * 10 + $num % 10;
  echo '$revnum: '.($revnum).'<br>';
  //below cast is essential to round remainder towards zero
  $num = (int)($num / 10);
  
  echo '$num: '.($num).'<br>';
}
 
echo "Reverse number: $revnum";