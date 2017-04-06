import dispatcher from '../dispatcher.js';

import GitHubConstants from '../constants/GitHubConstants.js';

class GitHubActions {
  changeUsernameAction(username) {
    dispatcher.dispatch({
      type: GitHubConstants.CHANGE_USER_NAME,
      username: username
    });
  }

  changeUserDataAction(username) {
    const url = 'https://api.github.com/users/' + username + '?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret;
    fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);//this is important

        dispatcher.dispatch({
          type: GitHubConstants.CHANGE_USER_DATA,
          userData: j
        });
      }).catch((err) => {
        console.log('error is ', err);
      });
  }

  changeUserReposAction(username) {
    const url = 'https://api.github.com/users/' + username + '/repos?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret + '&sort=created';

    fetch(url, {
        method: 'GET'
      }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j is ', j);//this is important

        dispatcher.dispatch({
          type: GitHubConstants.CHANGE_USER_REPO,
          userRepo: j
        });
      }).catch((err) => {
        console.log('error is ', err);
      });
  }
}
const yAction = new GitHubActions();
export default yAction;
