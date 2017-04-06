/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/


//create the store
import {createStore} from 'redux';

//let's create a function which is called reducer

const reducerA = (state, action) => {
  //we will manipulate this state

  switch(action.type) {
    case 'ADD':
      state = state + action.payload;
      break;
    case 'SUBTRACT':
      state = state - action.payload;
      break;
    default:
      break;
  }

  //do manipulation
  return state;
}

const store = createStore(reducerA, 1);
//two parameter
//second parameter is initial state

//development purpose
store.subscribe(() => {
  console.log('new state is ', store.getState());
});


//initial state can be an integer, array or object, or string, or anything

store.dispatch({
  type: 'ADD',
  payload: 10
});


store.dispatch({
  type: 'ADD',
  payload: 45
});


store.dispatch({
  type: 'ADD',
  payload: 34
});


store.dispatch({
  type: 'SUBTRACT',
  payload: 5
});
