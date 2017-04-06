import {EventEmitter} from 'events';

import dispatcher from './dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    //define variables here
    this.sampleVariable = 'xyz';
  }

  //getter & setter
  getSampleVariable() {
    return this.sampleVariable;
  }

  setSampleVariable(newValue) {
    this.sampleVariable = newValue;
    this.emit('change');
  }

  handleActions(action) {
    console.log('store receive an action from dispatcher: ', action);

    switch (action.type) {
      case 'CHANGE_SAMPLE_VARIABLE':
        this.setSampleVariable(action.value);
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
