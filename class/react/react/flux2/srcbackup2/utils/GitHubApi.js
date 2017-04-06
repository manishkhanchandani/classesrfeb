imort GitHubConstants from '../constants/GitHubContants.js';
imort * as GitHubAction from '../actions/GitHubAction.js';

export function getUserData(username) {
  const url = 'https://api.github.com/users/' + username + '?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret;

  fetch(url, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then((j) => {
    //console.log('j is ', j);//this is important

    GitHubAction.changeUserDataAction(j);

  }).catch((err) => {
    console.log('error is ', err);
  });
}

export function getUserRepos(username) {
  const url = 'https://api.github.com/users/' + username + '/repos?client_id=' + GitHubConstants.clientId + '&client_secret=' + GitHubConstants.clientSecret + '&sort=created';
  fetch(url, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then((j) => {
    //console.log('j repos is ', j);
    this.setState({userRepos: j});
  }).catch((err) => {
    console.log('error is ', err);
  });
}