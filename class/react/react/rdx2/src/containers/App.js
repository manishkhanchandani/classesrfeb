import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

import Loading from '../components/Loading.js';
import Nearby from '../components/Nearby.js';

import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Near By Locations</h1>

        <Autocomplete
          className="form-control"
          onPlaceSelected={(place) => {
            console.log('place is ', place);
          }}
          types={['(cities)']}
        />

        <br /><br />
        <Loading loading="" />
        <Nearby />

      </div>
    );
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
  
}

export default App;
