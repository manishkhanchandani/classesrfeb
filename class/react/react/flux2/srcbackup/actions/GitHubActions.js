import dispatcher from '../dispatcher';

import AppConstants from '../Constants.js';


export function changeUsernameAction(username) {
  dispatcher.dispatch({
    type: 'CHANGE_USERNAME',
    username: username
  });
}

export function changeUserDataAction(username) {
  dispatcher.dispatch({
    type: 'FETCH_USERDATA'
  });
  const url = 'https://api.github.com/users/' + username + '?client_id=' + AppConstants.clientId + '&client_secret=' + AppConstants.clientSecret;
  console.log('url is ', url);
  fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      dispatcher.dispatch({
        type: 'CHANGE_USER_DATA',
        userData: j
      });
    }).catch((err) => {
      console.log('error is ', err);
      dispatcher.dispatch({
        type: 'FETCH_TODOS_ERROR'
      });
    });
  
}