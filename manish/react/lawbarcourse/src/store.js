import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer';
import UserReducer from './reducers/UserReducer';
import SearchReducer from './reducers/SearchReducer.js';
import QuizReducer from './reducers/QuizReducer.js';

const store = createStore(combineReducers({MyReducer, UserReducer, SearchReducer, QuizReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;