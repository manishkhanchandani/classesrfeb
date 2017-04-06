const MyReducer = (state = {loading: false, nearbyCities: null}, action) => {
  
  switch (action.type) {
    case 'SET_NEARBY_FULFILLED':
      state = {
        ...state,
        nearbyCities: action.payload,
        loading: false
      };
      break;
    case 'SET_LOADING':
      state = {
        ...state,
        loading: true,
        nearbyCities: null
      }
      break;
    default:
      break;
  }
  
  return state;
};

export default MyReducer;