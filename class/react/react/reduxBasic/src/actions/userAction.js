export const setName = (name) => {
  /*return (dispatch) => {
    const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
    console.log('url is ', url);

    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);

      dispatch({
        type: 'USER_SET_NAME',
        payload: j.data[0].name
      });

    }).catch((err) => {
      console.log('error is ', err);
    });
  }*/
  const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
  console.log('url is ', url);

  return {
    type: 'USER_SET_NAME',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);
        resolve(j.data[0].name);
      }).catch((err) => {
        console.log('error is ', err);
        reject(err);
      });
    })
  }
}

export const setAge = (age) => {
  return {
    type: 'USER_SET_AGE',
    payload: age
  }
}
