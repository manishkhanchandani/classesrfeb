<?php
function pr($d) { echo '<pre>'; print_r($d); echo '</pre>'; }

function recursive_counter($counter)
{
  if ($counter % 2 === 0) {
    $parent1 = $counter / 2;
    if ($parent1 < 1) $parent1 = 0;
  } else {
    $parent1 = ($counter - 1) / 2;
    if ($parent1 < 1) $parent1 = 0;
  }
  
  return $parent1;
}


function calc_recursive_counter($counter)
{
  $arr = array();
  $parent1 = recursive_counter($counter);
  array_push($arr, $parent1);
  $parent2 = recursive_counter($parent1);
  array_push($arr, $parent2);
  $parent3 = recursive_counter($parent2);
  array_push($arr, $parent3);
  $parent4 = recursive_counter($parent3);
  array_push($arr, $parent4);
  return $arr;
}

$counter = 6;
$arr = calc_recursive_counter($counter);
pr($arr);
?>