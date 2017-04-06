import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

class MyStore extends EventEmitter {

  constructor() {
    super();

    this.name = 'Manny';
    this.age = 43;
    this.gender = 'Male';
    this.city = 'San Jose';
    this.state = 'CA';
    this.country = 'US';
    this.hobbies = ['Chess', 'Table Tennis', 'Cricket', 'Judo', 'Akido', 'Movies', 'Dinning'];
  }

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
    this.age = newAge;
    this.emit('change');
  }
  getGender() {
    return this.gender;
  }
  setGender(newGender) {
    this.gender = newGender;
    this.emit('change');
  }
  getCity() {
    return this.city;
  }
  setCity(newCity) {
    this.city = newCity;
    this.emit('change');
  }
  getState() {
    return this.state;
  }
  setState(newState) {
    this.state = newState;
    this.emit('change');
  }
  getCountry() {
    return this.country;
  }
  setCountry(newCountry) {
    this.country = newCountry;
    this.emit('change1');
  }
  getHobbies() {
    return this.hobbies;
  }
  setHobbies(newHobbies) {
    this.hobbies = newHobbies;
    this.emit('change');
  }

  getAll() {
    let obj = {name: this.getName(), age: this.getAge(), gender :this.getGender(), city: this.getCity(), state: this.getState(), country: this.getCountry(), hobbies: this.getHobbies()};

    return obj;
  }

  handleAction(payload) {//type: change_name or change_age, name, or age or anything
    console.log('action has arrived through dispatcher with payload of ', payload);

    switch (payload.type) {
      case 'change_my_name':
        this.setName(payload.name);
        break;
      case 'change_my_age':
        this.setAge(payload.age);
        this.setGender(payload.gender);
        break;
      default:
        break;
    }
  }
}

const yStore = new MyStore();
dispatcher.register(yStore.handleAction.bind(yStore));

export default yStore;
