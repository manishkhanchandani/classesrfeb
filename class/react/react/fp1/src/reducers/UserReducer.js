import MyConstant from '../constants/MyConstant.js';

const UserReducer = (state = { email: null, uid: null }, action) => {
  switch (action.type) {
    case MyConstant.SIGNED_IN:
      state = {
        ...state,
        email: action.email,
        uid: action.uid
      };
      break;
    default:
      break;
  }

  return state;
};

export default UserReducer;
