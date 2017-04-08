import MyConstant from '../constants/MyConstant.js';

const MyReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case MyConstant.SAMPLE:
      state = {
        ...state,
        data: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;
