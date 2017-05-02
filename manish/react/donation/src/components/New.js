import React, { Component } from 'react';
import Config from '../includes/config.js';
import Autocomplete from 'react-google-autocomplete';

import {parsePlace} from '../actions/MyAction.js';

class New extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: null,
      location: {
        latitude: null,
        longitude: null,
        country: null,
        state: null,
        city: null,
        county: null,
        address: null,
        address1: null,
        address2: ''
      },
      category: null,
      subcategory: null,
      title: null,
      description: null,
      tags: null
    }
  }
  
  componentDidMount() {
    this.setState({
      categories: Config.categories
    });
  }
  
  submitForm(event) {
    event.preventDefault();
    console.log('form submitted');
  }
  
  render() {
    console.log(this.state);
    if (!this.state.categories) {
      return false;
    }
    var categories = this.state.categories;
    return (
      <div>
        <h3>Create New Post</h3>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Enter Location</label>
                <Autocomplete
                    className="form-control addressBox"
                    onPlaceSelected={(place) => {
                      //console.log(place);
                      var obj = parsePlace(place);
                      //console.log('obj: ', obj);
                      const address1 = ((obj.street_number) ? obj.street_number + ' ' : '') + ((obj.route) ? obj.route : '');
                      document.getElementById('latitude').value = obj.lat;
                      document.getElementById('longitude').value = obj.lng;
                      document.getElementById('city').value = obj.city;
                      document.getElementById('country').value = obj.country;
                      document.getElementById('county').value = obj.county;
                      document.getElementById('state').value = obj.state;
                      document.getElementById('address').value = obj.address;
                      document.getElementById('address1').value = address1;
                      const savedObj = {
                        latitude: obj.lat,
                        longitude: obj.lng,
                        country: obj.country,
                        state: obj.state,
                        city: obj.city,
                        county: obj.county,
                        address: obj.address,
                        address1: address1,
                        address2: this.state.location.address2
                      };
                      this.setState({location: savedObj});

                    }}
                    types={['geocode']}
                />
                <p><br /><strong>Note:</strong> Address is required field. If you don't want to put complete address then put atleast city, state, country. This will help others to know how far are you from them.</p> 
                    
              </div>
              <div className="form-group">
                <label>Category: </label>
                <select className="form-control" onChange={(event) => {this.setState({category: event.target.value})}}>
                  <option value="">Choose Category</option>
                  {
                    Object.keys(categories).map((value, key) => {
                      return <option value={value} key={value}>{categories[value].name}</option>
                    })
                  }
                </select>
              </div>
              {
                (this.state.category)
                ?
                <div className="form-group">
                  <label>Subcategory: </label>
                  <select className="form-control" onChange={(event) => {this.setState({subcategory: event.target.value})}}>
                    <option value="">Choose Subcategory</option>
                    {
                      Object.keys(categories[this.state.category].childs).map((value, key) => {
                        return <option value={value} key={value}>{categories[this.state.category].childs[value].name}</option>
                      })
                    }
                  </select>
                </div>
                :
                false
              }
              
              <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" id="title" ref="title" placeholder="Enter title" />
              </div>
              <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" id="description" rows="5" ref="description" placeholder="Enter description" />
              </div>
              <div className="form-group">
                  <label>Tags (Comma separated tags for search)</label>
                  <input type="text" className="form-control" id="tags" ref="tags" placeholder="Enter tags" />
              </div>
                    
                   
            </div>
            <div className="col-md-6">
              <div className="form-group">
                  <label>Address 1</label>
                  <input type="text" className="form-control" id="address1" ref="address1" placeholder="Enter address" disabled />
              </div>
              <div className="form-group">
                  <label>Address 2</label>
                  <input type="text" className="form-control" id="address2" ref="address2" placeholder="Enter address2" onChange={(event) => {this.setState({location: {...this.state.location, address2: event.target.value}})}} />
              </div>
              <div className="form-group">
                  <label>Country</label>
                  <input type="text" className="form-control" id="country" ref="country" placeholder="Enter country" disabled />
              </div>
              <div className="form-group">
                  <label>State</label>
                  <input type="text" className="form-control" id="state" ref="state" placeholder="Enter state" disabled />
              </div>
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
          
          
          <button type="submit" className="btn btn-primary form-control">Post</button>
        </form>
      </div>
          
          
    );
  }
}

export default New;