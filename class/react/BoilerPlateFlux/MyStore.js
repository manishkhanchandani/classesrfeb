import {EventEmitter} from 'events';
import dispatcher from './dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    this.sampleVariable = 'xyz';
  }

  getSampleVariable() {
    return this.sampleVariable;
  }

  setSampleVariable(newValue) {
    this.sampleVariable = newValue;
    this.emit('change');
  }

  handleActions(payload) {
    console.log('payload is ', payload);

    switch(payload.type) {
      case 'CHANGE_SAMPLE_VARIABLE':
        this.setSampleVariable(payload.value);
        break;
      default:
        break;
    }
  }
}

const yStore = new MyStore();
dispatcher.register(yStore.handleActions.bind(yStore));

export default yStore;
