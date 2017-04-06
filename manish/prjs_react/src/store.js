import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import sampleReducer from './reducers/sample.js';
import UserReducer from './reducers/UserReducer.js';
import NearbyReducer from './reducers/NearbyReducer.js';
import SearchReducer from './reducers/SearchReducer.js';

const store = createStore(combineReducers({sampleReducer, UserReducer, NearbyReducer, SearchReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

//subscribe to store, it is a call back whenever the store is updated
store.subscribe(() => {
  //console.log('store new state: ', store.getState());
});

export default store;
