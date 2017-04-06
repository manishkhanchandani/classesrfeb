import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

class GitHubStore extends EventEmitter {
  constructor() {
    super();
    
    this.username = 'manishkhanchandani';
  }
  
  getUsername() {
    return this.username;
  }
  
  changeUsername(username) {
    this.username = username;
    this.emit('change');
  }
  
  changeUserData(userData) {
    this.userData = userData;
    this.emit('change');
  }
  
  
  handleActions(action) {
    console.log('Store received an action', action);
    switch (action.type) {
      case 'CHANGE_USERNAME': 
        this.changeUsername(action.username);
        break;
      case 'CHANGE_USERDATA': 
        this.changeUserData(action.userData);
        break;
      default:
        break;
    }
  }
}


const yStore = new GitHubStore();
dispatcher.register(yStore.handleActions.bind(yStore));

export default yStore;