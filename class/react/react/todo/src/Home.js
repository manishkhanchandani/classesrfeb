import React, { Component } from 'react';
import './App.css';
import TodoStore from './stores/TodoStore.js';
import * as TodoActions from './actions/TodoActions.js';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.getTodos = this.getTodos.bind(this);
    
    this.state = {
      todos: TodoStore.getAll()
    };
  }
  
  componentWillMount() {
    //this is great place to add event handlers
    TodoStore.on('change', this.getTodos);
    console.log('count: ', TodoStore.listenerCount('change'));
  }
  
  componentWillUnmount() {
    TodoStore.removeListener('change', this.getTodos);
  }
  
  
  createList() {
    //create something from random
    TodoActions.createTodo(Date.now());
  }
  
  getTodos() {
    this.setState(
      {todos: TodoStore.getAll()}
    );
  }
  
  reloadTodos() {
    //get data from ajax
    TodoActions.reloadTodos();
  }
  
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <ul>
          {this.state.todos.map((value, i) => <li key={i}>{value.text} / {(value.complete ? 'Done' : 'Pending')}</li>)}
        </ul>
      </div>
    );
  }
}

export default Home;
