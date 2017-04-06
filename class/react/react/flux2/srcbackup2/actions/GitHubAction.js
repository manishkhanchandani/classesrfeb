import dispatcher from '../dispatcher';

export function changeUsernameAction(username) {
  dispatcher.dispatch({
    type: 'CHANGE_USERNAME',
    username: username
  });
}


export function changeUserDataAction(userData) {
  dispatcher.dispatch({
    type: 'CHANGE_USERDATA',
    userData: userData
  });
}
