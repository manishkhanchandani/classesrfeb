import ReminderConstant from '../constants/ReminderConstant.js';

export const addReminder = (text) => {
  return {
    type: ReminderConstant.ADD_REMINDER,
    payload: text
  }
}
