import GitHubConstants from '../constants/GitHubConstants.js';
import dispatcher from '../dispatcher';

class GitHubApi {
  getUserData(username) {
    console.log('username is ', username);
    const url = 'https://api.github.com/users/' + username + '?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret;
      console.log(url);
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
  
  getUserRepo(username) {
    console.log('username is ', username);
    const url = 'https://api.github.com/users/' + username + '/repos?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret + '&sort=created';
      console.log(url);
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
const gApi = new GitHubApi();

export default gApi;
