import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import {setLocation, setKeyword, savePlace} from '../../actions/MyAction.js';
import {connect} from 'react-redux';

class SearchBox extends Component {

  submitMe(e) {
    e.preventDefault();
    console.log('form submitted');
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Search</h3>
          <form onSubmit={this.submitMe.bind(this)}>
          <div className="form-group">
              <label>Keyword</label>
              <input type="text" className="form-control" placeholder="Enter keyword" onChange={(event) => {this.props.setNewKeyword(event.target.value)}} value={this.props.search.keyword} />
          </div>

          <label>Location:</label>
          <Autocomplete
              className="form-control addressBox"
              onPlaceSelected={(place) => {this.props.setNewPlace(place)}}
              types={['geocode']}
          />
          <br />
          <button type="submit" className="btn btn-primary form-control">Submit</button>

          </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.SearchReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewLocation: (location) => {
      dispatch(setLocation(location));
    },
    setNewKeyword: (keyword) => {
      dispatch(setKeyword(keyword));
    },
    setNewPlace: (place) => {
      dispatch(savePlace(place));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
