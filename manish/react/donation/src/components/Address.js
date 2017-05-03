import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import {parsePlace} from '../actions/MyAction.js';

class Address extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      location: {
        latitude: null,
        longitude: null,
        country: null,
        state: null,
        city: null,
        county: null,
        address: null,
        address1: null,
        address2: '',
        postal_code: null
      }
    };
  }
  render() {
    return (
      <div>
        <div className="form-group">
            <label htmlFor="address_2">Choose Location</label>

            <Autocomplete
                className="form-control addressBox"
                onPlaceSelected={(place) => {
                  console.log(place);

                    var obj = parsePlace(place);
                    console.log('obj: ', obj);
                    document.getElementById('latitude_2').value = obj.lat;
                    document.getElementById('longitude_2').value = obj.lng;
                    document.getElementById('city_2').value = obj.city;
                    document.getElementById('country_2').value = obj.country;
                    document.getElementById('county_2').value = obj.county;
                    document.getElementById('state_2').value = obj.state;
                    document.getElementById('address_2').value = obj.address;
                    const savedObj = {
                      latitude: obj.lat,
                      longitude: obj.lng,
                      country: obj.country,
                      state: obj.state,
                      city: obj.city,
                      county: obj.county,
                      address: obj.address
                    };
                    this.setState({location: savedObj});
                }}
                types={['geocode']}
            />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
                <label>Address 1</label>
                <input type="text" className="form-control" id="address1" ref="address1" placeholder="Enter address" onChange={(event) => {this.setState({location: {...this.state.location, address1: event.target.value}})}} />
            </div>
            <div className="form-group">
                <label>Address 2</label>
                <input type="text" className="form-control" id="address2" ref="address2" placeholder="Enter address2" onChange={(event) => {this.setState({location: {...this.state.location, address2: event.target.value}})}} />
            </div>
            <div className="form-group">
                <label>Postal Code</label>
                <input type="text" className="form-control" id="postal_code" ref="postal_code" placeholder="Enter postal code" onChange={(event) => {this.setState({location: {...this.state.location, postal_code: event.target.value}})}} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
                <label>Country</label>
                <input type="text" className="form-control" id="country" ref="country" placeholder="Enter country" disabled />
            </div>
            <div className="form-group">
                <label>State</label>
                <input type="text" className="form-control" id="state" ref="state" placeholder="Enter state" disabled />
            </div>
            <div>
            {/*myAddress*/}

            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
                <label>County</label>
                <input type="text" className="form-control" id="county" ref="county" placeholder="Enter county" disabled />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" id="city" ref="city" placeholder="Enter city" disabled />
            </div>
            <input type="hidden" id="latitude" ref="latitude" />
            <input type="hidden" id="longitude" ref="longitude" />
            <input type="hidden" id="address" ref="address" />
          </div>
        </div>
      </div>
    );
  }
}

export default Address;