/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

import { createStore } from 'redux'; //call create store

//create new reducer, it takes two parameter state and action, action has key type, and other data, reducer returns the state
//here make sure that state is always immutable i.e. we take a copy of state and edit it and return a new state

//lets create a initial state as javascript object

const initialState = {
  result: 1,
  lastValues: []
};

//es6 addition of default param in methods, so first time when we set up the store, where don't have state, at that time we will get initial state and later when dispatch is called, we will pass the state in it.

const reducer1 = (state = initialState, action) => {
  //console.log('action: ', action);
  //console.log('state: ', state);
  switch (action.type) {
    case 'ADD':
      state = {
        ...state,//get all the properties of the object
        result: state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      return state;
    case 'SUBTRACT':
      state = {
        ...state,//get all the properties of the object
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      return state;
    default:
      break;
  }
  
  return state;
};

//since we pass the initial state as default state so taking out the 1 while creating the store
const store = createStore(reducer1); //takes two params, first parameter is reducer, reducer is part which takes action and changes your state, and another parameter is just a initial application state which may be array or a simple number

store.subscribe(() => {
  console.log('store update: ', store.getState());
});

//actions will remain same, we will not change the actions
store.dispatch({
  type: 'ADD', //sets the type action
  payload: 100//we need value or payload also
}); //dispatch new action

store.dispatch({
  type: 'ADD', //sets the type action
  payload: 22//we need value or payload also
}); //dispatch new action


store.dispatch({
  type: 'SUBTRACT', //sets the type action
  payload: 80//we need value or payload also
}); //dispatch new action

/*Note:
here we can change the reducer as
state.result += action.payload, here the problem is that we are changing the original object making it mutable which is not correct in redux.
*/