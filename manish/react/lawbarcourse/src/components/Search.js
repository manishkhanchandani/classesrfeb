import React, { Component } from 'react';
import {connect} from 'react-redux';

import Autocomplete from 'react-google-autocomplete';
import '../css/style.css';

class Search extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      latitude: null,
      longitude: null,
      address: null,
      keyword: null
    }
  }
  
  
  submitForm(event) {
    event.preventDefault();
    console.log('form submitted');
  }
  render() {
    console.log('props are: ', this.props);
    console.log('state are: ', this.state);
    return (
      <div>
        <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
          <label className="marginRight">Near:</label>
          <div className="form-group">
              <Autocomplete
                  className="form-control addressBox marginRight"
                  ref="location"
                  onPlaceSelected={(place) => {
                    document.getElementById('latitude').value = place.geometry.location.lat();
                    document.getElementById('longitude').value = place.geometry.location.lng();
                    this.setState({latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng(), address: place.formatted_address});
                  }}
                  types={['geocode']}
              />
          </div>
          <div className="form-group">
              <label className="marginRight">Keyword:</label>
              <input type="text" className="form-control marginRight" id="keyword" ref="keyword" placeholder="Enter keyword" onChange={(e) => {this.setState({keyword: e.target.value})}} />
          </div>
          <input type="hidden" id="latitude" ref="latitude"  />
          <input type="hidden" id="longitude" ref="longitude" />
          <div className="form-group">
              <button type="submit" className="btn btn-primary form-control">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    my: state.MyReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(Search);