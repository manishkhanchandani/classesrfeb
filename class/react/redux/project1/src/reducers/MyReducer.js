import MyConstant from '../constants/MyConstant.js';

const reminder = (action) => {
  return {
    text: action.text,
    id: Math.random()
  }
}
const reminders = (state=[], action) => {
  let reminders = null;
  switch (action.type) {
    case MyConstant.ADD_REMINDER:
      reminders = [...state, reminder(action)];
      console.log('reminders as state: ', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;
