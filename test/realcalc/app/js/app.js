var myApp = angular.module('myApp', [])

.controller('CalculatorController', ['$scope', function($scope) {
  
  //initializing all variables
  $scope.inputValue = '';
  
  $scope.error = '';
  
  //check the input value if it is valid
  $scope.validateValue = function() {
    if (!$scope.inputValue) {
      $scope.error = 'empty number';
      return false;
    }
    
    var regExp = /^(\u00A3)?([0-9\.]+)p?$/;
    var check = $scope.inputValue.match(regExp);
    if (!check) {
      $scope.error = 'Invalid number';
      return false;
    }
    
    return true;
  };
  
  //parse each input value and convert it into proper format, if each contains £ or ., then replace any non digit, ., - to '', and return with 2 fixed decimal and multiplyed by 100 with fixed 0, else replace and return with 2 fixed.
  $scope.parseValue = function(returnValue)
  {
    if(returnValue.indexOf("£") > -1 || returnValue.indexOf(".") > -1) {
			returnValue = returnValue.replace(/[^\d.-]/g, ''); 
			returnValue = parseFloat(returnValue).toFixed(2);
			returnValue = (returnValue * 100).toFixed(0);
		} 
		else {
			returnValue = returnValue.replace(/[^\d.-]/g, '');
			returnValue = parseFloat(returnValue).toFixed(2);
		}
    
    return returnValue;
  }
  
  //find the coins
  
  //available coins
  $scope.availableCoins = [200, 100, 50, 20, 2, 1];
  //available coins with labels
  $scope.validValuesLabels = ['£2', '£1', '50p', '20p', '2p', '1p'];
  
  
  /*
  * parseCoins: take the penny and convert it to coins
  */
  $scope.parseCoins = function(returnValue) {
    var tmpStorageVariable;
    var result = [];
    for (var i = 0; i < $scope.availableCoins.length; i++) {
      //take the input value and divide by coin types starting from top to bottom
      tmpStorageVariable = Math.floor(returnValue / $scope.availableCoins[i]);
      //each time update the value of input value with the remaining penny from available coins
      returnValue = returnValue % $scope.availableCoins[i];
      //assign the calculated result to coin type
      result[i] = tmpStorageVariable;
    }
    
    //console.log('result: ', result);
    return result;
  };
  
  /*
  * submitForm: this function is called when user fills the form and submit it.
  */
  $scope.submitForm = function() {
    //console.log($scope.inputValue);
    $scope.error = '';
    $scope.result = null;
    var check = $scope.validateValue();
    if (!check) {
      return;
    }
    
    $scope.newValue = $scope.parseValue($scope.inputValue);
    //console.log('new value is ', $scope.newValue);
    
    $scope.result = $scope.parseCoins($scope.newValue);
    //console.log('res is ', $scope.result);
    
    $scope.inputValue = '';
  }
  
}]);