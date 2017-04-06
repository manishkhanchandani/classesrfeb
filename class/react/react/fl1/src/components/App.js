import React, { Component } from 'react';

import MyStore from '../stores/MyStore.js';
import MyAction from '../actions/MyAction.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: MyStore.getName(),
      age: MyStore.getAge(),
      gender: MyStore.getGender()
    }
  }

  //this place to update the state
  componentWillMount() {
    MyStore.on('change', () => {
      this.setState({name: MyStore.getName(), age: MyStore.getAge(), gender: MyStore.getGender()});
    });
  }

  componentWillUnmount() {
    MyStore.removeListener('change', () => {
      this.setState({name: MyStore.getName(), age: MyStore.getAge(), gender: MyStore.getGender()});
    });
  }

  onSubmitMe(e) {
    e.preventDefault();
    let name = this.refs.name.value;

    MyAction.changeName(name);

    this.refs.name.value = '';
  }

  render() {
    console.log('state is ', this.state);
    return (
      <div >
        <h1>My Project</h1>
        <form onSubmit={this.onSubmitMe.bind(this)}>
          <input type="text" ref="name" />
        </form>
        <button onClick={() => {MyAction.changeAge(22)}}>Click to change age</button>
        <button onClick={() => {MyAction.changeGender('Female')}}>Click to change gender</button>
          <br /><br />
        Your name is <b>{this.state.name}</b>
          <br /><br />
        Your age is <b>{this.state.age}</b>
          <br /><br />
        Your gender is <b>{this.state.gender}</b>
      </div>
    );
  }
}

export default App;
