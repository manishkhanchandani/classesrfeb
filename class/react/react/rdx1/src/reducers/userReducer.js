const userReducer = (state = {name: 'Alan', age: 43, gender: 'male'}, action) => {
  switch (action.type) {
    case 'SET_NAME_FULFILLED':
      state = {
        ...state,
        name: action.payload
      };
      break;
    case 'SET_AGE':
      state = {
        ...state,
        age: action.payload
      };
      break;
    case 'SET_GENDER':
      state = {
        ...state,
        gender: action.payload
      };
      break;
    default:
      break;
  }
  return state;
}

export default userReducer;
