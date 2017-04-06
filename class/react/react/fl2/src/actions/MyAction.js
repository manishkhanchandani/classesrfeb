import dispatcher from '../dispatcher.js';

class MyAction {

  changeName(newName) {
    dispatcher.dispatch({
      type: 'change_my_name',
      name: newName
    });
  }

  changeAgeAndGender(newAge, newGender) {
    dispatcher.dispatch({
      type: 'change_my_age',
      age: newAge,
      gender: newGender
    });
  }
}

const yAction = new MyAction();
export default yAction;
