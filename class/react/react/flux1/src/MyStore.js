import {EventEmitter} from 'events';

import dispatcher from './dispatcher.js';

class MyStore extends EventEmitter {
  constructor() {
    super();
    
    this.name = '';
  }
  
  
  getName() {
    return this.name;
  }
  
  changeName(newName) {
    this.name = newName;
    this.emit('change');
  }
  
  handleActions(action) {
    console.log('Store received an action', action);
    switch (action.type) {
      case 'CHANGE_NAME': 
        this.changeName(action.name);
        break;
      default:
        break;
    }
  }
}

const yStore = new MyStore();
dispatcher.register(yStore.handleActions.bind(yStore));

window.yStore = yStore;
window.dispatcher = dispatcher;

//go to console yStore.changeName('myname');
//go to console dispatcher.dispatch({type: 'changeNameAction'})
//go to console dispatcher.dispatch({type: 'CHANGE_NAME', name: 'manny'});

export default yStore;