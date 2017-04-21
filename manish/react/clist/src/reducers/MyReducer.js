const MyReducer = (state = {
  data: null,
  ipDetails: null
}, action) => {

  switch(action.type) {
    case 'SAMPLE':
      state = {
        ...state,
        data: action.payload
      };
      break;
    case 'SET_IP_DETAILS':
    case 'SET_IP_DETAILS_FULFILLED':
      state = {
        ...state,
        ipDetails: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;