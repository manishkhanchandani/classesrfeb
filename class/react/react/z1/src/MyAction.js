import dispatcher from './dispatcher.js';

class MyAction {

  changeValue(newValue) {
    console.log('new value is ', newValue);
    dispatcher.dispatch({
      type: 'CHANGE_SAMPLE_VARIABLE',
      value: newValue
    });
  }

  changeValueGet(newValue) {
    console.log('new value in get is ', newValue);
    const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555&value='+newValue;
    console.log('url is ', url);

    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_SAMPLE_VARIABLE',
        value: j.data[1].name
      });
    }).catch((err) => {
      console.log('error is ', err);
    });
  }

  changeValuePost(newValue) {
    console.log('new value in post is ', newValue);
    const url = 'http://api.mkgalaxy.com/api.php?action=samplePost';
    console.log('url is ', url);

    fetch(url, {
      method: 'POST',
      body: 'name=manny&age=43&gender=male&value='+newValue,
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j2 is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_SAMPLE_VARIABLE',
        value: j.postVars.value
      });
    }).catch((err) => {
      console.log('error is ', err);
    });
  }

  changeValuePostJson(newValue) {
    console.log('new value in post json is ', newValue);

    const url = 'http://api.mkgalaxy.com/api.php?action=samplePostJson';
    console.log('url is ', url);

    const obj = {
      name: 'manny',
      age: 43,
      gender: 'male',
      value: newValue
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(obj)
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j3 is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_SAMPLE_VARIABLE',
        value: j.postVars.value
      });
    }).catch((err) => {
      console.log('error is ', err);
    });
  }

  submitForm1(data) {
    const url = 'http://api.mkgalaxy.com/api.php?action=samplePostJson';
    console.log('url is ', url);

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(data)
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j3 is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_FORM_1',
        value: j.postVars
      });
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
}

const yAction = new MyAction();
export default yAction;
