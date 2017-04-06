import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';
import GitHubConstants from '../constants/GitHubConstants.js';

class GitHubStore extends EventEmitter {

  constructor() {
    super();

    this.username = 'manishkhanchandani';
    this.userData = null;
    this.userRepos = null;
  }

  getUsername() {
    return this.username;
  }

  setUsername(newValue) {
    this.username = newValue;
    this.emit('change');
  }


  getUserData() {
    return this.userData;
  }

  setUserData(newValue) {
    this.userData = newValue;
    this.emit('change');
  }

  getUserRepos() {
    return this.userRepos;
  }

  setUserRepos(newValue) {
    this.userRepos = newValue;
    this.emit('change');
  }

  handleActions(payload) {
    console.log('payload is ', payload);

    switch(payload.type) {
      case GitHubConstants.CHANGE_USER_NAME:
        this.setUsername(payload.username);
        break;
      case GitHubConstants.CHANGE_USER_DATA:
        this.setUserData(payload.userData);
        break;
      case GitHubConstants.CHANGE_USER_REPO:
        this.setUserRepos(payload.userRepo);
        break;
      default:
        break;
    }
  }
}

const yStore = new GitHubStore();
dispatcher.register(yStore.handleActions.bind(yStore));

export default yStore;
