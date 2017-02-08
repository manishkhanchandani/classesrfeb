//https://github.com/github/fetch

module.exports = {
  get: function(url, callback) {
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  },//end get
  post: function(url, data, callback) {
    console.log('under construction, to be completed');
    console.log('url is ', url);
    console.log('data is ', data);
    console.log('callback is ', callback);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      callback(json);
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });
  }//end post
}