const sampleReducer = (state = {
  number: 0
}, action) => {

  switch(action.type) {
    case 'INCREMENT':
      state = {
        ...state,
        number: state.number + action.payload
      }
      break;
    case 'DECREMENT':
      state = {
        ...state,
        number: state.number - action.payload
      }
      break;
    default:
        break;
  }

  return state;
};

export default sampleReducer;
