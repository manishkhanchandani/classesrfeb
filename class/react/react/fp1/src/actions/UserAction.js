import MyConstant from '../constants/MyConstant.js';

export const saveUser = (email, uid) => {
  return {
    type: MyConstant.SIGNED_IN,
    email: email,
    uid: uid
  };
};
