import UserConstant from '../constants/UserConstant.js';

const UserReducer = (state = {
  email: null,
  uid: null,
  displayName: null
}, action) => {

  switch(action.type) {
    case UserConstant.SIGNED_IN:
      state = {
        ...state,
        email: action.email,
        uid: action.uid,
        displayName: action.displayName
      }
      break;
        case UserConstant.SIGNED_OUT:
          state = {
            ...state,
            email: null,
            uid: null,
            displayName: null
          }
          break;
    default:
        break;
  }

  return state;
};

export default UserReducer;
