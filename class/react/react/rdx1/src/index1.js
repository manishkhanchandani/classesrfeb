/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

import {createStore, combineReducers} from 'redux';

const mathReducer = (state = {
  result: 1,
  lastValue: []
}, action) => {
  switch (action.type) {
    case 'MATH_ADD':
      state = {
        ...state,
        result: state.result + action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    case 'MATH_SUBTRACT':
      state = {
        ...state,
        result: state.result - action.payload,
        lastValue: [...state.lastValue, action.payload]
      };
      break;
    default:
      break;
  }

  return state;
}

const userReducer = (state = {name: 'Manny', age: 43}, action) => {
  switch (action.type) {
    case 'USER_SET_NAME':
      state = {
        ...state,
        name: action.payload
      }
      break;
    case 'USER_SET_AGE':
      state = {
        ...state,
        age: action.payload
      }
      break;
    default:
      break;
  }

  return state;
}

const store = createStore(combineReducers({mathReducer, userReducer}));

//developement
store.subscribe(() => {
  console.log('store updated with ', store.getState());
});

store.dispatch({
  type: 'ADD',
  payload: 10
});


store.dispatch({
  type: 'ADD',
  payload: 9
});


store.dispatch({
  type: 'SUBTRACT',
  payload: 15
});


//A. function which has the responsibility to change the state
// passing state x
// passing state y

// what is the purpose of reducer function, to change the state
