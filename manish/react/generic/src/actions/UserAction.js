import UserConstant from '../constants/UserConstant.js';

export const logUser = (email, uid) => {
  return {
    type: UserConstant.SIGNED_IN,
    email,
    uid
  }
}


export const logOut = () => {
  return {
    type: UserConstant.SIGNED_OUT
  }
}
