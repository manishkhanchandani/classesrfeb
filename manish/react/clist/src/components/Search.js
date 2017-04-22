import React, { Component } from 'react';

import Autocomplete from 'react-google-autocomplete';

class Search extends Component {
  
  submitForm(event) {
    event.preventDefault();
    console.log('form submitted');
  }
  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
          <div className="form-group">

              <Autocomplete
                  className="form-control addressBox"
                  onPlaceSelected={(place) => {
                    document.getElementById('latitude').value = place.geometry.location.lat();
                    document.getElementById('longitude').value = place.geometry.location.lng();
                  }}
                  types={['geocode']}
              />
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

export default Search;