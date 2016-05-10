<?php
 
/*
This simple IPN listener will create a text file (SampleIPNDump.txt) that will show you all the values being sent from PayPal
via EZChain. WARNING: PayPal sends data to the IPN listener for a variety of different actions and events, and the SampleIPNDump.txt 
file will be overwritten each time. Be sure to configure the correct public URL to this IPN listener inside your PayPal account 
profile. You will need to modify the PHP code below so it does what you want. You may wish to write data to a database, send an 
email, or perform other actions as required by your business.
 
Instructions to configure your PayPal account to enable IPN and point it at your IPN listener:
(1) Log into your PayPal account (either LIVE or SANDBOX TEST ACCOUNT).
(2) Click "Profile" (near the top-right of the page).
(3) Click "My selling tools".
(4) Locate the "Getting paid and managing my risk" section --> click the "Update" link for "Instant payment notifications"
(5) Click the "Turn On IPN" button if IPN is turned off.
(6) Enter the URL to your IPN listener file. Save your settings.
(7) Log into your EZChain account, click Profile, and enter the same URL in the "IPN URL" box.
(8) You will now receive IPN notifications to that URL.
 
IMPORTANT: This sample creates a text file and dumps values (from PayPal) into it. This isn't 
           the ideal setup. You'll eventually want to replace the text file creation with code 
           to write to your database or at least generate an email to you and/or recipients of 
           the transaction. EZChain developers can build these types of custom integrations for 
           you, for a fee. A typical custom IPN integration costs $500 - $1,200, depending on 
           complexity.
*/
 
$myFile = "SampleIPNDump.txt";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = "==== " . date('r') . " ====" . chr(13) . chr(10);
 
while (list($key, $value) = each($_POST))
{
    if ("" != $value)
    {
        $stringData .= "POST: $key = $value" . chr(13) . chr(10);
         
         
        if(is_array($value)){
            while (list($key2, $value2) = each($value))
            {
                if ($value2 != "")
                {
                    $stringData .= "   Sub-array POST: $key2 = $value2" . chr(13) . chr(10);
                }
            }
        }
    }
}
 
// The 4 items below are specific to EZChain, and are optional. If you don't configure them in your EZChain button
// they will not come through to the IPN listener.
$stringData .= "InvoiceID: " . $_GET["InvoiceID"] . chr(13) . chr(10); // optional - can be passed in on the IPN URL
$stringData .= "Custom1: " . $_GET["Custom1"] . chr(13) . chr(10); // optional - can be passed in on the IPN URL
$stringData .= "Custom2: " . $_GET["Custom2"] . chr(13) . chr(10); // optional - can be passed in on the IPN URL
$stringData .= "Custom3: " . $_GET["Custom3"] . chr(13) . chr(10); // optional - can be passed in on the IPN URL
 
fwrite($fh, $stringData);
fclose($fh);
?>