/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

import {createStore} from 'redux';

//lets make a new initial state
const initialState = {
  result: 1,
  lastValue: []
}

//lets pass state as default inital state
const reducerA = (state = initialState, action) => {
  console.log('reducer: state is ', state);
  console.log('reducer: action is ', action);

  switch(action.type) {
    case 'ADD':
      //state.result += action.payload;//this is something we are changing the value of old state, which is not right, so we don't have immutable state here and we cannot go back to old state if we do this. we cannot tell the current state of application is. so we need to create a new javascript object and in this new object, we need to put all the properties of the state, so better way is as follows:
      state = {
        ...state, //we take all the properties of state and update with new values only.
        result: state.result + action.payload,
        lastValue: [...state.lastValue, action.payload] // we use previous value of last value and adds new value in the array
      }
      break;
    case 'SUBTRACT':
      //state.result -= action.payload;
      state = {
        ...state, //we take all the properties of state and update with new values only.
        result: state.result - action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    default:
      break;
  }

  return state; //this will be new state which our application uses
};//pass above reducer to createStore function

//since we are setting initial state as default in reducer, so no need to pass second parameter here
const store = createStore(reducerA);

//subscribe to store, it is a call back whenever the store is updated
store.subscribe(() => {
  console.log('store updated: ', store.getState());
});

//this dispatch is given by redux, and it takes an object
store.dispatch({
  type: 'ADD',
  payload: 100
});
store.dispatch({
  type: 'ADD',
  payload: 22
});
store.dispatch({
  type: 'SUBTRACT',
  payload: 80
});
