import React, { Component } from 'react';
import './App.css';



class User extends Component {
  render() {
    return (
      <div>
        {this.props.user.name}
      </div>
    );
  }
}


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      users: [
        {name: 'James'},
        {name: 'Danielle'},
        {name: 'Lucy'},
        {name: 'Ernst'}
      ],
      filter: ''
    };
  }
  render() {
    console.log('state is ', this.state);
    return (
      <div >
        <h1>My Application</h1>
        
        <h3>Users</h3>
        <input onChange={(event) => {this.setState({filter: event.target.value.toLowerCase()});}} type="text" />
        <ul>
          {this.state.users.filter((user) => user.name.toLowerCase().indexOf(this.state.filter) > -1 ).map((user, i) => {
           return <User key={i} user={user} />
          })}
        </ul>
      </div>
    );
  }
}

export default App;
