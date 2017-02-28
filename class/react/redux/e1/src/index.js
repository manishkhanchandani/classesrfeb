/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/
/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

import { createStore, combineReducers, applyMiddleware } from 'redux'; //call create store
import logger from 'redux-logger'; //remember logger has to be used as logger()

//create new reducer, it takes two parameter state and action, action has key type, and other data, reducer returns the state
//here make sure that state is always immutable i.e. we take a copy of state and edit it and return a new state


//es6 addition of default param in methods, so first time when we set up the store, where don't have state, at that time we will get initial state and later when dispatch is called, we will pass the state in it.

//lets create one mathReducer
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
  name: 'Manny',
  age: 43
}, action) => {
  //console.log('action: ', action);
  //console.log('state: ', state);
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

//also install npm install redux-logger --save in the current project

//creating middleware, following is pattern used in middleware, where store next and actions are passed
const myLogger = (store) => (next) => (action) => {
  console.log("logged action: ", action);
  next(action);
};

//we can only pass one reducer here, 
//middleware is setup in store,

const store = createStore(
        combineReducers({mathReducer, userReducer}), 
        {}, 
        applyMiddleware(myLogger, logger())
      ); //takes two params, first parameter is reducer, reducer is part which takes action and changes your state, and another parameter is just a initial application state which may be array or a simple number

// we can use combineReducers({mathReducer: mathReducer, userReducer: userReducer}) or combineReducers({mathReducer, userReducer}), Note here es6 will automatically add key value pair.

//we have first parameter reducer or reducers, second parameter is initial state, applyMiddleware(someMiddleware)

store.subscribe(() => {
  console.log('store update: ', store.getState());
});

//actions will remain same, we will not change the actions
store.dispatch({
  type: 'ADD', //sets the type action
  payload: 100//we need value or payload also
}); //dispatch new action

store.dispatch({
  type: 'ADD', //sets the type action
  payload: 22//we need value or payload also
}); //dispatch new action


store.dispatch({
  type: 'SUBTRACT', //sets the type action
  payload: 80//we need value or payload also
}); //dispatch new action


store.dispatch({
  type: 'SET_AGE', //sets the type action
  payload: 40//we need value or payload also
}); //dispatch new action


store.dispatch({
  type: 'SET_NAME', //sets the type action
  payload: 'Nandi'//we need value or payload also
}); //dispatch new action

/*Note:
make sure we keep type unique on both reducers
*/
