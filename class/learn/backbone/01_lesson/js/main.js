
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.
/*var Song = Backbone.Model.extend({
  initialize: function() {
    console.log('a new song');
  }
});

var song = new Song();


//attributes
var Song = Backbone.Model.extend();
var song = new Song();
song.set("title", "blue in green");
song.set({
  artist: "Miles Davis",
  publishYear: 1959
});



//attributes
var Song = Backbone.Model.extend({
  defaults: {
    genre: 'Jazz'
  }
});
var song = new Song({
  title: 'blue in green',
  artist: 'Miles Davis',
  publishYear: 1959
});


var Song = Backbone.Model.extend({
  validate: function(attrs) {
    if (!attrs.title) {
      return 'Title is required';
    }
  }
});

var song = new Song();
*/

var Animal = Backbone.Model.extend({
  walk: function() {
    console.log('Animal walking');
  }
});

var Dog = Animal.extend({
  walk: function() {
    Animal.prototype.walk.apply(this);
    console.log('Dog walking...');
  }
});

var dog = new Dog();

dog.walk();
