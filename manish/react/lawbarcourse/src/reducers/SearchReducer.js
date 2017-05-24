import MyConstant from '../constants/MyConstant.js';

const initialState = MyConstant.getData('location');
const initialKeyword = MyConstant.getData('keyword');

const SearchReducer = (state = {
  location: initialState,
  keyword: initialKeyword
}, action) => {

  switch(action.type) {
    case MyConstant.LOCATION:
      state = {
        ...state,
        location: action.payload
      }
      break;
    case MyConstant.KEYWORD:
      state = {
        ...state,
        keyword: action.payload
      }
      break;
    default:
        break;
  }

  return state;
};

export default SearchReducer;
