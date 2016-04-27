<?php
$payRequest = new PayRequest();

$receiver = array();
$receiver[0] = new Receiver();
$receiver[0]->amount = "1.00";
$receiver[0]->email = "platfo_1255170694_biz@gmail.com";
 				
$receiver[1] = new Receiver();
$receiver[1]->amount = "2.00";
$receiver[1]->email = "platfo_1255612361_per@gmail.com";
$receiver[1]->primary = "true";
$receiverList = new ReceiverList($receiver);
$payRequest->receiverList = $receiverList;

$requestEnvelope = new RequestEnvelope("en_US");
$payRequest->requestEnvelope = $requestEnvelope; 
$payRequest->actionType = "PAY";
$payRequest->cancelUrl = "http://core.mkgalaxy.com/projects/classesrfeb/manish/bigproject/php/paypal/examples/cancel.html";
$payRequest->returnUrl = "http://core.mkgalaxy.com/projects/classesrfeb/manish/bigproject/php/paypal/examples/success.html";
$payRequest->currencyCode = "USD";
$payRequest->ipnNotificationUrl = "http://core.mkgalaxy.com/projects/classesrfeb/manish/bigproject/php/paypal/examples/ipn.php";

$sdkConfig = array(
	"mode" => "sandbox",
	"acct1.UserName" => "jb-us-seller_api1.paypal.com",
	"acct1.Password" => "WX4WTU3S8MY44S7F",
	"acct1.Signature" => "AFcWxV21C7fd0v3bYYYRCpSSRl31A7yDhhsPUU2XhtMoZXsWHFxu-RWy",
	"acct1.AppId" => "APP-80W284485P519543T"
);

$adaptivePaymentsService = new AdaptivePaymentsService($sdkConfig);
$payResponse = $adaptivePaymentsService->Pay($payRequest);