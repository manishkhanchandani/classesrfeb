const userReducer = (state = {
  name: 'Manny',
  age: 43
}, action) => {

  switch(action.type) {
    case 'USER_SET_NAME_FULFILLED':
      state = {
        ...state,
        name: action.payload
      }
      break;
    case 'USER_SET_AGE':
      state = {
        ...state,
        age: action.payload
      }
      break;
    default:
      break;
  }

  return state;
};

export default userReducer;
