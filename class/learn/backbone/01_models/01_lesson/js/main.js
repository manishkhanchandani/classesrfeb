
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
*/


//attributes
var Song = Backbone.Model.extend();
var song = new Song({
  title: 'blue in green',
  artist: 'Miles Davis',
  publishYear: 1959
});
