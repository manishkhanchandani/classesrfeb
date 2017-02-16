
describe('Testing AngularJS Test Suite', function() {
  
  beforeEach(module('myApp'));//before each test

  describe('Testing AngularJS Controller', function() {
    
      var scope = {};
      var ctrl;
    
    beforeEach(inject(function($controller) {
        ctrl = $controller('CalculatorController', {$scope:scope});
      }));
    
    afterEach(function() {
      //cleanup code
      
    });
    
    it('should initialize the title in the scope', function() {
      expect(scope.title).toBeDefined();
      expect(scope.title).toBe('testing');
    });
    
    it('should add 2 destinations to the destinations list', function() {
      expect(scope.destinations).toBeDefined();
      expect(scope.destinations.length).toBe(0);
      
      scope.newDestination = {
        city: "London",
        country: "England",
      };
      
      scope.addDestination();
      
      expect(scope.destinations.length).toBe(1);
      expect(scope.destinations[0].city).toBe('London');
      expect(scope.destinations[0].country).toBe('England');
      
      scope.newDestination.city = 'Frankfurt';
      scope.newDestination.country = 'Germany';
      
      scope.addDestination();
      
      expect(scope.destinations.length).toBe(2);
      expect(scope.destinations[1].city).toBe('Frankfurt');
      expect(scope.destinations[1].country).toBe('Germany');
    });
    
    
    it('should remove a destination from the destinations list', function() {
      scope.destinations = [
        {
          city: 'Paris',
          country: 'France'
        }, 
        {
          city: 'Dublin',
          country: 'US'
        }
      ];
      
      expect(scope.destinations.length).toBe(2);
      
      scope.removeDestination(1);
      
      expect(scope.destinations.length).toBe(1);
      expect(scope.destinations[0].city).toBe('Paris');
      expect(scope.destinations[0].country).toBe('France');
    });
    
  });
});