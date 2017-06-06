<?php
$product = array(     
array("type"=>"fruit", "price"=>3.50, "supplier"=>"company a",  ),    
array("type"=>"milk", "price"=>2.90, "supplier"=>"company z",  ),    
array("type"=>"pork", "price"=>5.43, "supplier"=>"company c",  ),  );

foreach ($product as $key => $row) {
    $price[$key]  = $row['price'];
    $supplier[$key] = $row['supplier'];
}

print_r($price);
print_r($supplier);

echo $x = array_multisort($price, SORT_DESC, $supplier, SORT_ASC, $data);
print_r($data);