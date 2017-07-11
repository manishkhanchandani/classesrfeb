define(['underscore', 'backbone', 'models/song', 'views/songView'], function(_, Backbone, Song, SongView) {
	
	var initialize = function() {
		var song = new Song({title: 'Blue in Green'});

		var songView = new SongView({el: '#container', model: song});
		songView.render();
				var songView = new SongView({el: '#container', model: song});
		console.log(songView);
	}
	
	return {
		initialize: initialize
	};
});
