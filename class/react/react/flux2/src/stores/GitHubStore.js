import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

import GitHubConstants from '../constants/GitHubConstants.js';

class GitHubStore extends EventEmitter {
  
  constructor() {
    super();
    
    this.username = 'manishkhanchandani';
    this.userData = null;
    this.userRepo = null;
  }
  
  getUsername() {
    return this.username;
  }
  
  getUserData() {
    return this.userData;
  }
  
  getUserRepo() {
    return this.userRepo;
  }
  
  changeUsername(newUserName) {
    console.log("new username is ", newUserName);
    this.username = newUserName;
    this.emit('change');
  }
  
  changeUserData(newUserData) {
    this.userData = newUserData;
    this.emit('change');
  }
  
  changeUserRepo(newUserRepo) {
    this.userRepo = newUserRepo;
    this.emit('change');
  }
  
  
  //compulsory function to handle action
  handleActions(action) {
    console.log('Store received an action', action);
    switch (action.type) {
      case GitHubConstants.CHANGE_USERNAME: 
        this.changeUsername(action.username);
        break;
      case GitHubConstants.CHANGE_USER_DATA:
        console.log('action data is ', action.userData);
        this.changeUserData(action.userData);
        break;
      case GitHubConstants.CHANGE_USER_REPO:
        console.log('action repo is ', action.userRepo);
        this.changeUserRepo(action.userRepo);
        break;
      default:
        break;
    }
  }
}


const yStore = new GitHubStore();
dispatcher.register(yStore.handleActions.bind(yStore));

export default yStore;