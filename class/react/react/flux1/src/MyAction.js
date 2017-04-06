import dispatcher from './dispatcher';

export function changeNameAction(name) {
  dispatcher.dispatch({
    type: 'CHANGE_NAME',
    name: name
  });
}

export function changeNameActionAjax(name) {
  dispatcher.dispatch({
    type: 'FETCH_TODOS'
  });
  var url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
  console.log('url is ', url);
  fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_NAME',
        name: name
      });
    }).catch((err) => {
      console.log('error is ', err);
      dispatcher.dispatch({
        type: 'FETCH_TODOS_ERROR'
      });
    });
  
}