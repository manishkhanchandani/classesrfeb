
export const getNearbyLocations = (lat, lng) => {
  const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat='+lat+'&lng='+lng;
  console.log('url is ', url);
  return {
    type: 'SET_NEARBY',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);
        resolve(j.data);
      }).catch((err) => {
        console.log('error is ', err);
        reject(err);
      });
    })
  }
};

export const showLoadingIcon = () => {
  return {
    type: 'SET_LOADING'
  }
};