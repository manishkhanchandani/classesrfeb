import {EventEmitter} from 'events';
import dispatcher from './dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    this.form1 = {
      email: '',
      name: ''
    };
  }

  getForm1() {
    return this.form1;
  }

  setForm1(newValue) {
    this.form1 = newValue;
    this.emit('change');
  }

  handleActions(payload) {
    console.log('payload is ', payload);

    switch(payload.type) {
      case 'CHANGE_FORM_1':
        this.setForm1(payload.value);
        break;
      default:
        break;
    }
  }
}

const yStore = new MyStore();
dispatcher.register(yStore.handleActions.bind(yStore));

export default yStore;
