import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer.js';

const store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;
