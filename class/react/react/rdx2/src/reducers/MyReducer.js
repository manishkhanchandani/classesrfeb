const MyReducer = (state = {loading: false, data: null}, action) => {
  switch (action.type) {
    case 'CALL_NEARBY':
      state = {
        ...state,
        data: action.payload,
        loading: false
      }
      break;
    case 'CALL_LOADING':
      state = {
        ...state,
        data: null,
        loading: action.payload
      }
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;
