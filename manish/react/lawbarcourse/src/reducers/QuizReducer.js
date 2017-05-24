import QuizConstant from '../constants/QuizConstant.js';

const QuizReducer = (state = {
  setCurrent: 0,
  setScore: 0
}, action) => {
  switch(action.type) {
    case QuizConstant.SAVESELECTION:
      state = {
        ...state,
        setCurrent: action.setCurrent,
        setScore: action.setScore
      }
      break;
    case QuizConstant.RESETSELECTION:
      state = {
        ...state,
        setCurrent: 0,
        setScore: 0
      }
      break;
    default:
        break;
  }

  return state;
};

export default QuizReducer;
