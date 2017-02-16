var CoinsCalculator = {};
// An array of available coin values.
var $coins = [200, 100, 50, 20, 2, 1];

CoinsCalculator.init = function(e) {

	var $keynum;				
	$keynum = e.keyCode;
	
	var $aside = document.getElementById('enter');

	// If return key is pushed (keyno 13).
	if($keynum === 13) {
		$aside.innerHTML = "";
		CoinsCalculator.calcCoins();
	} else {
		$aside.innerHTML = "Press the return key...";
	}

};

CoinsCalculator.calcCoins = function() {

	// Get the value of the textbox
	var $amount = document.getElementById("amount");
	var $val = $amount.value;
	var $div = document.getElementById('result');

	var setFormState = function ($amount, $div, $state) {
		$state ? $amount.classList.remove('redfail') : $amount.classList.add('redfail');
		$div.innerHTML = "";
	};

	// Reset the form state.
	setFormState($amount, $div, true);

	// Return false on a blank value.
	if($val.length === 0)
		return false;

	// Expression to validate the value entered by the user
	var $reg = /^(\u00A3)?([0-9\.]+)p?$/;
	
	var $match = $val.match($reg);

	// If the regular expression returns true, the value entered is valid.
	if ($match) {

		if($val.indexOf("£") > -1 || $val.indexOf(".") > -1) {
			$val = $val.replace(/[^\d.-]/g, ''); 
			$val = parseFloat($val).toFixed(2);
			$val = ($val * 100).toFixed(0);
		} 
		else {
			$val = $val.replace(/[^\d.-]/g, '');
			$val = parseFloat($val).toFixed(2);
		}
		
		// Call function to SET the coin values.
		var $coinValues = CoinsCalculator.setCoinValues($val);

		// Output the values to the browser, GET.
		CoinsCalculator.getCoinValues($coinValues, $div);

	} else {
		setFormState($amount, $div, false);
	}

};

CoinsCalculator.setCoinValues = function($val) {

	var $coinValues = [];
	var $calc;

	// Loop through each element of the array, the coins. 	 	
	for (var $i = 0; $i < $coins.length; $i++) {

		$calc = Math.floor($val / $coins[$i]);
		// Add the remainder to the value.
		$val = $val % $coins[$i];
		$coinValues[$i] = $calc;

	}

	return $coinValues;

};

CoinsCalculator.getCoinValues = function($coinValues, $div) {

	// Loop through values and output to the browser.
	for(var $i = 0; $i < $coinValues.length; $i++) {

		$div.innerHTML = $div.innerHTML + "<div class='coin-area'><div class='coin-inner' id='coin-"+ $coins[$i] +"'></div>"+ 
					"<div class='coin-value'>" + $coinValues[$i] + "</div></div>";	

	}

};
