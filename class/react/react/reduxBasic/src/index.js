import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import {Provider} from 'react-redux';

import store from './store.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/*

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

//lets pass state as default inital state
const mathReducer = (state = {
  result: 1,
  lastValue: []
}, action) => {

  switch(action.type) {
    case 'ADD':
      state = {
        ...state,
        result: state.result + action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    case 'SUBTRACT':
      state = {
        ...state,
        result: state.result - action.payload,
        lastValue: [...state.lastValue, action.payload]
      }
      break;
    default:
      break;
  }

  return state;
};

//lets create new reducer as userReducer with name and age
const userReducer = (state = {
  name: 'Manny',
  age: 43
}, action) => {

  switch(action.type) {
    case 'SET_NAME':
      state = {
        ...state,
        name: action.payload
      }
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
};

//since we are setting initial state as default in reducer, so no need to pass second parameter here
const store = createStore(combineReducers({mathReducer: mathReducer, userReducer: userReducer}), {}, applyMiddleware(createLogger()));//second parameter is empty state

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

store.dispatch({
  type: 'SET_NAME',
  payload: 'MANGO'
});
store.dispatch({
  type: 'SET_AGE',
  payload: 23
});*/
