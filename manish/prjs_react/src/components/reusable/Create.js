import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import {parsePlace} from '../../actions/MyAction.js';
import Config from '../../Config.js';
import * as firebase from 'firebase';
import {firebaseDatabase} from '../../firebase.js';

class Create extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: null,
      description: null,
      location: null,
      marital_status: null,
      hobbies: {},
      tags: null
    };
  }

  submitMe(e) {
    e.preventDefault();
    console.log('form submitted');
    const data = this.state;
    data.created = firebase.database.ServerValue.TIMESTAMP;
    const key = firebaseDatabase.ref(Config.sitePath + '/testPath').push(data).key;
    console.log('key is ', key, ' with data is ', data);

    const path = '/testCounty/' + btoa(data.location.country) + '/' + btoa(data.location.state) + '/' + btoa(data.location.county) + '/all/' + key;
    firebaseDatabase.ref(Config.sitePath + path).set(data.created);

    if (this.state.tags) {
      const tags = this.state.tags;
      const tagsArray = tags.split(',');
      for (var i = 0; i < tagsArray.length; i++) {
        var tag = tagsArray[i].trim();
        var tagB = btoa(tag);

        const path2 = '/testCounty/' + btoa(data.location.country) + '/' + btoa(data.location.state) + '/' + btoa(data.location.county) + '/tags/' + tagB + '/' + key;
        firebaseDatabase.ref(Config.sitePath + path2).set(data.created);
        const path3 = '/testTags/' + tagB + '/' + key;
        firebaseDatabase.ref(Config.sitePath + path3).set(data.created);
      }
    }
  }

  setHobbies(e) {
    let hobby = this.state.hobbies;
    hobby[e.target.value] = e.target.checked ? true: false;
    this.setState({hobbies: hobby});
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <h3>Create New</h3>
          <form onSubmit={this.submitMe.bind(this)}>
          <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" placeholder="Enter Title" onChange={(event) => this.setState({title: event.target.value})} />
          </div>

          <label>Location:</label>
          <Autocomplete
              className="form-control addressBox"
              onPlaceSelected={(place) => {
                const obj = parsePlace(place);
                this.setState({location: obj});
              }}
              types={['geocode']}
          />
          <br />

          <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" placeholder="Enter Description" ref="description" rows="5" onChange={(event) => this.setState({description: event.target.value})}></textarea>
          </div>
          <h3>Marital Status</h3>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="marital_status" value="married" onChange={(event) => this.setState({marital_status: event.target.value})}  />
              &nbsp;&nbsp; Married
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="marital_status"  value="single" onChange={(event) => this.setState({marital_status: event.target.value})} />
              &nbsp;&nbsp;Single
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="marital_status" value="divorced" onChange={(event) => this.setState({marital_status: event.target.value})} />
              &nbsp;&nbsp;Divorced
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="marital_status" value="separated" onChange={(event) => this.setState({marital_status: event.target.value})} />
              &nbsp;&nbsp;Separated
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="marital_status" value="widowed" onChange={(event) => this.setState({marital_status: event.target.value})} />
              &nbsp;&nbsp;Widowed
            </label>
          </div>
          <h3>Hobbies</h3>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="hobbies"  value="dining" onChange={this.setHobbies.bind(this)}  />
              &nbsp;&nbsp; Dinning Out
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" name="hobbies"  value="chess" onChange={this.setHobbies.bind(this)}  />
              &nbsp;&nbsp; Chess
            </label>
          </div>
          <div className="form-group">
              <label>Tags (comma separated tags for search)</label>
              <input type="text" className="form-control" placeholder="Enter Tags" onChange={(event) => this.setState({tags: event.target.value})} />
          </div>


          <br />
          <button type="submit" className="btn btn-primary form-control">Submit</button>

          </form>

      </div>
    );
  }
}


export default Create;
