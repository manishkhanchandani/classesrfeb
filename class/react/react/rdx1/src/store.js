import {createStore, combineReducers, applyMiddleware} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import mathReducer from './reducers/mathReducer.js';
import userReducer from './reducers/userReducer.js';

const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;
