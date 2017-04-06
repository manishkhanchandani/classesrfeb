import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);

/*
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';

const mathReducer = (state = {result: 1}, action) => {
  switch (action.type) {
    case 'ADD':
      state = {
        ...state,
        result: state.result + action.payload
      };
      break;
    case 'SUBTRACT':
      state = {
        ...state,
        result: state.result - action.payload
      };
      break;
    default:
      break;
  }
  return state;
}

const userReducer = (state = {name: 'manny', age: 43}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      state = {
        ...state,
        name: action.payload
      };
      break;
    case 'SET_AGE':
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

const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware(createLogger()));

//define some action & dispatch

store.dispatch({
  type: 'ADD',
  payload: 10
});
store.dispatch({
  type: 'ADD',
  payload: 23
});
store.dispatch({
  type: 'SUBTRACT',
  payload: 11
});
store.dispatch({
  type: 'SET_NAME',
  payload: 'Allen'
});
store.dispatch({
  type: 'SET_AGE',
  payload: 23
});
*/
