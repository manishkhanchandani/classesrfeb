import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import {Provider} from 'react-redux';

import App from './App';

const mathReducer = (state = {
  result: 1,
  lastValues: []
}, action) => {
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

//lets create another reducer userReducer
const userReducer = (state = {
  name: 'Nandi',
  age: 43
}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      state = {
        ...state,//get all the properties of the object
        name: action.payload
      };
      return state;
    case 'SET_AGE':
      state = {
        ...state,//get all the properties of the object
        age: action.payload
      };
      return state;
    default:
      break;
  }
  
  return state;
};

const myLogger = (store) => (next) => (action) => {
  console.log("logged action: ", action);
  next(action);
};

const store = createStore(
        combineReducers({math: mathReducer, user: userReducer}), 
        {}, 
        applyMiddleware(myLogger, logger())
      );

store.subscribe(() => {
  console.log('store update: ', store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
