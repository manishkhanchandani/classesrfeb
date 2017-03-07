import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';

class Home extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      profileName: 'Mango',
      birthPlace: '',
      birthDay: '5',
      birthMonth: '6',
      birthYear: '1974',
      birthHour: '12',
      birthMinute: '30'
      
    };
  }
  profileSubmit(e) {
    e.preventDefault();
    let url = 'http://api.mkgalaxy.com/api.php?action=naks&lat='+this.refs.latitude.value+'&lng='+this.refs.longitude.value+'&dob='+this.refs.birthYear.value+'-'+this.refs.birthMonth.value+'-'+this.refs.birthDay.value+'+'+this.refs.birthHour.value+':'+this.refs.birthMinute.value;
    console.log(url);
  }
  
  changeFields(fieldname, e) {
    console.log(fieldname, ', ', e.target.value);
    var obj = {};
    obj[fieldname] = e.target.value;
    this.setState(obj);
  }
  
  render() {
    console.log('state is ', this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Create Birth Profile</h3>
              <form onSubmit={this.profileSubmit.bind(this)} >
                <div className="form-group">
                    <label htmlFor="profileName">Birth Profile Name</label>
                    <input type="text" className="form-control" id="profileName" ref="profileName" placeholder="Enter Birth Profile" required onChange={this.changeFields.bind(this, 'profileName')} value={this.state.profileName}  />
                </div>
                <div className="form-group">
                    <label htmlFor="birthPlace">Birth Place</label>
                    
                    <Autocomplete
                        className="form-control addressBox"
                        onPlaceSelected={(place) => {
                          console.log(place);
                          document.getElementById('latitude').value = place.geometry.location.lat();
                          document.getElementById('longitude').value = place.geometry.location.lng();
                        }}
                        types={['(cities)']}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="birthDay">Birth Day</label>
                            <input type="number" min="1" className="form-control" ref="birthDay" id="birthDay"  placeholder="Enter Day" required  onChange={this.changeFields.bind(this, 'birthDay')} value={this.state.birthDay} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthMonth">Birth Month</label>
                            <input type="number" min="1" className="form-control" ref="birthMonth" id="birthMonth"  placeholder="Enter Month" required  onChange={this.changeFields.bind(this, 'birthMonth')} value={this.state.birthMonth} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthYear">Birth Year</label>
                            <input type="number" className="form-control" ref="birthYear" id="birthYear"  placeholder="Enter Year" required  onChange={this.changeFields.bind(this, 'birthYear')} value={this.state.birthYear} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="birthHour">Birth Hour</label>
                            <input type="number" min="0" className="form-control" ref="birthHour" id="birthHour"  placeholder="Enter Hour" required  onChange={this.changeFields.bind(this, 'birthHour')} value={this.state.birthHour} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthMinute">Birth Minute</label>
                            <input type="number" min="0" className="form-control" ref="birthMinute" id="birthMinute"  placeholder="Enter Minute" required  onChange={this.changeFields.bind(this, 'birthMinute')} value={this.state.birthMinute} />
                        </div>
                      </div>
                    </div>
                </div>
                <input type="text" id="latitude" ref="latitude"  />
                <input type="text" id="longitude" ref="longitude" />
                <button type="submit" className="btn btn-primary form-control">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;