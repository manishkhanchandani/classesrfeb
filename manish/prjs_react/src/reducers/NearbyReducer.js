const NearbyReducer = (state = {
  data: null,
  loading: false
}, action) => {

  switch(action.type) {
    case 'NEARBY_CALL_FULFILLED':
      state = {
        ...state,
        data: action.payload,
        loading: false
      }
      break;
   case 'NEARBY_CALL_LOADING':
   console.log('here', action);
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

export default NearbyReducer;
