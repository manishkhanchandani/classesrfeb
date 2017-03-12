import {EventEmitter} from 'events';

import dispatcher from '../dispatcher.js';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    
    this.todos = [
        {
          id: 11342256,
          text: 'Go Shopping',
          complete: false
        },
        {
          id: 23342111,
          text: 'Pay Bills2',
          complete: false
        }
      ];
  }
  
  createTodo(text) {
    const id = Date.now();
    this.todos.push({
      id,
      text,
      complete: false
    });
    
    this.emit('change');
  }
  
  getAll() {
    return this.todos;
  }
  
  handleActions(action) {
    console.log('Todo store received an action', action);
    
    switch (action.type) {
      case 'CREATE_TODO': 
        this.createTodo(action.text);
        break;
      case 'RECEIVE_TODOS': 
        console.log(action.payload);
        if (action.payload) {
          action.payload.map((value, i) => {
            this.createTodo(value.text);
            return true;
          });
        }
        break;
      default:
        break;
    }
  }
}

const todoStore = new TodoStore();

dispatcher.register(todoStore.handleActions.bind(todoStore));// register a function which will handle all the actions

window.todoStore = todoStore;
window.dispatcher = dispatcher;
export default todoStore;