import React, { Component } from 'react';

import MyAction from '../actions/MyAction.js';

class Profile extends Component {

    changeName() {
      MyAction.changeName('ben');
    }

    changeAge() {
      MyAction.changeAge('ben');
    }

  render() {
    let hobbies = [];
    if (this.props.hobbies) {
      hobbies = this.props.hobbies;
    }
    return (
      <div>
        <button onClick={this.changeName.bind(this)}>Change My Name</button>
        <br />
        My name is {this.props.name}
        <br />
        <br />
        <button onClick={() => {MyAction.changeAgeAndGender(23, 'Female')}}>Change My Age</button>
        <br />
        My age is {this.props.age}
        <br />
        <br />
        <button>Change My Gender</button>
        <br />
        My gender is {this.props.gender}
        <br />
        <br />
        <button>Change My City</button>
        <br />
        My city is {this.props.city}
        <br />
        <br />
        <button>Change My State</button>
        <br />
        My state is {this.props.state}
        <br />
        <br />
        <button>Change My Country</button>
        <br />
        My country is {this.props.country}
        <br />
        <br />
        <button>Change My Hobbies</button>
        <br />
        My hobbies are
        <ul>
          {
            hobbies.map((value, key) => {
              return <li key={key}>{value}</li>
            })
          }
        </ul>
        <br />
      </div>
    );
  }
}

export default Profile;
