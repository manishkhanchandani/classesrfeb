import React, { Component } from 'react';

class User extends Component {

  render() {
    var x = 1;
    var indents = [];
      indents.push(<div key="1">hello <b>world2</b></div>);
    if (x == 0) {
      indents.push(<div key="2">hello <b>world2</b></div>);
    }
    indents.push(<div key="3">hello world3</div>);
    indents.push(<div key="4">hello world4</div>);


    return (
      <div className="container">
        <h1>User App</h1>
        name is {this.props.name}

        {indents}
      </div>
    );
  }
}

export default User;
