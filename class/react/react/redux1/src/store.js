import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import ReminderReducer from './reducers/ReminderReducer.js';

const store = createStore(combineReducers({ReminderReducer: ReminderReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

//subscribe to store, it is a call back whenever the store is updated
store.subscribe(() => {
  console.log('store updated: ', store.getState());
});

export default store;
