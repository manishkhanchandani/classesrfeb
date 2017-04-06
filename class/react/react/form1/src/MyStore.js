import {EventEmitter} from 'events';

import dispatcher from './dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    //define variables here
    this.form1 = {
      email: '',
      name: ''
    };
  }

  //getter & setter
  getForm1() {
    return this.form1;
  }

  setForm1(newObj) {
    console.log("newobj is ", newObj);
    this.form1 = newObj;
    this.emit('change');
  }

  handleActions(action) {
    console.log('store receive an action from dispatcher: ', action);

    switch (action.type) {
      case 'CHANGE_FORM1':
        this.setForm1(action.value);
        break;
      default:
        break;
    }
  }

}

const yStore = new MyStore();
dispatcher.register(yStore.handleActions.bind(yStore));

//only for development
//window.yStore = yStore;
//window.dispatcher = dispatcher;

export default yStore;
