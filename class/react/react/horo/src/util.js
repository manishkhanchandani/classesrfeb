
var saveUser = function (profile) {
  //get the profile
  var profiles = localStorage.getItem('profiles');
  var key = btoa(profile.name);
  var obj = {};
  if (!profiles) {
    obj[key] = profile;
    localStorage.setItem('profiles', JSON.stringify(obj));
  } else {
    obj = JSON.parse(profiles);
    if (obj[key]) {
      console.log('user already existed');
      return;
    } else {
      obj[key] = profile;
      localStorage.setItem('profiles', JSON.stringify(obj));
    }
  }

  return obj;
}//end saveUser

var getUser = function () {
  //get the profile
  var profiles = localStorage.getItem('profiles');
  var obj = JSON.parse(profiles);
  console.log('obj get is ', obj);

  return obj;
}//end saveUser

var samplePost = function() {
  var url = 'http://api.mkgalaxy.com/api.php?action=samplePost';
  console.log('url is ', url);
  fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    body: 'x=y&var2=2',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }).then((response) => { 
      // Convert to JSON
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
    }).catch((err) => {
      console.log('error is ', err);
    });
}


var samplePostJson = function() {
  var url = 'http://api.mkgalaxy.com/api.php?action=samplePostJson';
  console.log('url is ', url);
  var obj = {x: 'value1', y: 'value2'};
  fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    body: JSON.stringify(obj)
  }).then((response) => { 
      // Convert to JSON
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
    }).catch((err) => {
      console.log('error is ', err);
    });
}


var sampleGet = function() {
  var url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
  console.log('url is ', url);
  fetch(url, {
    method: 'GET'
  }).then((response) => { 
      // Convert to JSON
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
    }).catch((err) => {
      console.log('error is ', err);
    });
}



exports.saveUser = saveUser;
exports.getUser = getUser;
exports.samplePost = samplePost;
exports.samplePostJson = samplePostJson;
exports.sampleGet = sampleGet;