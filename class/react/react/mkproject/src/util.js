
const saveUser = function (k, v) {
  localStorage.setItem(k, JSON.stringify(v));
}//end saveUser

const getUser = function(k) {
  //get the profile
  const data = localStorage.getItem(k);
  if (!data) return null;

  const obj = JSON.parse(data);
  return obj;
}//end saveUser

const samplePost = function() {
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


const samplePostJson = function() {
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


const sampleGet = function() {
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