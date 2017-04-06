import React, { Component } from 'react';
import {connect} from 'react-redux';

import {setNearbyLocation, setNearbyStartLoading} from '../../actions/NearbyAction.js';
import NearbyList from './NearbyList.js';
import Loading from '../Loading.js';

import Autocomplete from 'react-google-autocomplete';

class Main extends Component {


  render() {
    return (
      <div className="container">
        <h1>Near By Locations</h1>

          <Autocomplete
              className="form-control"
              onPlaceSelected={(place) => {
                console.log(place);
                this.props.curNearbyCall(place.geometry.location.lat(), place.geometry.location.lng());
              }}
              types={['(cities)']}
          />

        <br /><br />
        <Loading loading={this.props.nearby.loading}/>
        <NearbyList data={this.props.nearby.data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nearby: state.NearbyReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    curNearbyCall: (lat, lng) => {
      dispatch(setNearbyStartLoading());
      dispatch(setNearbyLocation(lat, lng));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
