
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var person = {
  name: 'manny',
  walk: function() {
    this.trigger('walking', {
      speed: 1,
      startTime: '08:00:00'
    });
  }
}

_.extend(person, Backbone.Events);

person.once('walking', function(e) {
  console.log('person is walking');
  console.log('e: ', e);
});

//person.off('walking');
person.walk();
person.walk();
