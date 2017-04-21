import UserConstant from '../constants/UserConstant.js';

export const logUser = (email, uid, displayName) => {
  return {
    type: UserConstant.SIGNED_IN,
    email,
    uid,
    displayName
  }
}


export const logOut = () => {
  return {
    type: UserConstant.SIGNED_OUT
  }
}
