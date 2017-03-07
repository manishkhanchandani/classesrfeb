import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';


const myLogger = (store) => (next) => (action) => {
  console.log("logged action: ", action);
  next(action);
};


export default createStore(
  combineReducers({math: mathReducer, user: userReducer}), 
  {}, 
  applyMiddleware(myLogger, logger(), thunk)
);
