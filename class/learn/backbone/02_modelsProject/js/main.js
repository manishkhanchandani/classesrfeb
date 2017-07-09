
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({

  idAttribute: 'registrationNumber',

  urlRoot: '/api/vehicles',

  validate: function(attrs) {
    if (!attrs.registrationNumber) {
      return 'registrationNumber is required';
    }
  },
  start: function() {
    console.log('Vehicle Started');
  }
});

var Car = Vehicle.extend({
  start: function() {
    console.log('Car with registration number is ' + this.get('registrationNumber') + ' started ');
  }
});

var car = new Car({
  registrationNumber: 'XLI887',
  color: 'Blue'
});

console.log('car 1 ', car);

car.unset('registrationNumber');

console.log('car 2 ', car);

if (!car.isValid()) {
  console.log(car.validationError);
}

car.set('registrationNumber', 'XLI887');

if (!car.isValid()) {
  console.log(car.validationError);
}

car.start();
