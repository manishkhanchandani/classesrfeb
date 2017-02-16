'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).when('/view2', {
    templateUrl: 'view1/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

  $scope.validValues = [200, 100, 50, 20, 2, 1];//valid values of coins
  $scope.validValuesLabels = ['£2', '£1', '50p', '20p', '2p', '1p'];//valid values of coins
  
  function getResult(inputParam, validValues)
  {
    var x, y, z;
    var res;
    var newParam = inputParam;
    var result = [];
    for (var i = 0; i < validValues.length; i++) {
      res = Math.floor(newParam / validValues[i]);
      newParam = newParam % validValues[i];
      result[i] = res;
    }
    console.log('final result is ', result);
    return result;
  }//end getResult
  
  
  $scope.process = function() {
    console.log($scope.inputVal);
    
    //check if the value is inserted
    if (!$scope.inputVal) {
      $scope.error = 'Please fill the input field.';
      return;
    }//end if
    
    //validating if we have Pound - Number - p
    var regexp = /^(\u00A3)?([0-9\.]+)p?$/;
    var check = $scope.inputVal.match(regexp);
    if (!check) {
      $scope.error = 'Invalid input field. Valid format are £Number, or £Numberp or Number or Numberp';
      return;
    }
    
    var inputValue = $scope.inputVal;
    
    //manipulating the input value and cleaning it
    
    //take the value
    inputValue = parseFloat(inputValue).toFixed(2);
    //multiply the input value to 100 to get penny
    inputValue = (inputValue * 100).toFixed(0);
    
    $scope.inputValModified = inputValue;
    console.log(inputValue);
    
    $scope.result = getResult(inputValue, $scope.validValues);
  }
}])
.controller('View2Ctrl', ['$scope', function($scope) {

}]);