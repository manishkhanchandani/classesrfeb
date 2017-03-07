import React, { Component } from 'react';

class Main extends Component {
  
  changeNameMain(fieldName, e) {
    console.log(fieldName, ', ', e.target.value);
    this.props.changeUserName(fieldName, e.target.value);
  }
  
  
  render() {
    console.log('main page: ', this.props);
    return (
      <div>
        <h1>Main Page</h1>
        <b>Username: </b> <input type="text" value={this.props.username} onChange={this.changeNameMain.bind(this, 'username')}/><br /><br />
        <b>Age: </b><input type="text" value={this.props.age} onChange={this.changeNameMain.bind(this, 'age')}/>
      </div>
    );
  }
}

export default Main;