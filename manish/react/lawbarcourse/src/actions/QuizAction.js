import QuizConstant from '../constants/QuizConstant.js';


export const QuestionAction = (setCurrent, setScore) => {
  return {
    type: QuizConstant.SAVESELECTION,
    setCurrent,
    setScore
  }
}

export const ResetAction = () => {
  return {
    type: QuizConstant.RESETSELECTION
  }
}
