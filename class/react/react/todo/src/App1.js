import React, { Component } from 'react';
import './App.css';
import TodoStore from './stores/TodoStore.js';
import * as TodoActions from './actions/TodoActions.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: TodoStore.getAll()
    };
  }
  
  componentWillMount() {
    //this is great place to add event handlers
    TodoStore.on('change', () => {
      this.setState(
        {todos: TodoStore.getAll()}
      );
    });
  }
  
  createList() {
    //create something from random
    TodoActions.createTodo(Date.now());
  }
  
  render() {
    console.log(TodoActions);
    return (
      <div>
        <h1>Todo List</h1>
        <button onClick={this.createList.bind(this)}>Create!</button>
        <ul>
          {this.state.todos.map((value, i) => <li key={i}>{value.text} / {(value.complete ? 'Done' : 'Pending')}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
