const userReducer = (state = {
  name: 'Nandi',
  age: 43
}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      state = {
        ...state,//get all the properties of the object
        name: action.payload
      };
      return state;
    case 'SET_AGE':
      state = {
        ...state,//get all the properties of the object
        age: action.payload
      };
      return state;
    default:
      break;
  }
  
  return state;
};

export default userReducer;