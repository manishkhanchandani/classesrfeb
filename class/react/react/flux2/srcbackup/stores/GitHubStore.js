import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

class GitHubStore extends EventEmitter {
  constructor() {
    super();
    
    this.username = 'manishkhanchandani';
    this.userData = [];
    this.userRepos = [];
  }
  
  getUsername() {
    return this.username;
  }
  
  getUserData() {
    return this.userData;
  }
  
  getUserRepos() {
    return this.userRepos;
  }
  
  changeUsername(username) {
    this.username = username;
    this.emit('change');
  }
  
  changeUserData(userData) {
    this.userData = userData;
    this.emit('change');
  }
  
  changeUserRepos(userRepos) {
    this.userRepos = userRepos;
    this.emit('change');
  }
  
  handleActions(action) {
    console.log('Store received an action', action);
    switch (action.type) {
      case 'CHANGE_USERNAME': 
        this.changeUsername(action.username);
        break;
      case 'CHANGE_USER_DATA': 
        this.changeUserData(action.userData);
        break;
      case 'CHANGE_USER_REPOS': 
        this.changeUserRepos(action.userRepos);
        break;
      default:
        break;
    }
  }
  
}


const gStore = new GitHubStore();
dispatcher.register(gStore.handleActions.bind(gStore));

export default gStore;