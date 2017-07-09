
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.
/*
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
  model: Song
});

var songs = new Songs([
  new Song({title: 'Song 1'}),
  new Song({title: 'Song 2'}),
  new Song({title: 'Song 3'}),
]);

songs.add(new Song({title: 'Song 4'}));*/

var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
  model: Song
});

var songs = new Songs();

songs.add(new Song({title: 'Song 1', genre: 'Jazz', downloads: 110}), {at: 0});
songs.push(new Song({title: 'Song 2', genre: 'Jazz', downloads: 90}));

var jazzSongs = songs.where({genre: 'Jazz'});

var firstJazzSong = songs.findWhere({genre: 'Jazz'});

console.log('jazz songs', jazzSongs);

console.log('first jazz song', firstJazzSong);


var filteredSongs = songs.where({genre: 'Jazz', title: 'Song 2'});
console.log('filteredSongs: ', filteredSongs);

var topDownloads = songs.filter(function(song) {
  return song.get('downloads') > 100;
});

console.log('topDownloads: ', topDownloads);

songs.each(function(song) {
  console.log('each song: ', song);
});
