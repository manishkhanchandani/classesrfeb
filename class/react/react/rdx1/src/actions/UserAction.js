
export const setName = (name) => {
  const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
  console.log('url is ', url);

  return {
    type: 'SET_NAME',
    payload: new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);
        resolve(j.data[1].name);
      }).catch((err) => {
        console.log('error is ', err);
        reject(err);
      })
    })
  }




  //to have some ajax
  /*return {
    type: 'SET_NAME',
    payload: name
  }*/
};

export const setAge = (age) => {
  return {
    type: 'SET_AGE',
    payload: age
  }
};

export const setGender = (gender) => {
  return {
    type: 'SET_GENDER',
    payload: gender
  }
};
