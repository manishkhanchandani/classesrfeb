import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    this.name = 'Carlos';
    this.age = 43;
    this.gender = 'Male';
  }

  //getter & setter
  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
    this.emit('change');
  }

  getAge() {
    return this.age;
  }

  setAge(newAge) {
    this.age = newAge
    this.emit('change');
  }

  getGender() {
    return this.gender;
  }

  setGender(newGender) {
    this.gender = newGender;
    this.emit('change');
  }

  handleActions(action) {
    console.log('store receive an action from dispatcher: ', action);
    //dispatcher.dispatch({type: 'CHANGE_NAME', name:'Mango'});
    switch (action.type) {
      case 'CHANGE_NAME':
        this.setName(action.name);
        break;
      case 'CHANGE_AGE':
        this.setAge(action.age);
        break;
      case 'CHANGE_GENDER':
        this.setGender(action.gender);
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
