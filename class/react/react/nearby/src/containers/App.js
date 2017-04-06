import React, { Component } from 'react';
import {connect} from 'react-redux';

import Autocomplete from 'react-google-autocomplete';

import Nearby from '../components/Nearby.js';
import Loading from '../components/Loading.js';

import {getNearbyLocations, showLoadingIcon} from '../actions/MyAction.js';


class App extends Component {
  
  /*constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      nearbyCities: null
    };
  }
  
  getNearbyLocations(lat, lng) {
    console.log('lat is ', lat, ' and lng is ', lng);
    const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat='+lat+'&lng='+lng;
    console.log('url is ', url);
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({nearbyCities: j.data, loading: false});
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  showLoadingIcon() {
    this.setState({loading: true, nearbyCities: null});
  }*/
  
  render() {
    console.log('this. props is ', this.props);
    return (
      <div className="container">
        <h1>Near By Locations</h1>
        <Autocomplete
          className="form-control"
          onPlaceSelected={(place) => {
            console.log(place);
            this.props.callNearby(place.geometry.location.lat(), place.geometry.location.lng());
          }}
          types={['(cities)']}
        />
        <Loading loading={this.props.myReducer.loading} />
        <Nearby nearbyCities={this.props.myReducer.nearbyCities} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myReducer: state.MyReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    callNearby: (lat, lng) => {
      dispatch(showLoadingIcon());
      dispatch(getNearbyLocations(lat, lng));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
