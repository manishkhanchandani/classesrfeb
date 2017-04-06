import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setSampleCall, startLoading} from '../actions/sampleAction.js';
import Nearby from '../components/Nearby.js';
import Loading from '../components/Loading.js';

import Autocomplete from 'react-google-autocomplete';

class App extends Component {


  render() {
    console.log('this props: ', this.props);
    return (
      <div className="container">
        <h1>Near By Locations</h1>

          <Autocomplete
              className="form-control"
              onPlaceSelected={(place) => {
                console.log(place);
                this.props.curSampleCall(place.geometry.location.lat(), place.geometry.location.lng());
              }}
              types={['(cities)']}
          />

        <br /><br />
        <Loading loading={this.props.sample.loading}/>
        <Nearby data={this.props.sample.data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sample: state.sampleReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    curSampleCall: (lat, lng) => {
      dispatch(startLoading());
      dispatch(setSampleCall(lat, lng));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
