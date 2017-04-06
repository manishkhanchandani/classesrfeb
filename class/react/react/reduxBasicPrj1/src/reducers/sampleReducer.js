const sampleReducer = (state = {
  data: null,
  loading: false
}, action) => {

  switch(action.type) {
    case 'SAMPLE_CALL_FULFILLED':
      state = {
        ...state,
        data: action.payload,
        loading: false
      }
      break;
   case 'SAMPLE_CALL_LOADING':
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

export default sampleReducer;
