import dispatcher from '../dispatcher.js';

class MyAction {

    changeName(newName) {
        dispatcher.dispatch({
            type: 'change_my_name',
            name: newName
        });
    }

    changeAge(newAge) {
        dispatcher.dispatch({
            type: 'change_my_age',
            name: newAge,
        });
    }

    changeAgeAndGender(newAge, newGender) {
        dispatcher.dispatch({
            type: 'change_my_age',
            name: newAge,
            gender: newGender
        });
    }

}

const yAction = new MyAction();
export default yAction;
