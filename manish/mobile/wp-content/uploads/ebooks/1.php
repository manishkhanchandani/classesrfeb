<?php
$string = 'Android Recipes, 2nd Edition.pdf<br>
Android Recipes, 3rd Edition.pdf<br>
Android Recipes.pdf<br>
Android Studio Application Development.pdf<br>
Beginning Android 4 Application Development.pdf<br>
Beginning Android 4 Games Development.pdf<br>
Beginning Android Web Apps Development.pdf<br>
Developing Android Applications with Adobe AIR.pdf<br>
Developing Android Applications with Flex 4.5.pdf<br>
Developing Android on Android.pdf<br>
Expert Android.pdf<br>
Flash Development for Android Cookbook.pdf<br>
GUI Design for Android Apps.pdf<br>
Head First Android Development.pdf<br>
Learn Android App Development.pdf<br>
Learn Java for Android Development, 2nd Edition.pdf<br>
Learning Android Application Programming for the Kindle Fire.pdf<br>
Practical Android Projects.pdf<br>
Pro Android Augmented Reality.pdf<br>
Pro Android Flash.pdf<br>
Pro Android UI.pdf<br>
Professional Android 4 Application Development.pdf<br>
Professional Android Sensor Programming.pdf<br>
Professional Flash Mobile Development.pdf<br>
Sams Teach Yourself Android Application Development in 24 Hours, 2nd Edition.pdf<br>
Sams Teach Yourself Java in 24 Hours, 6th Edition.pdf';

$tmp = explode('<br>', $string);
foreach ($tmp as $v) {
  $v = trim($v);
  echo '<a href="'.$v.'" target="_blank">'.$v.'</a><br>
';
}