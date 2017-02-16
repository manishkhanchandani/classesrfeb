//karma start karma.conf.js
describe('Testing Calculator Suite', function() {
  
  //calling my app module
  beforeEach(module('myApp'));
  
  describe('Testing Main Functionality', function() {
    
    var scope = {};
    var ctrl;
    
    //before each it call
    beforeEach(inject(function($controller) {
        ctrl = $controller('CalculatorController', {$scope:scope});
      }));
    
    //after each call
    afterEach(function() {
      //cleanup code will come here
      
    });
    
    //checking input value
    it('should have valid input value', function() {
      
      var retVal, check, result;
      
      //validate different cases
      scope.inputValue = '4';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('4.00');
      //check the array
      result = scope.parseCoins(retVal);
      expect(result[4]).toBe(2);
      
      scope.inputValue = '85';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('85.00');
      
      scope.inputValue = '197p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('197.00');
      
      scope.inputValue = '2p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('2.00');
      
      scope.inputValue = '1.87';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('187');
      
      scope.inputValue = '£1.23';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('123');
      
      scope.inputValue = '£2';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('200');
      
      scope.inputValue = '£10';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('1000');
      
      scope.inputValue = '£1.87p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('187');
      
      scope.inputValue = '£1p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('100');
      
      scope.inputValue = '£1.p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('100');
      
      scope.inputValue = '001.41p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('141');
      
      scope.inputValue = '4.235p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('424');
      
      scope.inputValue = '£1.257422457p';
      check = scope.validateValue();
      expect(check).toEqual(true);
      //check return value
      retVal = scope.parseValue(scope.inputValue);
      expect(retVal).toEqual('126');
      
      //failed cases
      scope.inputValue = '';
      check = scope.validateValue();
      expect(check).toEqual(false);
      
      scope.inputValue = '1x';
      check = scope.validateValue();
      expect(check).toEqual(false);
      
      scope.inputValue = '£1x.0p';
      check = scope.validateValue();
      expect(check).toEqual(false);
      
      scope.inputValue = '£p';
      check = scope.validateValue();
      expect(check).toEqual(false);
    });
    
  });
  
});