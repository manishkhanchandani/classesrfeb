import React, { Component } from 'react';
import {connect} from 'react-redux';

import Autocomplete from 'react-google-autocomplete';
import {parsePlace} from '../actions/MyAction.js';

class Landing extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
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
      },
      location2: {
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
  
  submitForm(e) {
    e.preventDefault();
    this.setState({error: null});
    
    let val = this.props.user.email;
    
    if (!val) {
      this.setState({error: 'missing email, please sign in first.'});
      return;
    }
    
    if (!this.refs.accept.checked) {
      this.setState({error: 'please accept terms and conditions'});
      return;
    }
    
  }
  
  submitForm2(e) {
    e.preventDefault();
    this.setState({error: null});
    
    let val = this.props.user.email;
    
    if (!val) {
      this.setState({error: 'missing email, please sign in first.'});
      return;
    }
    
    if (!this.refs.accept2.checked) {
      this.setState({error: 'please accept terms and conditions'});
      return;
    }
    
  }
  render() {
    console.log(this.state);
    let val = this.props.user.email;
    if (!val) val = '';
    
    let error = <span></span>;
    if (this.state.error) {
      error = <div className="alert alert-danger" role="alert">{this.state.error}</div>
    }
    const location = this.state.location;
    var myAddress = [];
    if (location.city) {
      myAddress.push(<div key="0"><strong>Your Address</strong>: </div>); 
      myAddress.push(<div key="1">{location.address1} {location.address2}<br />{location.city}, {location.postal_code}<br />{location.county}<br />{ location.state}, {location.country}</div>);
    }
    const location2 = this.state.location2;
    var myAddress_2 = [];
    if (location2.city) {
      myAddress_2.push(<div key="0"><strong>Your Address</strong>: </div>); 
      myAddress_2.push(<div key="1">{location2.city}<br />{location2.county}<br />{ location2.state}, {location2.country}</div>);
    }
    return (
      <div>
          <h1>Enrollment Form</h1>
          {
            /*
            <p>Enter your email address to register your name. Your enrollment is in pending state, You will receive donations once we make you in approved state. You will get a link to subscribe once your account is approved and your donation will start once we get the subscription. You have to pay a yearly subscription fee of $10 / year as one subscriber. If you need double donation then you have to pay $20 / year and if you need 10 times then you have to pay $100 / year. <br /><br />All donations will be divided into equal number of subscriptions. All donations are paid once in a week.<br /><br />So if we have 10,000 subscribers and we get donation of $100,000 a week, then each subscriber will get $10 and if one person has registered as 2 subscriber then he will get $20 that week.</p>
            */
          }
          {error}
        <div className="row">
            <div className="col-md-6">
              
              <form onSubmit={this.submitForm.bind(this)}>
                <h3>Donate Now</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref="email" value={val} placeholder="Enter email" disabled />
                </div>
                <div className="form-group">
                    <label>Subscription Amount (Per Year)</label>
                    <select className="form-control">
                      <option>As 1 Subscriber, $10</option>
                      <option>As 2 Subscriber, $20</option>
                      <option>As 3 Subscriber, $30</option>
                      <option>As 4 Subscriber, $40</option>
                      <option>As 5 Subscriber, $50</option>
                      <option>As 10 Subscriber, $100</option>
                      <option>As 20 Subscriber, $200</option>
                      <option>As 50 Subscriber, $500</option>
                      <option>As 100 Subscriber, $500</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Your Address (Donations and all other transactions will be sent at this address)</label>

                    <Autocomplete
                        className="form-control addressBox"
                        onPlaceSelected={(place) => {
                          console.log(place);

                            var obj = parsePlace(place);
                            console.log('obj: ', obj);
                            const address1 = ((obj.street_number) ? obj.street_number + ' ' : '') + ((obj.route) ? obj.route : '');
                            document.getElementById('latitude').value = obj.lat;
                            document.getElementById('longitude').value = obj.lng;
                            document.getElementById('city').value = obj.city;
                            document.getElementById('country').value = obj.country;
                            document.getElementById('county').value = obj.county;
                            document.getElementById('state').value = obj.state;
                            document.getElementById('address').value = obj.address;
                            document.getElementById('postal_code').value = obj.postal_code;
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
                              postal_code: obj.postal_code,
                              address2: this.state.location.address2
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
                    {myAddress}

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

                <div className="checkbox">
                    <label>
                        <input type="checkbox" ref="accept" />I accept <a href="">terms and conditions</a>
                    </label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
                
                
                
            </div>
            <div className="col-md-6">
              <form onSubmit={this.submitForm.bind(this)}>
                <h3>Become Manager</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref="email_2" value={val} placeholder="Enter email" disabled />
                </div>
                <div className="form-group">
                    <label>Manager Type (Per Year)</label>
                    <select className="form-control">
                      <option>City Manager, $50 ()</option>
                      <option>County Manager, $250</option>
                      <option>State Manager, $500</option>
                      <option>Country Manager, $1000</option>
                    </select>
                </div>
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
                            this.setState({location2: savedObj});
                        }}
                        types={['geocode']}
                    />
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" id="country_2" ref="country_2" placeholder="Enter country" disabled />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" id="state_2" ref="state_2" placeholder="Enter state" disabled />
                    </div>
                    <div>
                    {myAddress_2}

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                        <label>County</label>
                        <input type="text" className="form-control" id="county_2" ref="county_2" placeholder="Enter county" disabled />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" id="city_2" ref="city_2" placeholder="Enter city" disabled />
                    </div>
                    <input type="hidden" id="latitude_2" ref="latitude_2" />
                    <input type="hidden" id="longitude_2" ref="longitude_2" />
                    <input type="hidden" id="address_2" ref="address_2" />
                  </div>
                </div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" ref="accept_2" />I accept <a href="">terms and conditions</a>
                    </label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
        </div>
	
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
    my: state.MyReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);