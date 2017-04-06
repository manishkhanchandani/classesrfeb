const mathReducer = (state = {
  result: 1,
  lastValue: []
}, action) => {

  switch(action.type) {
    case 'MATH_ADD':
      state = {
        ...state,
        result: state.result + action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    case 'MATH_SUBTRACT':
      state = {
        ...state,
        result: state.result - action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    default:
      break;
  }

  return state;
};

export default mathReducer;
