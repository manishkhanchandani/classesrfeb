import React, { Component } from 'react';
import Profile from './Profile.js';

import MyStore from '../stores/MyStore.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Manny',
      age: 43,
      gender: 'Male',
      city: 'San Jose',
      state: 'CA',
      country: 'US',
      hobbies: ['Chess', 'Table Tennis', 'Cricket', 'Judo', 'Akido', 'Movies', 'Dinning']
    }
  }

  componentWillMount() {
    MyStore.on('change', () => {
      this.setState(MyStore.getAll());
    });
  }

  componentWillUnmount() {
    MyStore.removeListener('change');
  }


  render() {
    return (
      <div>
        <h1>My Profile</h1>
        <Profile {...this.state} />
      </div>
    );
  }
}

export default App;
