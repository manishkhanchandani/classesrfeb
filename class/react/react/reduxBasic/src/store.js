import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';

const store = createStore(combineReducers({mathReducer: mathReducer, userReducer: userReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

//subscribe to store, it is a call back whenever the store is updated
store.subscribe(() => {
  console.log('store updated: ', store.getState());
});

export default store;
