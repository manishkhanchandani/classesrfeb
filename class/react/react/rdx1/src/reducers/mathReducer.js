const mathReducer = (state = {
  results: 1
}, action) => {

  switch (action.type) {
    case 'ADD':
      state = {
        ...state,
        results: state.results + action.payload
      };
      break;
    case 'SUBTRACT':
      state = {
        ...state,
        results: state.results - action.payload
      };
      break;
    default:
      break;
  }
  return state;
}

export default mathReducer;
