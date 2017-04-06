import dispatcher from '../dispatcher.js';

class MyAction {
  changeName(newName) {
    console.log('new name has been called in MyAction: ', newName);
    dispatcher.dispatch({
      type: 'CHANGE_NAME',
      name: newName
    });
  }

  changeAge(newAge) {
    dispatcher.dispatch({
      type: 'CHANGE_AGE',
      age: newAge
    });
  }

  changeGender(newGender) {
    dispatcher.dispatch({
      type: 'CHANGE_GENDER',
      gender: newGender
    });
  }
}

const yAction = new MyAction();
export default yAction;
