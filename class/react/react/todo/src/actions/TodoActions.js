import dispatcher from '../dispatcher';

export function createTodo(text) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    text
  });
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: 'DELETE_TODO',
    id
  });
}


export function reloadTodos() {
  dispatcher.dispatch({
    type: 'FETCH_TODOS'
  });
  var url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
  console.log('url is ', url);
  fetch(url, {
    method: 'GET'
  }).then((response) => { 
      // Convert to JSON
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      dispatcher.dispatch({
        type: 'RECEIVE_TODOS',
        payload: [
          {
            id: 11342254,
            text: 'Go Shopping again',
            complete: false
          },
          {
            id: 23342166,
            text: 'Hug Wife',
            complete: false
          }
        ]
      });
    }).catch((err) => {
      console.log('error is ', err);
        dispatcher.dispatch({
        type: 'FETCH_TODOS_ERROR'
      });
    });
}