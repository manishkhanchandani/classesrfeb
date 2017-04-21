import MyConstant from '../constants/MyConstant.js';

export const sample = () => {
  return {
    type: MyConstant.SAMPLE,
    payload: 10
  };
};
