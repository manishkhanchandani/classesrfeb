import dispatcher from '../dispatcher';
import GitHubConstants from '../constants/GitHubConstants.js';
import GitHubApi from '../utils/GitHubApi.js';

class GitHubAction {
  changeUsernameAction(username) {
    dispatcher.dispatch({
      type: GitHubConstants.CHANGE_USERNAME,
      username: username
    });
  }
  
  getUserDataAction(username) {
    GitHubApi.getUserData(username);
  }
  
  getUserRepoAction(username) {
    GitHubApi.getUserRepo(username);
  }
}

const yAction = new GitHubAction();
export default yAction;
