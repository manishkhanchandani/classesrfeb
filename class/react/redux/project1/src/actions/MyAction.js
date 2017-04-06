import MyConstant from '../constants/MyConstant.js';

export const addReminder = (text) => {
  const action = {
    type: MyConstant.ADD_REMINDER,
    text: text
  }

  console.log('action in addReminder: ', action);
  return action;
};
