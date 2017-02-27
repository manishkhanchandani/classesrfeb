//Create the actions and action types. Let's set up the files that will eventually contain all of the actions in the application.

//Set up data/TodoActionTypes.js. This is a simple enum to list the kinds of actions we will be creating.

const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
};

export default ActionTypes;