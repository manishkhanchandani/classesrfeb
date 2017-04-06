import ReminderConstant from '../constants/ReminderConstant.js';

const ReminderReducer = (state = [], action) => {

  switch (action.type) {
    case ReminderConstant.ADD_REMINDER:
      //do something
      state = [
        ...state,
        {
          text: action.payload,
          id: Math.random()
        }
      ]
      break;
    default:
      break;
  }
  return state;
}

export default ReminderReducer;
