// Now we can set up our first store! Open data/TodoStore.js. This will save information about all of the Todo objects in our application. It will use an Immutable map as the state.

import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

import Counter from '../data/Counter';
import Todo from '../data/Todo';

class TodoStore extends ReduceStore {
    constructor() {
        super(TodoDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
      console.log('action is ', action);
      console.log('state is ', state);
        switch (action.type) {
            case TodoActionTypes.ADD_TODO:
                // Do nothing for now, we will add logic here soon!
                if (!action.text) {
                    return state;
                }

                const id = Counter.increment();

                return state.set(id, new Todo({
                    id,
                    text: action.text,
                    complete: false,
                }));
                break;
            case TodoActionTypes.DELETE_TODO:
              return state.delete(action.id);
              break;
            case TodoActionTypes.TOGGLE_TODO:
              return state.update(
                action.id,
                todo => todo.set('complete', !todo.complete),
              );
              break;
            default:
                return state;
                break;
        }
    }
}

export default new TodoStore();