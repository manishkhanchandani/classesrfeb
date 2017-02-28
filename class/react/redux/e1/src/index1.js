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
const reducer1 = (state, action) => {
  console.log('state: ', state);
  console.log('action: ', action);
  switch (action.type) {
    case 'ADD':
      state += action.payload;
      console.log('new state is ', state);
      return state;
    case 'SUBTRACT':
      state -= action.payload;
      console.log('new state is ', state);
      return state;
    default:
      break;
  }
  
  return state;
};

const store = createStore(reducer1, 1); //takes two params, first parameter is reducer, reducer is part which takes action and changes your state, and another parameter is just a initial application state which may be array or a simple number

store.subscribe(() => {
  console.log('store update: ', store.getState());
});

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
  payload: 10//we need value or payload also
}); //dispatch new action