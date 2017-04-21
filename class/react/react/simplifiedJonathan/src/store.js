import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

import { reducer as reduxFormReducer } from 'redux-form'
import apiReducer from './reducers/apiReducer';

const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form"
    apiReducer: apiReducer
})

const store = createStore(reducer, {}, applyMiddleware( createLogger() ));
// let status  = store.getState();

export default store;