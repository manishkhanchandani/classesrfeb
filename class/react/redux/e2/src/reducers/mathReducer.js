const mathReducer = (state = {
  result: 1,
  lastValues: []
}, action) => {
  //console.log('action: ', action);
  //console.log('state: ', state);
  switch (action.type) {
    case 'ADD':
      state = {
        ...state,//get all the properties of the object
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      return state;
    case 'SUBTRACT':
      state = {
        ...state,//get all the properties of the object
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      return state;
    default:
      break;
  }
  
  return state;
};

export default mathReducer;